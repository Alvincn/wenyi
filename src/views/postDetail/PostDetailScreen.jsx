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
import {Loading, Toast} from "@fruits-chain/react-native-xiaoshu";
import LoadingItem from "../../components/loading/LoadingItem";
import {getComments} from "../../api/comment";

const PostDetailScreen = ({route}) => {
  const postId = route.params.postId
  const [postDetail, setPostDetail] = useState({})
  const richText = useRef(null)
  const [userInfo, setUserInfo] = useState({})
  const [loading, setLoading] = useState(false)
  const getPostDetail = async () => {
    setLoading(true)
    let result = await getPostById(postId)
    setPostDetail(result.data)
    setLoading(false)
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
  useEffect(() => {
    getPostDetail()
  }, [postId])
  const [commentList, setCommentList] = useState([])
  const navigation = useNavigation();
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
  useEffect(() => {
    getCommentList()
  }, [postId])
  // 获取评论
  const getCommentList = async () => {
    let result = await getComments(postId)
    setCommentList(result.data)
  }
  const sendCommentFlag = async () => {
    await getCommentList()
  }
  const RenderRichEditor = () => {
    if(!postDetail.content) return <></>
    return (
      <>
        {/*// 拦截点击事件，不传递给子元素*/}
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
        {
          postDetail.location?
          <Text className="pl-2 my-1">
            地点：{postDetail.location}
          </Text>:<></>
        }
        <Text className="pl-2 mb-1">
          编辑于：{postDetail.senderTime}
        </Text>
      </>

    )
  }
  return (
    <SafeAreaView
      className="h-full"
    >
      <HeaderTab title="帖子详情"></HeaderTab>
      <LoadingItem loading={loading}></LoadingItem>
      {/* 详情 */}
      {!loading &&
        <ScrollView
          className="p-2"
        >
          <UserDetail userDetail={postDetail.user}></UserDetail>
          <View className="bg-white rounded pt-1">
            <Text className="text-2xl px-2 pt-1 font-bold leading-6">
              {postDetail.title}
            </Text>
            <RenderRichEditor></RenderRichEditor>
          </View>
          <View className="bg-white mt-2 px-2 rounded">
            <CommentItem comments={commentList}></CommentItem>
          </View>
        </ScrollView>
      }
      { !loading &&
        <BottomCount
          sendCommentFlag={sendCommentFlag}
          postData={postDetail}
          isCollection={isCollection}
          isLike={isLike}
          collectionClick={collectionClick}
          likeClick={likeClick}
        ></BottomCount>
      }

    </SafeAreaView>
  );
};

export default PostDetailScreen;
