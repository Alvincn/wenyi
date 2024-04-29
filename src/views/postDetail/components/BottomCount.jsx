import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity, StyleSheet, Keyboard} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {themeColor} from "../../../config/theme";
import {TextInput, Toast} from "@fruits-chain/react-native-xiaoshu";
import {getComments, saveComment} from "../../../api/comment";
import {getCurrentTime} from "../../../utils/utils";

const BottomCount = ({postData, commentShow, isCollection, isLike, collectionClick, likeClick, sendCommentFlag}) => {
  const navigation = useNavigation();
  const [commentValue, setCommentValue] = useState('')
  const [inputState, setInputState] = useState(false)
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setInputState(true)
    })
    Keyboard.addListener("keyboardDidHide", () => {
      setInputState(false)
    })
  }, []);
  const style = StyleSheet.create({
    countItem: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      height: 50
    }
  })
  const sendComment = async () => {
    if(commentValue.trim().length > 20) {
      return Toast("最多输入20个字哦🧐")
    }
    if(commentValue.trim().length === 0) {
      return Toast("请输入评论哦🤔")
    }
    let data = {
      postId: postData.postId,
      context: commentValue,
      commentTime: getCurrentTime()
    }
    let result = await saveComment(data)
    sendCommentFlag()
  }
  return (
    <View>
      <View className="p-3 pb-1.5 pt-1 flex-row justify-between items-center bg-white">
        <View className="bg-gray-200 rounded-2xl flex-1 pl-2 h-10">
          <TextInput placeholder="评论一下吧~" value={commentValue} onChange={setCommentValue}></TextInput>
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
              <TouchableOpacity
                className="rounded px-4 py-1"
                style={{backgroundColor: themeColor.primary}}
                onPress={() => {
                  sendComment()
                }}
              >
                <Text className="font-bold text-lg text-white">发送</Text>
              </TouchableOpacity>
            </View>
          )
        }
      </View>
    </View>
  );
};

export default BottomCount;
