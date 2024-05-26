import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, Image, TouchableOpacity} from "react-native";
import Avatar from "../avatar/Avatar";
import {Ionicons} from "@expo/vector-icons";
import {themeColor} from "../../config/theme";

const CommentItem = ({comments}) => {
  const navigation = useNavigation();
  return (
    <View className="mb-10 w-11/12 pt-1">
      <View className="flex-row items-end">
        <Text className="text-2xl font-semibold my-2" >全部评论</Text>
        <Text className="pb-3">({comments.length}条)</Text>
      </View>
      {comments.length !== 0? comments.map((item, index) => {
        return (
          <View className="flex-row mb-4" key={index}>
            <TouchableOpacity
              className="mr-1"
              onPress={() => {
                navigation.navigate("UserCenter", {
                  userId: item.user.id
                })
              }}
            >
              <Avatar source={{uri: item.user.avatar || themeColor.noAvatar}} size={45}></Avatar>
            </TouchableOpacity>
            <View>
              <Text className="font-bold text-base leading-4">{item.user.nickname}</Text>
              <Text className="text-base leading-6">{item.context}</Text>
              <View className="flex-row items-center">
                <View className="flex-row">
                  <Ionicons name="location-outline" size={14} color="gray"></Ionicons>
                  <Text className="text-gray-500">{item.user.location}</Text>
                </View>
                <View className="flex-row ml-2 items-center">
                  <Ionicons name="time-outline"  size={14} color="gray"></Ionicons>
                  <Text className="ml-0.5 text-gray-500">{item.commentTime.split(' ')[0]}</Text>
                </View>
              </View>
            </View>
          </View>
        )
      }): <Text className="text-center pt-4 text-base">暂无评论呢，快来发表第一条评论吧！🥰</Text>}
    </View>
  );
};

export default CommentItem;
