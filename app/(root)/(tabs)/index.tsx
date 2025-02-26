import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-4xl font-bold text-blue-400">
        Welcome to the Expo Router example app!
      </Text>
      <Link href="/sign-in">Sign In</Link>
      <Link href="/properties/1">Property 1</Link>
    </View>
  );
}
