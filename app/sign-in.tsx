import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import images from "@/constants/images";
import icons from "@/constants/icons";

import { login, loginWithEmail } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";

const SignIn = () => {
  const { refetch, loading, isLoggedIn } = useGlobalContext();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  if (!loading && isLoggedIn) {
    return <Redirect href="/" />;
  }

  const handleLogin = async () => {
    const result = await login();

    if (result) {
      refetch();
    } else {
      Alert.alert("Failed to login");
    }
  };

  const handleEmailLogin = async () => {
    const result = await loginWithEmail(data.email, data.password);

    if (result) {
      refetch();
    } else {
      Alert.alert("Failed to login");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <Image
              source={images.login}
              className="w-full h-[30%]"
              resizeMode="contain"
            />

            <View className="px-10">
              <Text className="text-base text-center uppercase font-rubik text-black-200">
                Sign In
              </Text>

              <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
                Let's Manage Your Own {"\n"}
                <Text className="text-primary-300">Finance Life</Text>
              </Text>

              <Text className="text-lg text-center font-rubik text-black-200 mt-6">
                Sign in to your account to continue
              </Text>

              <TouchableOpacity
                onPress={handleLogin}
                className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
              >
                <View className="flex flex-row items-center justify-center">
                  <Image
                    source={icons.google}
                    className="w-6 h-6"
                    resizeMode="contain"
                  />
                  <Text className="font-rubik-medium text-lg text-black-300 ml-2">
                    Continue with Google
                  </Text>
                </View>
              </TouchableOpacity>

              <View className="flex flex-row items-center justify-center mt-4">
                <View className="flex-1 h-px bg-gray-300"></View>
                <Text className="px-4 text-black-200 text-center">or</Text>
                <View className="flex-1 h-px bg-gray-300"></View>
              </View>

              <View className="mt-8"></View>
              <Text className="text-lg font-rubik text-black-200">Email</Text>
              <View className="bg-gray-100 rounded-full mt-2 px-4 py-3">
                <TextInput
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  className="text-black-300"
                  value={data.email}
                  onChangeText={(text) => setData({ ...data, email: text })}
                />
              </View>

              <Text className="text-lg font-rubik text-black-200 mt-4">
                Password
              </Text>
              <View className="bg-gray-100 rounded-full mt-2 px-4 py-3">
                <TextInput
                  placeholder="Enter your password"
                  secureTextEntry
                  className="text-black-300"
                  value={data.password}
                  onChangeText={(text) => setData({ ...data, password: text })}
                />
              </View>

              <TouchableOpacity
                onPress={handleEmailLogin}
                className="bg-primary-300 rounded-full w-full py-4 mt-6"
              >
                <Text className="font-rubik-medium text-lg text-white text-center">
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
