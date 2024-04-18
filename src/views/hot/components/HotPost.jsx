import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const HotPost = () => {
  const navigation = useNavigation();
  const posts = [
    {
      id: 1,
      title: '吹爆东北二人转！',
      avatar: require('../imgs/box.png'),
      name: '文驿官方',
      description: '东北二人转是东北的二人转，不是北京的二人转，也不是湖南的二人转，只是东北的二人转，是因为二人转出生在东北。东北二人转是东北的二人转，不是北京的二人转，也不是湖南的二人转，只是东北的二人转，是因为二人转出生在东北。',
      like: '20K',
      star: '13K',
      time: '2024.10.12 12:23'
    },
    {
      id: 2,
      title: '吹爆东北二人转！',
      avatar: require('../imgs/box.png'),
      name: '文驿官方',
      description: '东北二人转是东北的二人转，不是北京的二人转，也不是湖南的二人转，只是东北的二人转，是因为二人转出生在东北。',
      like: '20K',
      star: '13K',
      time: '2024.10.12 12:23'
    },
    {
      id: 3,
      title: '吹爆东北二人转！',
      avatar: require('../imgs/box.png'),
      name: '文驿官方',
      description: '东北二人转是东北的二人转，不是北京的二人转，也不是湖南的二人转，只是东北的二人转，是因为二人转出生在东北。',
      like: '20K',
      star: '13K',
      time: '2024.10.12 12:23'
    },
    {
      id: 4,
      title: '吹爆东北二人转！',
      avatar: require('../imgs/box.png'),
      name: '文驿官方',
      description: '东北二人转是东北的二人转，不是北京的二人转，也不是湖南的二人转，只是东北的二人转，是因为二人转出生在东北。',
      like: '20K',
      star: '13K',
      time: '2024.10.12 12:23'
    },
    {
      id: 5,
      title: '吹爆东北二人转！',
      avatar: require('../imgs/box.png'),
      name: '文驿官方',
      description: '东北二人转是东北的二人转，不是北京的二人转，也不是湖南的二人转，只是东北的二人转，是因为二人转出生在东北。',
      like: '20K',
      star: '13K',
      time: '2024.10.12 12:23'
    },
    {
      id: 6,
      title: '吹爆东北二人转！',
      avatar: require('../imgs/box.png'),
      name: '文驿官方',
      description: '东北二人转是东北的二人转，不是北京的二人转，也不是湖南的二人转，只是东北的二人转，是因为二人转出生在东北。',
      like: '20K',
      star: '13K',
      time: '2024.10.12 12:23'
    },
  ]
  return (
    <View className="">
      <View className="flex-row justify-between">
        <Text className="text-2xl font-bold">
          精选帖子
        </Text>
        <TouchableOpacity className="flex-row items-center justify-center bg-gray-200 rounded-2xl px-2">
          <Ionicons name="refresh" size={15}></Ionicons>
          <Text className="text-base text-center leading-4">换一批</Text>
        </TouchableOpacity>
      </View>

      <View>
        {/* 遍历帖子 */}
        {posts.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              className="mt-1 py-1 border-b-2 border-gray-200"
              onPress={
                () => {
                  navigation.navigate('PostDetail', {
                    postId: item.id
                  })
                }
              }
            >
              <Text className="text-xl font-semibold">{item.title}</Text>
              <View className="flex-row items-center">
                <Image source={item.avatar} style={{width: 25, height: 25, borderRadius: 50}}></Image>
                <Text className="text-base antialiased">{item.name}</Text>
              </View>
              <Text className="text-sm" numberOfLines={3} ellipsizeMode="tail">{item.description}</Text>
              <View className="flex-row">
                <View className="flex-row items-center mr-2">
                  <Ionicons name="heart-outline"></Ionicons>
                  <Text className="ml-1">{item.like}</Text>
                </View>
                <View className="flex-row items-center mr-2">
                  <Ionicons name="heart-outline"></Ionicons>
                  <Text className="ml-1">{item.like}</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="time-outline"></Ionicons>
                  <Text className="ml-1">{item.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  );
};

export default HotPost;
