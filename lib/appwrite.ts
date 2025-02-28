import {
  Account,
  Avatars,
  Client,
  Databases,
  OAuthProvider,
  Storage,
  ID,
  Query,
} from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
  platform: "com.whoamidesu.smb",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  usersCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
  accountsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_ACCOUNTS_COLLECTION_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export async function login() {
  try {
    const redirectUri = Linking.createURL("/");

    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );
    if (!response) throw new Error("Create OAuth2 token failed");

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );
    if (browserResult.type !== "success")
      throw new Error("Create OAuth2 token failed");

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    if (!secret || !userId) throw new Error("Create OAuth2 token failed");

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");

    // ✅ Get logged-in user info
    const user = await account.get();

    // ✅ Check if user already exists in the database
    const existingUsers = await databases.listDocuments(
      config.databaseId!,
      config.usersCollectionId!,
      [Query.equal("userId", user.$id)]
    );

    console.log(existingUsers);

    if (existingUsers.total === 0) {
      // ✅ Create new user entry
      await databases.createDocument(
        config.databaseId!,
        config.usersCollectionId!,
        ID.unique(),
        {
          userId: user.$id,
          name: user.name,
          email: user.email,
          profilePicture: user.prefs?.photoUrl || "",
          createdAt: new Date().toISOString(),
        }
      );
      console.log("New user added to database.");
    } else {
      console.log("User already exists.");
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function loginWithEmail(email: string, password: string) {
  try {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const response = await account.createEmailPasswordSession(email, password); // ✅ Correct method
    if (!response) throw new Error("Failed to create session");

    return true;
  } catch (error) {
    console.error("Login Error:", error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const response = await account.get();

    if (response.$id) {
      const userAvatar = avatar.getInitials(response.name || "Unknown");
      return {
        ...response,
        avatar: userAvatar.toString(),
      };
    }

    return response;
  } catch (error) {
    console.error(error);
  }
}
