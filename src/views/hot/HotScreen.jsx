import React, {useEffect, useRef, useState} from 'react';
import {useFocusEffect, useIsFocused, useNavigation} from "@react-navigation/native";
import {ScrollView, RefreshControl} from "react-native";
import Recommend from './components/Recommend';
import ToolsTab from "./components/ToolsTab";
import HotPost from "./components/HotPost";
import {Toast} from "@fruits-chain/react-native-xiaoshu";
import {getGoodsPosts} from "../../api/post";

const HotScreen = () => {
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const [goodPosts, setGoodPosts] = useState([])
  // 滚动到顶部的函数
  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  // 下拉刷新
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getGoodsPostsList().then(res => {
      console.log(goodPosts)
      setRefreshing(false)
    })
  }, []);
  /**
   * 获取精选帖子
   */
  const getGoodsPostsList = async () => {
    setRefreshing(true);
    let result = await getGoodsPosts()
    setRefreshing(false)
    setGoodPosts(result.data)
  }
  useEffect(() => {
    getGoodsPostsList()
  }, [])
  return (
    /**
     * 滚动的时候触发：onMomentumScrollBegin
     * refreshControl：下拉刷新
     * showsVerticalScrollIndicator：
    */
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
      {/* 每日推荐 */}
      <Recommend/>
      {/* 快捷跳转 */}
      <ToolsTab/>
      {/* 热门帖子 */}
      <HotPost goodsList={goodPosts} clickRefresh={getGoodsPostsList}/>
    </ScrollView>
  );
};

export default HotScreen;
