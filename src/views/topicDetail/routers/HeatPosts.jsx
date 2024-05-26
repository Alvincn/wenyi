import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, ScrollView} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {reqGetAllPostByTopicId} from "../../../api/topic";
import PostItem from "../../../components/postItem/PostItem";
import JoinTopicButton from "../components/JoinTopicButton";

const HeatPosts = () => {
  const navigation = useNavigation();
  const [topicId, setTopicId] = useState('')
  const [postsList, setPostsList] = useState([])
  // 获取TopicId
  const getTopicId = async () => {
    let topicId = await AsyncStorage.getItem('clickTopicId')
    setTopicId(topicId)
  }
  // 根据话题id获取下边的帖子
  const getAllPosts = async () => {
    let posts = await reqGetAllPostByTopicId(topicId)
    setPostsList(posts.data)
  }
  useEffect(() => {
    return navigation.addListener("focus", async () => {
      await getTopicId()
    })
  }, [])
  useEffect(() => {
    if(topicId) {
      getAllPosts()
    }
  }, [topicId])
  return (
    <ScrollView
      className="h-full bg-white"
    >
      <View className="w-full flex-row relative">
        {
          postsList.map(item => {
            return <PostItem postDetail={item} key={item.postId} isCommunity={true} ></PostItem>
          })
        }
      </View>


    </ScrollView>
  );
};

export default HeatPosts;
