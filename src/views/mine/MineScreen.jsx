import React, {useEffect, useMemo, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {Dimensions, Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {getUserInfo} from "../../api/user";
import {StatusBar} from "expo-status-bar";
import {Ionicons} from "@expo/vector-icons";
import {Toast} from "@fruits-chain/react-native-xiaoshu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {userInfo} from "../../config/config";
import {calculateAge, daysSinceGivenDate} from "../../utils/utils";
import {themeColor} from "../../config/theme";
import UserPost from "./components/UserPost";

const MineScreen = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({})
  /**
   * 获取用户数据
   */
  const reqGetUserInfo = () => {
    getUserInfo().then(async res => {
      console.log(res)
      // 403未认证
      if (res.code !== 200) {
        setTimeout(() => {
          navigation.navigate('Login')
        }, 1000)
        return Toast.fail("未登录！")
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

  // 文驿等级
  const dateTag = () => {
    const registerDay = daysSinceGivenDate(userInfo.registerTime);
    if(registerDay < 15) return '🤣文驿萌新'
    else if(registerDay < 30) return '😆文驿新星'
    else if(registerDay < 60) return '🤩文驿行星'
    else return '😎文驿巨星'
  }
  // 年龄性别
  const showGenderAndAge = useMemo(() => {
    if(!userInfo.birthday || userInfo.gender === null) return false
    const age = calculateAge(userInfo.birthday)
    return <View className="flex-row">
      <Ionicons name={Number(userInfo.gender) === 1? "male": "female"} size={14} color={themeColor.primary}/>
      <Text className="font-bold pl-1">{age}岁</Text>
    </View>
  }, [userInfo])
  return (
    <View>
      <View style={{ height: 320 }}>
        <ImageBackground source={require('./img/defaultBack.jpg')} className="h-full">
          <SafeAreaView>
            <StatusBar style={"light"}/>
            {/*头部操作区*/}
            <View className="flex-row justify-between p-2 pt-3 items-center">
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Ionicons name="chevron-back" size={30} color={"gray"}></Ionicons>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Setting')
                }}
              >
                <Ionicons name="settings-sharp" size={25} color={"gray"}></Ionicons>
              </TouchableOpacity>
            </View>

            {/*个人信息*/}
            <View>
              {/*头像、昵称、地址*/}
              <View className="flex-row w-full px-3 pt-6">
                {/*头像*/}
                <View className="border-2 border-white rounded-full">
                  {
                    <Image
                      source={{uri: userInfo.avatar || themeColor.noAvatar}}
                      className="rounded-full w-24 h-24"
                    ></Image>
                  }
                </View>
                <View className="justify-center ml-2">
                  <View className="flex-row">
                    <Text className="text-white text-3xl font-bold">{userInfo.nickname || '文化宣传大使'}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("EditUserInfo", {
                          userInfo: userInfo
                        } )
                      }
                    }>
                      <Ionicons name="create-outline" color="gray" size={30}/>
                    </TouchableOpacity>
                  </View>

                  <Text className="text-white text-lg mt-2">
                    <Ionicons name="location-outline" size={15}/>
                    {userInfo.location || '十里堡'}
                  </Text>
                </View>
              </View>
              {/*个人简介*/}
              <View className="px-3 my-3">
                <Text className="text-white text-base">{userInfo.saying || '这位很懒，还没有编辑简介呢～'}</Text>
              </View>
              {/*标签*/}
              <View className="px-3 flex-row">
                {/*性别*/}
                {showGenderAndAge && <View className="px-2 py-1 bg-white rounded-2xl items-center justify-center mr-2">
                  {showGenderAndAge}
                </View>}
                {/*级别标签*/}
                <View className="px-2 py-1 bg-white rounded-2xl items-center justify-center mr-2">
                  <Text className="font-bold">
                    {dateTag()}
                  </Text>
                </View>
                {userInfo.schoolName && <View className="px-2 py-1 bg-white rounded-2xl items-center justify-center">
                  <View className="flex-row">
                    <View className="mr-0.5">
                      <Ionicons name="school" size={14} color={themeColor.primary}/>
                    </View>
                    <Text className="font-bold leading-4">
                      {userInfo.schoolName}
                    </Text>
                  </View>
                </View>}
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
      {/*发布信息*/}
      {userInfo  && <View style={{height: Dimensions.get('screen').height - 300}}>
        <UserPost></UserPost>
      </View>}
    </View>

  );
};

export default MineScreen;
