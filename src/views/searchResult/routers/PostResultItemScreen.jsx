import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, Dimensions, ScrollView} from "react-native";
import SearchKeywordContext from "../../../context/SearchKeyWordContext";
import {getPostByKeyword} from "../../../api/post";
import PostItem from "../../../components/postItem/PostItem";

const PostResultItemScreen = ({ route }) => {
  const {keyword} = useContext(SearchKeywordContext)
  const [postsList, setPostsList] = useState([])
  const getPosts = async () => {
    setPostsList([])
    let result = await getPostByKeyword(keyword)
    setPostsList(result.data)
  }
  useEffect(() => {
    if(!keyword) return
    getPosts()
  }, [keyword])
  const navigation = useNavigation();
  return (
    <View style={{height: Dimensions.get("screen").height - 130}}>
      <ScrollView className="h-full bg-white px-2 rounded-xl" >
        {
          postsList.length > 0 ?postsList.map((item, index) => {
            return <PostItem postDetail={item} key={item.postId}></PostItem>
          }):<></>
        }
      </ScrollView>
    </View>
  );
};

export default PostResultItemScreen;
