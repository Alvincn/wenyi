import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {themeColor} from "../../../config/theme";

const BottomCount = ({postData, commentShow}) => {
  const navigation = useNavigation();
  const [commentValue, setCommentValue] = useState()
  const [inputState, setInputState] = useState(false)

  // 渲染数量
  const CountComponent = () => {
    return <View className="flex-row justify-around items-center">
      <TouchableOpacity style={style.countItem}>
        <Ionicons name="heart-outline" size={20} color="gray"></Ionicons>
        <Text className="ml-1">{postData.likeCount}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.countItem}>
        <Ionicons name="star-outline" size={20} color="gray"></Ionicons>
        <Text className="ml-1">{postData.collectionCount}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.countItem}>
        <Ionicons name="chatbox-ellipses-outline" size={20} color="gray"></Ionicons>
        <Text className="ml-1">{postData.commentCount}</Text>
      </TouchableOpacity>
    </View>
  }
  // 渲染评论输入区
  const CommentInput = () => {
    // 输入状态，用户输入正在输入（输入框是否聚焦）
    // 输入框聚焦
    const inputOnFocus = () => {
      console.log('isFocus')
      setInputState(true)
    }
    // 输入框失去焦点
    const inputOnBlur = () => {
      setInputState(false)
      console.log('inputOnBlur')
    }
    return(
      <View className="p-3 flex-row justify-between items-center">
        <View className="bg-gray-200 rounded-2xl flex-1">
          {/*<InputItem placeholder="评论一下吧~" onFocus={inputOnFocus} onBlur={inputOnBlur} value={commentValue}></InputItem>*/}
        </View>
        {
          !inputState? (
            <View className="flex-row basis-28">
              <TouchableOpacity style={style.countItem}>
                <Ionicons name="heart-outline" size={20} color="gray"></Ionicons>
                <Text className="ml-1">{postData.likeCount}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.countItem}>
                <Ionicons name="star-outline" size={20} color="gray"></Ionicons>
                <Text className="ml-1">{postData.collectionCount}</Text>
              </TouchableOpacity>
            </View>
          ): (
            <View className="mx-2">
              <TouchableOpacity className="rounded px-2 py-1" style={{backgroundColor: themeColor.primary}}>
                <Text className="font-bold text-lg ">发送</Text>
              </TouchableOpacity>
            </View>
          )
        }

      </View>
    )
  }
  const style = StyleSheet.create({
    countItem: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      height: 50
    }
  })
  return (
    <View>
      {
        commentShow === 0? CountComponent(): CommentInput()
      }
    </View>
  );
};

export default BottomCount;
