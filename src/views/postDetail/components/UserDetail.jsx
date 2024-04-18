import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity, Image} from "react-native";
import Avatar from "../../../components/avatar/Avatar";
import {Ionicons} from "@expo/vector-icons";

const userDetail = ({userDetail}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity className="flex-row">
      <Avatar source={userDetail.Avatar}></Avatar>
      <View className="ml-1">
        <View className="flex-row">
          <Text className="font-bold text-base">
            {userDetail.name}
          </Text>
          <View className="bg-blue-600 text-center rounded justify-center px-2 flex-row items-center">
            <Ionicons name="diamond" color="white"></Ionicons>
            <Text className="text-center text-white">
              {userDetail.tag}
            </Text>
          </View>
        </View>
        <Text>
          <Ionicons name="location-outline"></Ionicons>
          {userDetail.location}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default userDetail;
