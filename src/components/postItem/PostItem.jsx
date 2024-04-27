import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, Image, StyleSheet, Platform, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const PostItem = ({postDetail, isCommunity = false}) => {
  const [thisPostDetail, setThisPostDetail] = useState({});
  useEffect(() => {
    if(!postDetail) return
    let postInfo = postDetail
    if(Object.keys(postInfo).includes('posts') && Object.keys(postInfo).includes('user')){
      postInfo = {
        noState: true,
        ...postInfo,
        ...postInfo.posts,
      }
      postInfo.user = postDetail.user || null
      setThisPostDetail(postInfo)
    }else {
      setThisPostDetail(postDetail)
    }
  }, [postDetail])
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    boxShadow: {},
    postItemFlex: {
      width: "49%",
      marginHorizontal: "0.5%",
      borderRadius: 10,
      height: "auto"
    },

  });
  const [widthStatus, setWidthStatus] = useState(0)
  const [aspectRatio, setAspectRatio] = useState(null);
  // 根据不同平台选择不同的阴影展示
  if(Platform.OS === 'ios'){
    styles.boxShadow = {
      shadowColor: 'black',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    }
  } else if(Platform.OS === 'android'){
    styles.boxShadow = {
      shadowColor: 'gray',
      elevation: 10
    }
  }
  const onLayout = event => {
    const { width } = event.nativeEvent.layout;
    setWidthStatus(width - 16)
  };
  /**
   * 帖子状态
   */
  const postStatus = () => {
    let status_text = ''
    let status_color = ''
    switch (thisPostDetail.postStatus) {
      case '0':
        status_text = '草稿';
        // status_color = '#cddbff';
        status_color = '#8896B3';
        break;
      case'1':
        status_text = '审核中';
        status_color = '#E6A23C';
        break;
      case '2':
        status_text = '已发布';
        status_color = '#5CB87A';
        break;
      case '3':
        status_text = '已驳回';
        status_color = '#F56C6C';
        break;
    }
    return (
      <View className="h-2 w-2 rounded-full mt-1 ml-0.5" style={{backgroundColor: status_color}}>
        {/*<Text className="text-white">*/}
        {/*  {status_text}*/}
        {/*</Text>*/}
      </View>
    )
  }
  return thisPostDetail.coverImg?
    <TouchableOpacity
      style={[styles.boxShadow, styles.postItemFlex]}
      className="bg-white p-2"
      onPress={() => {
        navigation.navigate('PostDetail', {
          postId: thisPostDetail.postId
        })
      }}
      onLayout={onLayout}>
      <Image
        source={{uri: thisPostDetail.coverImg}}
         style={{width: widthStatus, aspectRatio:  9 / 10}}
        className="rounded-xl"
      />
      <View>
        <View className="flex-row">
          {thisPostDetail.privateStatus === '0'?<View className="relative top-1">
            <Ionicons name="lock-closed-outline" size={15}/>
          </View>:<></>}
          <Text className="font-bold text-xl">{thisPostDetail.title}</Text>
          {!isCommunity && !thisPostDetail?.noState && postStatus()}
        </View>
        {/*<Text numberOfLines={2} className="text-base leading-5">{thisPostDetail.description}</Text>*/}
      </View>
      {!isCommunity && <View className="flex-row mx-0.5 mt-1">
        <Ionicons name="time-outline" size={14} color="gray"/>
        <Text className="pl-1 text-gray-500">{thisPostDetail.senderTime}</Text>
      </View>}
      <View className="flex-row justify-between items-center">
        {
          thisPostDetail?.user?.avatar?
            <View className="flex-row items-center mb-1">
              <Image source={{uri: thisPostDetail.user.avatar}} width={20} height={20} className="rounded-full"></Image>
              <Text className="ml-1">{thisPostDetail.user.nickname}</Text>
            </View>
            : <></>
        }
        <View className="flex-row mx-0.5 ">
          <Ionicons name="eye-outline" size={15} color="gray"/>
          <Text className="pl-1 text-gray-500">{thisPostDetail.watchNumber}</Text>
        </View>
      </View>

    </TouchableOpacity>
    :
    <TouchableOpacity
      style={[styles.boxShadow]}
      className="bg-white p-2 m-1 w-full rounded-xl"
      onLayout={onLayout}
      onPress={() => {
        navigation.navigate('PostDetail', {
          postId: thisPostDetail.postId
        })
      }}
    >
      <View>
        <View className="flex-row">
          {thisPostDetail.privateStatus === 0?<View className="relative top-1">
            <Ionicons name="lock-closed-outline" size={15}/>
          </View>:<></>}
          <Text className="font-bold text-xl">{thisPostDetail.title} </Text>
          {!isCommunity && !thisPostDetail?.noState && postStatus()}
        </View>
        {
          thisPostDetail?.user?.avatar?
          <View className="flex-row items-center mb-1">
            <Image source={{uri: thisPostDetail.user.avatar}} width={25} height={25} className="rounded-full"></Image>
            <Text className="text-base">{thisPostDetail.user.nickname}</Text>
          </View>
          : <></>
        }
        <Text numberOfLines={2} className="text-base leading-5">{thisPostDetail.description}</Text>
      </View>
      <View className="flex-row mt-1 justify-between pr-2">
        <View className="flex-row mx-0.5">
          <Ionicons name="time-outline" size={14} color="gray"/>
          <Text className="pl-1 text-gray-500">{thisPostDetail.senderTime}</Text>
        </View>
        <View className="flex-row">
          <View className="flex-row mx-0.5 ">
            <Ionicons name="eye-outline" size={15} color="gray"/>
            <Text className="pl-1 text-gray-500">{thisPostDetail.watchNumber}</Text>
          </View>
          <View className="flex-row mx-0.5">
            <Ionicons name="heart-outline" size={14} color="gray"/>
            <Text className="pl-1 text-gray-500">{thisPostDetail.likeNumber}</Text>
          </View>
          <View className="flex-row mx-0.5">
            <Ionicons name="star-outline" size={14} color="gray"/>
            <Text className="pl-1 text-gray-500">{thisPostDetail.collectionNumber}</Text>
          </View>
        </View>

      </View>
    </TouchableOpacity>
  ;
};

export default PostItem;
