import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {FEEDBACK_MAP} from "../../../config/constant";
import {boxShadow} from "../../../config/theme";
import {Ionicons} from "@expo/vector-icons";

const FeedbackItem = ({ feedback }) => {
  const navigation = useNavigation();
  const [imgArr, setImgArr] = useState([])
  useEffect(() => {
    if(!feedback) return
    setImgArr(JSON.parse(feedback.imgs))
  }, [feedback]);
  const RenderType = () => {
    let color;
    switch (Number(feedback.type)) {
      case 1:
        color = '#F56C6C'
        break;
      case 2:
        color = '#5CB87A'
        break;
      case 3:
        color = '#E6A23C'
        break;
      case 4:
        color = '#409EFF'
        break;
      case 5:
        color = '#8896B3'
        break;
    }
    return <Text className="font-bold text-base px-2 rounded-xl text-white" style={{backgroundColor: color}}>{FEEDBACK_MAP.get(Number(feedback.type))}</Text>
  }
  return (
    <TouchableOpacity
      // onPress={() => {
      //   navigation.navigate("FeedbackDetail", {
      //     id: feedback.id
      //   })
      // }}
      className="w-full mb-2 bg-white rounded-xl p-2"
      style={boxShadow(10).boxShadow}
    >
      <View className="flex-row justify-between">
        <RenderType></RenderType>
        <View className={"flex-row items-center justify-center"}>
          <View className={["w-2 h-2 rounded-full", feedback.status === '0'? 'bg-amber-300': 'bg-blue-400'].join(" ")}></View>
          <Text className="font-bold pl-1">
            {feedback.status === '0'? "未解决": "已查看"}
          </Text>
        </View>
      </View>
      <View className="flex-row">
        <Text className="font-bold text-base pl-1 py-1 flex-1" numberOfLines={2}>{feedback.content}sdafasdfsd aaf dasdf sadf as fsdaf asd fddsaf sadf sadf assfd sd ffsfsafdasffdsfasfsadfdsadsfads</Text>
      </View>
      <View className="flex-row w-full overflow-hidden pl-2">
        {
          imgArr.length !== 0? imgArr.map((item, index) => {
            return <Image source={{uri: item}} key={index} style={{width: 80, aspectRatio: 9 / 16}}></Image>
          }):<></>
        }
      </View>
      <View>
        <View className="flex-row ">
          <Ionicons name="time" size={15}/>
          <Text className="pl-1">{feedback.submitTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeedbackItem;
