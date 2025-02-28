import { SafeAreaView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SplitBillScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-6">
        <Text className="text-2xl font-bold text-black">Split Bill</Text>
        <Text className="text-lg text-gray-600 mt-2">
          This is the full-screen Split Bill page.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SplitBillScreen;
