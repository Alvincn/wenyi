import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, RefreshControl, ScrollView} from "react-native";
import {getAllPosts} from "../../api/post";
import PostItem from "../../components/postItem/PostItem";

const PostScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const scrollViewRef = useRef(null);
  const [posts, setPosts] = useState([])
  const getPosts = () => {
    setRefreshing(true)
    getAllPosts().then(res => {
      setPosts(res.data)
      console.log(posts)
      setRefreshing(false)
    })
  }
  useEffect(() => {
    return navigation.addListener("focus", () => {
      console.log('focus')
      getPosts()
    })
  }, []);
  // 下拉刷新
  const onRefresh = React.useCallback(() => {
    getPosts()
  }, []);

  return (
    <ScrollView
      ref={scrollViewRef}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>
      }
      alwaysBounceHorizontal={true}
      removeClippedSubviews={true}
      showsVerticalScrollIndicator={false}
      alwaysBounce={true}
    >
      <View className="flex-row flex-wrap">
        {
          posts.map(item => {
            return (
              <PostItem postDetail={item} key={item.postId} isCommunity={true}></PostItem>
            )
          })
        }
      </View>
    </ScrollView>
  );
};

export default PostScreen;
