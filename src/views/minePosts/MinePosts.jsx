import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {RefreshControl, ScrollView, Text, View} from "react-native";
import {getUserAllPosts} from "../../api/post";
import PostItem from "../../components/postItem/PostItem";
import {getGetLikes} from "../../api/likes";
import {getGetCollections} from "../../api/collection";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getMyCollectionHeritage} from "../../api/heritage";
import HeritageItem from "../../components/heritageItem/HeritageItem";

const MinePosts = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const [postsList, setPostsList] = useState([])
  const [currentRouter, setCurrentRouter] = useState('')
  const userInfo = useRef({})
  const [heritageList, setHeritageList] = useState([])

  /**
   * 获取用户信息
   */
  const getUserInfo = async () => {
    let getUserInfo = await AsyncStorage.getItem("userInfo") || {}
    userInfo.current = JSON.parse(getUserInfo)
  }
    // 0：帖子 1：喜欢 2：收藏
  const [state, setState] = useState(0)
  // 获取用户发布过的帖子
  const reqGetUserAllPosts = () => {
    setHeritageList([])
    setRefreshing(true)
    getUserAllPosts().then(res => {
      let dataArray = res.data
      setRefreshing(false)
      setPostsList(dataArray)
    })
  }
  // 获取用户所有的喜欢
  const reqGetUserAllLikes = () => {
    setHeritageList([])
    setRefreshing(true)
    getUserInfo().then(() => {
      getGetLikes(userInfo.current.id).then(res => {
        let dataArray = res.data
        setRefreshing(false)
        setPostsList(dataArray)
      })
    })

  }

  // 获取用户所有的收藏
  const reqGetUserAllCollection = () => {
    setRefreshing(true)
    getUserInfo().then(() => {
      getGetCollections(userInfo.current.id).then(res => {
        let dataArray = res.data
        setRefreshing(false)
        setPostsList(dataArray)
      })
    })
  }
  // 获取用户所有的非遗
  const reqGetUserAllHeritage = () => {
    setRefreshing(true)
    getUserInfo().then(() => {
      getMyCollectionHeritage(userInfo.current.id).then(res => {
        let dataArray = res.data
        console.log(res.data)
        setRefreshing(false)
        setHeritageList(dataArray)
      })
    })
  }
  // 下拉刷新
  const onRefresh = React.useCallback(() => {
    switch (currentRouter) {
      // 获取我发布的帖子
      case 'MinePosts':
        reqGetUserAllPosts()
        break;
      case 'MineLike':
        reqGetUserAllLikes()

        break;
      case 'MineCollection':
        reqGetUserAllCollection()
        reqGetUserAllHeritage()
        break;
    }
  }, []);
  useEffect(() => {
    if(!currentRouter) return
    switch (currentRouter) {
      // 获取我发布的帖子
      case 'MinePosts':
        setState(0)
        reqGetUserAllPosts()
        break;
      case 'MineLike':
        setState(1)
        reqGetUserAllLikes()
        break;
      case 'MineCollection':
        setState(2)
        reqGetUserAllCollection()
        reqGetUserAllHeritage()
        break;
    }
  }, [currentRouter]);
  // 获取我所有的帖子
  useEffect(() => {
    navigation.addListener("focus", (value) => {
      let currentRouter = value.target.split('-')[0]
      setCurrentRouter(currentRouter)
    })
    navigation.addListener("beforeRemove", (value) => {
      navigation.removeListener("focus",() => {})
    })
  }, []);
  return (
    <ScrollView
      className="bg-white"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>
      }
      alwaysBounceHorizontal={true}
      removeClippedSubviews={true}
      showsVerticalScrollIndicator={false}
      alwaysBounce={true}
    >
      {
        heritageList.length !== 0?
          heritageList.map((item, index) => {
            return (
              <HeritageItem item={item} key={item.id} isCollection={true}></HeritageItem>
            )
          })

          :<></>
      }
      <View className="flex-row flex-wrap">
        {
          postsList && postsList.length !== 0?
            postsList.map((item, index) => {
              return (
                <PostItem
                  key={index}
                  postDetail={item}
                />
              )
            })
            :(
              state === 0? <Text>还没有发布过内容哦~</Text>
              :state === 1? <Text>没有喜欢过任何内容哦~</Text>
              :state === 2? <Text>还没有收藏过任何内容哦~</Text>
              :<></>
            )
        }
      </View>
    </ScrollView>
  );
};

export default MinePosts;
