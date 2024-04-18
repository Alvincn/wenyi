import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, ScrollView, RefreshControl} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import HeaderTab from "../../components/headerTab/HeaderTab";
import UserDetail from "./components/UserDetail";
import BottomCount from "./components/BottomCount";
import CommentItem from "../../components/comment/CommentItem";

const PostDetailScreen = ({route}) => {
  const postId = route.params.postId
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const postDetail =                                                                                                                                             {
    title: '吹爆东北二人转！',
    userDetail: {
      name: '文驿官方',
      location: '北京',
      tag: '官方',
      Avatar: require('./imgs/touxiang.png')
    },
    content: "        东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！\n" +
      "        东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思\n" +
      "        东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思 东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！\n" +
      "        东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思\n" +
      "        东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思 东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！\n" +
      "        东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思\n" +
      "        东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思 东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！\n" +
      "        东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思\n" +
      "        东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思 东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！\n" +
      "        东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思\n" +
      "        东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思 东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！\n" +
      "        东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思\n" +
      "        东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思\n" +
      "        东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思        东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思        东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思        东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思        东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是真的好看，有意思！东北二人转是意思！东北二人转是真的好看，有意思！",
    postData: {
      likeCount: 123,
      collectionCount: 321,
      commentCount: 23,
    },
    updateTime: '2024.4.13 21:33'
  }
  const comments = [
    {
      userName: '小仙女',
      Avatar: require('./imgs/img.png'),
      content: '嘎嘎好玩，我最喜欢听了！',
      location: '北京',
      updateTime: '04-09'
    },
    {
      userName: '孙悟空',
      Avatar: require('./imgs/img.png'),
      content: '俺老孙就喜欢听二人转！',
      location: '花果山',
      updateTime: '04-09'
    },
    {
      userName: '猪八戒',
      Avatar: require('./imgs/img.png'),
      content: '二人转是啥，还不如吃点好吃的！',
      location: '高老庄',
      updateTime: '04-09'
    },
    {
      userName: '唐僧',
      Avatar: require('./imgs/img.png'),
      content: '阿弥陀佛，出家人不打诳语，二人转不好看我肉给你吃！',
      location: '东土大唐',
      updateTime: '04-09'
    },
  ]
  // 下拉刷新
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }, []);
  // 元素-全部评论
  let commentAreaRef = useRef(null)
  // 控制评论区出现/隐藏
  // 0:显示数值，1:显示评论输入框
  const [commentShow, setCommentShow] = useState(0)


  return (
    <SafeAreaView
      className="h-full"
    >
      <HeaderTab title="帖子详情"></HeaderTab>
      {/* 详情 */}
      <ScrollView
        onScroll={({nativeEvent}) => {
          const {layoutMeasurement} = nativeEvent;
          if (commentAreaRef.current) {
            commentAreaRef.current.measure((x, y, width, height, pageX, pageY) => {
              if(layoutMeasurement.height > (pageY - 50)) {
                setCommentShow(1)
              }else {
                setCommentShow(0)
              }
            });
          }
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>
        }
        className="p-2"
      >
        {/* 用户信息 */}
        <UserDetail userDetail={postDetail.userDetail}></UserDetail>
        {/* 帖子详细内容 */}
        <View className="mt-2 pb-3">
          <Text className="font-bold text-2xl">{postDetail.title}</Text>
          <Text className="text-lg">
            {postDetail.content}
          </Text>
          <Text className="mt-2 text-gray-500">编辑于：{postDetail.updateTime}</Text>
        </View>
        {/* 分割线 */}
        <View className="bg-gray-300 h-1.5"></View>
        {/* 评论区 */}
        <Text className="text-xl font-semibold my-1" ref={commentAreaRef}>全部评论</Text>
        <CommentItem comments={comments}></CommentItem>
      </ScrollView>
      <BottomCount postData={postDetail.postData} commentShow={commentShow}></BottomCount>

    </SafeAreaView>
  );
};

export default PostDetailScreen;
