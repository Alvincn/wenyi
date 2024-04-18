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
const RouterView = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator>

        {/*登录*/}
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        {/*首页*/}
        <Stack.Screen name="Home" component={FooterTab} options={{headerShown: false}}/>
        {/**/}
        <Stack.Screen name="Detail" component={DetailScreen} />{/**/}
        <Stack.Screen name="Setting" component={SettingScreen} />{/**/}
        <Stack.Screen name="Voice" component={VoiceScreen} />{/**/}
        <Stack.Screen name="Feedback" component={FeedbackScreen} />{/**/}
        <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{headerShown: false}}/>{/**/}
        <Stack.Screen name="Mine" component={MineScreen} options={{headerShown: false}}/>{/**/}
      </Stack.Navigator>
    </>

  );
};

export default RouterView;
