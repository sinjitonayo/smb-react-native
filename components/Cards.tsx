import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";

interface Props {
  onPress?: () => void;
}

export const FeaturedCard = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start w-60 h-80 relative"
    >
      <Image source={images.japan} className="size-full rounded-2xl" />
      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />

      <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-1">
          4.4
        </Text>
      </View>

      <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
        <Text className="text-xl font-rubik-bold text-white" numberOfLines={1}>
          Tokyo Suite
        </Text>
        <Text className="text-sm font-rubik-medium text-white">
          Tokyo Prefecture, Japan
        </Text>
        <View className="flex flex-row items-center justify-between w-full mt-2">
          <Text className="text-xl font-rubik-bold text-white">$120</Text>
          <Text className="text-sm font-rubik text-white ml-1">/ night</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative"
    >
      <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50">
        <Image source={icons.star} className="size-2.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-0.5">
          4.4
        </Text>
      </View>

      <Image source={images.japan} className="w-full h-40 rounded-lg" />

      <View className="flex flex-col mt-2">
        <Text className="text-base font-rubik-bold text-black-300">
          Tokyo Suite
        </Text>
        <Text className="text-xs font-rubik-medium text-black-200">
          Tokyo Prefecture, Japan
        </Text>
        <View className="flex flex-row items-center justify-between mt-2">
          <Text className="text-base font-rubik-bold text-primary-300">
            $120
          </Text>
          <Text className="text-sm font-rubik text-white ml-1">/ night</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

{
  /* <View className="mt-5">
<Text className="text-lg font-rubik text-black-200">People</Text>
<ScrollView
  className="bg-slate-100 rounded-xl"
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerClassName="flex flex-row items-center px-4 py-3"
  snapToAlignment="center"
  snapToInterval={100} // Adjust this value based on your item width
  decelerationRate="fast"
>
  {people.map((person, index) => (
    <PersonCard
      key={index}
      name={person.name}
      onDelete={() => deletePerson(index)}
    />
  ))}
</ScrollView>

<View className="mt-4">
  <Text className="text-lg font-rubik text-black-200">
    Add person
  </Text>
  <View className="bg-gray-100 rounded-full mt-2 px-4 py-3">
    <TextInput
      placeholder="Enter name"
      className="placeholder:text-slate-300"
      value={name}
      onChangeText={setName}
    />
  </View>
  <TouchableOpacity
    onPress={addPerson}
    className="bg-primary-300 rounded-full w-full py-4 mt-6"
  >
    <Text className="font-rubik-medium text-lg text-white text-center">
      Add
    </Text>
  </TouchableOpacity>
</View>
</View> */
}
