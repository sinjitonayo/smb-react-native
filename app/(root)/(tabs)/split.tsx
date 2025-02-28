import {
  Image,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import images from "@/constants/images";
import SplitBillScreen from "../../SplitBillScreen";
import { useNavigation, useRouter } from "expo-router";

interface MenuItem {
  name: string;
  price: number;
  quantity: number;
  assignedTo: string[];
}

interface Person {
  name: string;
}

const Split = () => {
  const [step, setStep] = useState(1);
  const [people, setPeople] = useState<Person[]>([{ name: "You" }]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [tax, setTax] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const [name, setName] = useState("");

  const addPerson = () => {
    setPeople((prev) => [...prev, { name }]);
    setName("");
  };

  const deletePerson = (index: number) => {
    setPeople((prev) => prev.filter((_, i) => i !== index));
  };

  const router = useRouter();

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <View className="flex-1 px-8">
        <ScrollView className="flex-1">
          <Text className="text-2xl font-bold text-black mt-5">
            Split the bill
          </Text>
          <Text className="text-lg font-rubik text-black-200 mt-2">
            Add people
          </Text>

          {/* Navigate to full-screen Split Bill screen */}
          <TouchableOpacity
            onPress={() => router.push("/SplitBillScreen")} // ✅ Correct route
            className="bg-primary-300 rounded-full w-full py-4 mt-6"
          >
            <Text className="font-rubik-medium text-lg text-white text-center">
              Go to Split Bill
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const PersonCard = ({
  name,
  onDelete,
}: {
  name: string;
  onDelete: () => void;
}) => {
  return (
    <View className="flex-1 w-32 h-32 mt-4 px-3 py-4 rounded-lg items-center justify-center relative">
      <Image source={images.japan} className="size-20 rounded-xl mx-auto" />
      <TouchableOpacity className="absolute top-0 right-0" onPress={onDelete}>
        <Text className="text-xl font-rubik-bold text-white">x</Text>
      </TouchableOpacity>
      <Text className="text-primary-300 font-rubik-bold text-center mt-2">
        {name}
      </Text>
    </View>
  );
};

export default Split;
