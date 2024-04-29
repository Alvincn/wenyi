import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, Dimensions, ScrollView} from "react-native";
import SearchKeywordContext from "../../../context/SearchKeyWordContext";
import {getPostByKeyword} from "../../../api/post";
import PostItem from "../../../components/postItem/PostItem";
import LoadingItem from "../../../components/loading/LoadingItem";

const PostResultItemScreen = ({ route }) => {
  const {keyword} = useContext(SearchKeywordContext)
  const [postsList, setPostsList] = useState([])
  const [loading, setLoading] = useState(false)
  const getPosts = async () => {
    setLoading(true)
    setPostsList([])
    let result = await getPostByKeyword(keyword)
    setLoading(false)
    setPostsList(result.data)
  }
  useEffect(() => {
    if(!keyword) return
    getPosts()
  }, [keyword])
  const navigation = useNavigation();
  const Postlist = () => {
    return <ScrollView className="h-full bg-white px-2 rounded-xl pt-2" >
      <View className="flex-row w-full flex-wrap h-full">
        {
          postsList.length > 0 ?postsList.map((item, index) => {
            return <PostItem postDetail={item} key={item.postId}></PostItem>
          }):<></>
        }
      </View>
      {/*缺醒状态*/}
      {
        postsList.length === 0? (
          <View className="flex-row pt-2 justify-center items-center">
            <Text className="text-base font-bold">
              啥也木有搜到呢，换个关键词试试😰
            </Text>
          </View>): <></>
      }
    </ScrollView>
  }
  return (
    <View style={{height: Dimensions.get("screen").height - 130}}>
      <LoadingItem loading={loading}></LoadingItem>
      {!loading && <Postlist></Postlist>}
    </View>
  );
};

export default PostResultItemScreen;
