import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
  platform: "com.whoamidesu.smb",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
  try {
    const redirectUri = Linking.createURL("/");

    const response = await account.createOAuth2Session(
      OAuthProvider.Google,
      redirectUri
    );

    if (!response) {
      throw new Error("Failed to create OAuth2 session");
    }

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );

    if (browserResult.type !== "success") {
      throw new Error("Failed to open browser");
    }

    const url = new URL(browserResult.url);

    const secret = url.searchParams.get("secret");
    const userId = url.searchParams.get("userId");

    if (!secret || !userId) {
      throw new Error("Failed to get secret or userId");
    }

    const session = await account.createSession(secret, userId);

    if (!session) {
      throw new Error("Failed to create session");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error(error);
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
