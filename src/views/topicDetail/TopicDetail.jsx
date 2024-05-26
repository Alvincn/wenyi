import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, ScrollView, ImageBackground, StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import TopicHeader from "../../components/topicHeader/TopicHeader";
import {reqGetTopicById} from "../../api/topic";
import LoadingItem from "../../components/loading/LoadingItem";
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import TotalCount from "./components/TotalCount";
import {StatusBar} from "expo-status-bar";
import TopicPosts from "./components/TopicPosts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JoinTopicButton from "./components/JoinTopicButton";

const TopicDetail = ({ route }) => {
  const topicId = route.params.topicId
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)
  const [topicDetail, setTopicDetail] = useState([])
  // 根据topicId获取到这个话题
  const getTopicById = async () => {
    setLoading(true)
    let result = await reqGetTopicById(topicId)
    setTopicDetail(result.data)
    setLoading(false)
  }
  useEffect(() => {
    getTopicById()
  }, [topicId])
  return (
    <View className="h-full w-full bg-white">
      <StatusBar style={"dark"}/>
        {
          loading && <LoadingItem loading={loading}/>
        }
        {!loading &&
          <SafeAreaView
            className="p-2 h-full relative"
          >
            <TopicHeader></TopicHeader>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Text className="font-bold text-2xl mt-5">
                  {topicDetail.title}
                </Text>
              </View>
              <Text className="text-red-500 text-base">🔥{topicDetail.heat}万</Text>
            </View>
            <Text className="text-base">{topicDetail.description}</Text>
            <TotalCount detail={topicDetail}></TotalCount>
            <TopicPosts topicId={topicId}></TopicPosts>
          </SafeAreaView>
        }
    </View>

  );
};
const styles = StyleSheet.create({
  linearGradient: {
    zIndex: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default TopicDetail;
