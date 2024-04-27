import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity, Image} from "react-native";
import Avatar from "../../../components/avatar/Avatar";
import {Ionicons} from "@expo/vector-icons";
import {themeColor} from "../../../config/theme";

const userDetail = ({userDetail}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity className="flex-row bg-white pt-1 px-1.5">
      <Avatar source={{uri: userDetail?.avatar || themeColor.noAvatar}}></Avatar>
      <View className="ml-1">
        <View className="flex-row">
          <Text className="font-bold text-base">
            {userDetail?.nickname}
          </Text>
          {userDetail?.tagName && <View className="text-center rounded justify-center px-2 flex-row items-center h-5"
                 style={{backgroundColor: themeColor.primary}}>
            <Ionicons name="diamond" color="white"></Ionicons>
            <Text className="text-center text-white">
              {userDetail?.tagName}
            </Text>
          </View>}
        </View>
        <Text>
          <Ionicons name="location-outline"></Ionicons>
          {userDetail?.location || '十里堡'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default userDetail;
