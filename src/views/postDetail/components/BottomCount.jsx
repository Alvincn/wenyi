import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {themeColor} from "../../../config/theme";
import {TextInput} from "@fruits-chain/react-native-xiaoshu";

const BottomCount = ({postData, commentShow, isCollection, isLike, collectionClick, likeClick}) => {
  const navigation = useNavigation();
  const [commentValue, setCommentValue] = useState()
  const [inputState, setInputState] = useState(false)

  // 渲染数量
  const CountComponent = () => {
    return <View className="flex-row justify-around items-center">
      <TouchableOpacity
        style={style.countItem}
        onPress={() => likeClick()}
      >
        <Ionicons name={isLike? "heart": "heart-outline"} size={20} color={isLike? "#f8557b": "gray"}></Ionicons>
        <Text className="ml-1">{postData.likeNumber}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.countItem}
        onPress={() => collectionClick()}
      >
        <Ionicons name={isCollection? "star": "star-outline"} size={20} color={isCollection? "#f8b555": "gray"}></Ionicons>
        <Text className="ml-1">{postData.collectionNumber}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.countItem}>
        <Ionicons name="chatbox-ellipses-outline" size={20} color="gray"></Ionicons>
        <Text className="ml-1">{postData.commentsNumber}</Text>
      </TouchableOpacity>
    </View>
  }
  // 渲染评论输入区
  const CommentInput = () => {
    // 输入状态，用户输入正在输入（输入框是否聚焦）
    // 输入框聚焦
    const inputOnFocus = () => {
      setInputState(true)
    }
    // 输入框失去焦点
    const inputOnBlur = () => {
      setInputState(false)
    }
    return(
      <View className="p-3 pb-1.5 pt-1 flex-row justify-between items-center bg-white">
        <View className="bg-gray-200 rounded-2xl flex-1 pl-2 h-10">
          <TextInput placeholder="评论一下吧~" onFocus={inputOnFocus} onBlur={inputOnBlur} value={commentValue} onChange={setCommentValue}></TextInput>
          {/*<InputItem placeholder="评论一下吧~" onFocus={inputOnFocus} onBlur={inputOnBlur} value={commentValue}></InputItem>*/}
        </View>
        {
          !inputState? (
            <View className="flex-row basis-28">
              <TouchableOpacity
                onPress={() => likeClick()}
                style={style.countItem}
              >
                <Ionicons name={isLike? "heart": "heart-outline"} size={20} color={isLike? "#f8557b": "gray"}></Ionicons>
                <Text className="ml-1">{postData.likeNumber}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => collectionClick()}
                style={style.countItem}
              >
                <Ionicons name={isCollection? "star": "star-outline"} size={20} color={isCollection? "#f8b555": "gray"}></Ionicons>
                <Text className="ml-1">{postData.collectionNumber}</Text>
              </TouchableOpacity>
            </View>
          ): (
            <View className="mx-2">
              <TouchableOpacity className="rounded px-4 py-1" style={{backgroundColor: themeColor.primary}}>
                <Text className="font-bold text-lg text-white">发送</Text>
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
