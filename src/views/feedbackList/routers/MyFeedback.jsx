import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, ScrollView} from "react-native";
import {getFeedbackList, getMyFeedback} from "../../../api/feedback";
import LoadingItem from "../../../components/loading/LoadingItem";
import FeedbackItem from "../components/FeedbackItem";

const MyFeedback = () => {
  const navigation = useNavigation();
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false)
  const getAllFeedBacks = () => {
    setLoading(true)
    getMyFeedback().then(res => {
      setFeedbackList(res.data || [])
      setLoading(false)
    })
  }
  useEffect(() => {
    return navigation.addListener("focus", () => {
      getAllFeedBacks()
    })
  }, [])
  return (
    <ScrollView className="p-2">
      {
        <LoadingItem loading={loading}></LoadingItem>
      }
      {
        !loading && feedbackList.length !== 0? feedbackList.map((item, index) => {
          return <FeedbackItem feedback={item} key={item.id}></FeedbackItem>
        }): <Text className="font-bold text-base text-center mt-10">暂时还没有反馈呢🫨</Text>
      }
    </ScrollView>
  );
};

export default MyFeedback;
