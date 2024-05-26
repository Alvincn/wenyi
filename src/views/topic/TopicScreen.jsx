import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {FlatList, Text, View} from "react-native";
import {getAllOpenTopics} from "../../api/topic";
import LoadingItem from "../../components/loading/LoadingItem";
import TopicItem from "./components/TopicItem";

const TopicScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)
  // 数据
  const [topicList, setTopicList] = useState([])
  // 刷新
  const [refresh, setRefresh] = useState(false)
  // 获取全部话题
  const reqGetAllTopic = async () => {
    setLoading(true)
    setRefresh(true)
    let res = await getAllOpenTopics()
    setTopicList(res.data)
    console.log(res)
    setRefresh(false)
    setLoading(false)
    return res
  }
  useEffect(() => {
    return navigation.addListener("focus", () => {
      reqGetAllTopic()
    })
  }, [])
  const RenderTopicItem = ({ item, index }) => {
    return <TopicItem item={item} index={index}></TopicItem>
  }
  return (
      loading? <LoadingItem loading={loading} bgWhite={false}/>
        :(
          <FlatList
            data={topicList}
            renderItem={RenderTopicItem}
            refreshing={refresh}
            onRefresh={() => {
              reqGetAllTopic()
            }}
          >
            <Text>
              TopicScreen
            </Text>
          </FlatList>
        )
  );
};

export default TopicScreen;
