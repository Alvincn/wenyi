import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import PostItem from "../../../components/postItem/PostItem";

const HotPost = ({goodsList, clickRefresh}) => {
  const navigation = useNavigation();
  return (
    <View className="">
      <View className="flex-row justify-between">
        <Text className="text-2xl font-bold">
          精选帖子
        </Text>
        <TouchableOpacity
          onPress={() => {
            clickRefresh()
          }}
          className="flex-row items-center justify-center bg-gray-200 rounded-2xl px-2"
        >
          <Ionicons name="refresh" size={15}></Ionicons>
          <Text className="text-base text-center leading-4">换一批</Text>
        </TouchableOpacity>
      </View>

      <View>
        {/* 遍历帖子 */}
        {
          goodsList.length !== 0?
            goodsList.map(item => {
              return <PostItem postDetail={item} key={item.postId} isHome={true} isCommunity={true}></PostItem>
            }):<></>

        }
      </View>
    </View>
  );
};

export default HotPost;
