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
const RouterView = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator>
        {/*写帖子*/}
        <Stack.Screen name="WritePost" component={WritePostScreen} options={{headerShown: false}}/>
        {/*预览*/}
        <Stack.Screen name="Preview" component={PostPreview} options={{headerShown:false}}/>
        {/*首页*/}
        <Stack.Screen name="Home" component={FooterTab} options={{headerShown: false}}/>

        {/*登录&注册*/}
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Detail" component={DetailScreen} />
        {/*用户设置*/}
        <Stack.Screen name="Setting" component={SettingScreen} />
        {/*方言库*/}
        <Stack.Screen name="Voice" component={VoiceScreen} />
        {/*反馈*/}
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
        {/*帖子详情*/}
        <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{headerShown: false}}/>
        {/*我的*/}
        <Stack.Screen name="Mine" component={MineScreen} options={{headerShown: false}}/>

      </Stack.Navigator>
    </>

  );
};

export default RouterView;
