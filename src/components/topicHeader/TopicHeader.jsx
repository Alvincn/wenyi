import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const TopicHeader = () => {
  const navigation = useNavigation();
  return (
    <View
      className="flex-row"
    >
      <View className="flex-row justify-between w-full items-center">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Ionicons name="chevron-back" size={25}/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {navigation.navigate("Search")}}
        >
          <Ionicons name="search" size={25}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopicHeader;
