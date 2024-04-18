import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, Image, TouchableOpacity} from "react-native";
import Avatar from "../avatar/Avatar";
import {Ionicons} from "@expo/vector-icons";

const CommentItem = ({comments}) => {
  const navigation = useNavigation();
  return (
    <View className="mb-10">
      {comments.map((item, index) => {
        return (
          <View className="flex-row mb-3" key={index}>
            <TouchableOpacity className="mr-1">
              <Avatar source={item.Avatar}></Avatar>
            </TouchableOpacity>
            <View>
              <Text className="text-base">{item.userName}</Text>
              <Text className="text-base">{item.content}</Text>
              <View className="flex-row items-center">
                <View className="flex-row">
                  <Ionicons name="location-outline" size={14} color="gray"></Ionicons>
                  <Text className="text-gray-500">{item.location}</Text>
                </View>
                <View className="flex-row ml-2 items-center">
                  <Ionicons name="time-outline"  size={14} color="gray"></Ionicons>
                  <Text className="ml-0.5 text-gray-500">{item.updateTime}</Text>
                </View>
              </View>
            </View>
          </View>
        )
      })}
    </View>
  );
};

export default CommentItem;
