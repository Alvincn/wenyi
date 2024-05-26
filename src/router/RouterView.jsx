import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import DetailScreen from "../views/detail/DetailScreen";
import FooterTab from "../components/footerTab/FooterTab";
import SettingScreen from "../views/setting/SettingScreen";
import VoiceScreen from "../views/voice/Voice";
import FeedbackScreen from "../views/feedback/Feedback";
import PostDetailScreen from "../views/postDetail/PostDetailScreen";
import MineScreen from "../views/mine/MineScreen";
import LoginScreen from "../views/login/LoginScreen";
import WritePostScreen from "../views/writePost/WritePostScreen";
import PostPreview from "../views/postPreview/PostPreview";
import EditUserInfo from "../views/editUserInfo/EditUserInfo";
import HeritageDetailScreen from "../views/heritageDetail/HeritageDetailScreen";
import SearchScreen from "../views/search/SearchScreen";
import SearchResult from "../views/searchResult/SearchResult";
import UserCenterScreen from "../views/userCenter/UserCenterScreen";
import HappyScreen from "../views/happy/HappyScreen";
import FeedBackListScreen from "../views/feedbackList/FeedBackListScreen";
import FeedbackDetail from "../views/feedbackDetail/FeedbackDetail";
import TopicDetail from "../views/topicDetail/TopicDetail";
const RouterView = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator>
        {/*首页*/}
        <Stack.Screen name="Home" component={FooterTab} options={{headerShown: false}}/>
        {/*搜索*/}
        <Stack.Screen name="Search" component={SearchScreen} options={{headerShown: false}}/>
        {/*搜索结果*/}
        <Stack.Screen name="SearchResult" component={SearchResult} options={{headerShown: false}}/>
        {/*编辑用户详情*/}
        <Stack.Screen name="EditUserInfo" component={EditUserInfo} options={{headerShown:false}}/>
        {/*预览*/}
        <Stack.Screen name="Preview" component={PostPreview} options={{headerShown:false}}/>
        {/*写帖子*/}
        <Stack.Screen name="WritePost" component={WritePostScreen} options={{headerShown: false}}/>
        {/*我的*/}
        <Stack.Screen name="Mine" component={MineScreen} options={{headerShown: false}}/>
        <Stack.Screen name="UserCenter" component={UserCenterScreen} options={{headerShown: false}}/>
        {/*登录&注册*/}
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        {/*系统设置*/}
        <Stack.Screen name="Setting" component={SettingScreen} options={{headerShown: false}}/>
        {/*方言库*/}
        <Stack.Screen name="Voice" component={VoiceScreen} />
        {/*反馈*/}
        <Stack.Screen name="Feedback" component={FeedbackScreen} options={{headerShown: false}}/>
        {/*帖子详情*/}
        <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{headerShown: false}}/>
        {/*非遗详情*/}
        <Stack.Screen name="HeritageDetail" component={HeritageDetailScreen} options={{headerShown: false}}/>
        {/*好玩*/}
        <Stack.Screen name="Happy" component={HappyScreen} options={{headerShown: false}}/>
        {/*反馈列表*/}
        <Stack.Screen name="FeedbackList" component={FeedBackListScreen} options={{headerShown: false}}/>
        {/*反馈详情*/}
        <Stack.Screen name="FeedbackDetail" component={FeedbackDetail} options={{headerShown: false}}/>
        {/*话题详情*/}
        <Stack.Screen name="TopicDetail" component={TopicDetail} options={{headerShown: false}}/>
      </Stack.Navigator>
    </>

  );
};

export default RouterView;
