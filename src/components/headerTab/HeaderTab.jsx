import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const HeaderTab = ({title}) => {
  const navigation = useNavigation();
  return (
    <View>
      <View className="h-12 w-full border-b-2 border-gray-300 flex-row items-center p-2 justify-between">
        <TouchableOpacity
          onPress={() => {navigation.goBack()}}
        >
          <Ionicons name="chevron-back" size={30}></Ionicons>
        </TouchableOpacity>
        <Text className="text-xl font-bold text-center">{title}</Text>
        <View className="text-xl font-bold text-center w-10"></View>
      </View>
    </View>
  );
};

export default HeaderTab;
