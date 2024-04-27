import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import BackHeader from "../../components/backHeader/BackHeader";
import {themeColor} from "../../config/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingScreen = () => {
  const navigation = useNavigation();
  /**
   * 退出登录
   */
  const logOut = async () => {
    await AsyncStorage.clear(() => {
      setTimeout(() => {
        navigation.navigate("Login")
      }, 500)
    })
  }
  return (
    <SafeAreaView>
      <StatusBar style={"dark"}></StatusBar>
      <BackHeader title="系统设置" rightContent={() => <></>} rightHandle={() => {}} leftHandle={() => {
        navigation.goBack();
      }}></BackHeader>
      <View className="p-2">
        {/*退出登录*/}
        <TouchableOpacity
          className="w-full p-2 rounded flex-row justify-center items-center"
          style={{backgroundColor: themeColor.primary}}
          onPress={logOut}
        >
          <Text className="text-base text-white">退出登录</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default SettingScreen;
