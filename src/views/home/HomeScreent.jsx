import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, ImageBackground, Image, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "./components/Header";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HotScreen from "../hot/HotScreen";
import HeritageScreen from "../heritage/HeritageScreen";
import {themeColor} from "../../config/theme";
import {getUserInfo} from "../../api/user";
import {Toast} from "@fruits-chain/react-native-xiaoshu";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({})
  const reqGetUserInfo = () => {
    getUserInfo().then(async res => {
      // 403未认证
      if (res.code === 403) {
        setTimeout(() => {
          navigation.navigate('Login')
        }, 1000)
        return Toast.fail("未登录！")
      }
      // 失败了
      if(res.code !== 200) {
        return
        // return Toast.fail(res.message)
      }
      // 保存用户信息
      await AsyncStorage.setItem('userInfo', JSON.stringify(res.data))
      setUserInfo(res.data)
    })
  }
  useEffect(() => {
    return navigation.addListener("focus", e => {
      reqGetUserInfo()
    });
  }, [navigation])
  return (
    <ImageBackground source={themeColor.primaryBgImg} className="w-full h-full" resizeMode="cover">
      <SafeAreaView className="w-full h-full px-3 pt-3">
        {/*顶部Tab*/}
        <Header userInfo={userInfo}></Header>
        {/*展示导航的地方*/}
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: 'rgba(0, 0, 0, 0)'
            }
          }}
        >
          <Stack.Screen name="Hot" component={HotScreen}/>{/**/}
          <Stack.Screen name="Heritage" component={HeritageScreen}/>{/**/}
        </Stack.Navigator>
      </SafeAreaView>
    </ImageBackground>

  );
};

export default HomeScreen;
