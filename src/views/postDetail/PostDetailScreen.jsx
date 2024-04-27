import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, ScrollView, RefreshControl, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import HeaderTab from "../../components/headerTab/HeaderTab";
import UserDetail from "./components/UserDetail";
import BottomCount from "./components/BottomCount";
import CommentItem from "../../components/comment/CommentItem";
import {getPostById} from "../../api/post";
import {RichEditor} from "react-native-pell-rich-editor";
import {deleteRemoveCollection, getUserSavePost, postAddCollection} from "../../api/collection";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {deleteRemoveLikes, getUserLikesPost, postAddLikes} from "../../api/likes";
import {Toast} from "@fruits-chain/react-native-xiaoshu";

const PostDetailScreen = ({route}) => {
  const postId = route.params.postId
  const [postDetail, setPostDetail] = useState({})
  const richText = useRef(null)
  const [userInfo, setUserInfo] = useState({})
  const getPostDetail = async () => {
    let result = await getPostById(postId)
    setPostDetail(result.data)
  }

  useEffect(() => {
    if(postDetail.postId === undefined){
      return
    }
    userIsCollectionPost()
    userIsLikesPost()
  }, [postDetail]);

  useEffect(() => {
    getPostDetail()
    AsyncStorage.getItem('userInfo').then(r => {
      setUserInfo(JSON.parse(r))
    })
  }, [])
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
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
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getPostDetail()
    setRefreshing(false)
  }, []);
  // 元素-全部评论
  let commentAreaRef = useRef(null)
  // 控制评论区出现/隐藏
  // 0:显示数值，1:显示评论输入框
  const [commentShow, setCommentShow] = useState(0)

  // 是否收藏
  const [isCollection, setIsCollection] = useState(false)
  const collectionClick = () => {
    if(isCollection) {
      deleteRemoveCollection(collectionData).then(async res => {
        await userIsCollectionPost();
        await getPostDetail()
      })
    }else {
      postAddCollection(collectionData).then(async res => {
        await userIsCollectionPost();
        await getPostDetail()
      })
    }
  }
  // 是否喜欢
  const [isLike, setIsLike] = useState(false)
  const likeClick = () => {
    if(isLike) {
      deleteRemoveLikes(collectionData).then(async res => {
        if(res.code !== 200) {
          setTimeout(() => {
            navigation.navigate("Login")
          }, 1000)
          return Toast.fail('未登录！')
        }
        await userIsLikesPost();
        await getPostDetail()
      })
    }else {
      postAddLikes(collectionData).then(async res => {
        if(res.code !== 200) {
          setTimeout(() => {
            navigation.navigate("Login")
          }, 1000)
          return Toast.fail('未登录！')
        }
        await userIsLikesPost();
        await getPostDetail()
      })
    }

  }
  const scrollRef = useRef(null)

  const collectionData = useMemo(() => {
    return {
      postId: postDetail.postId
    }
  }, [postDetail, userInfo])
  /**
   * 判断当前用户是否收藏了该帖子
   */
  const userIsCollectionPost = async () => {
    let result = await getUserSavePost(collectionData)
    setIsCollection(result.data)
  }
  /**
   * 判断当前用户是否收藏了该帖子
   */
  const userIsLikesPost = async () => {
    let result = await getUserLikesPost(collectionData)
    setIsLike(result.data)
  }
  return (
    <SafeAreaView
      className="h-full"
    >
      <HeaderTab title="帖子详情"></HeaderTab>
      {/* 详情 */}
      <ScrollView
        onScroll={({nativeEvent}) => {
          const {layoutMeasurement} = nativeEvent;
          richText.current.blurContentEditor()
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
        <UserDetail userDetail={postDetail.user}></UserDetail>
        {/* 帖子详细内容 */}
        <View className="bg-white rounded pt-1">
          {/*标题*/}
          <Text className="text-2xl px-2 pt-1 font-bold leading-6">
            {postDetail.title}
          </Text>
          {
            postDetail.content &&
            // 拦截点击事件，不传递给子元素
            <TouchableOpacity
              style={{pointerEvents: 'box-only'}}
            >
              <RichEditor
                initialContentHTML={postDetail.content}
                ref={richText}
                editorStyle={{
                  contentCSSText: 'font-size: 18px; line-height: 25px; padding-top: 5px'
                }}
                disabled={true}
              />
            </TouchableOpacity>
          }
          {postDetail.location &&
            <Text className="pl-2 my-1">
              地点：{postDetail.location}
            </Text>}
          <Text className="pl-2 mb-1">
            编辑于：{postDetail.senderTime}
          </Text>
        </View>
        {/* 评论区 */}
        <View className="bg-white mt-2 px-2 rounded">
          <Text className="text-xl font-semibold my-1" ref={commentAreaRef}>全部评论</Text>
          <CommentItem comments={comments}></CommentItem>
        </View>
      </ScrollView>
      <BottomCount
        postData={postDetail}
        commentShow={commentShow}
        isCollection={isCollection}
        isLike={isLike}
        collectionClick={collectionClick}
        likeClick={likeClick}
      ></BottomCount>
    </SafeAreaView>
  );
};

export default PostDetailScreen;
