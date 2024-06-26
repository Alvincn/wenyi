import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {themeColor} from "../../../config/theme";
import TabBar from "./TabBar";
import {HomeTab} from "../../../config/config";
import {useCurrentRoute} from "../../../utils/routeUtils";

const Header = ({userInfo}) => {
  const currentRouter = useCurrentRoute();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    switch (currentRouter){
      case 'Hot':
        setActiveIndex(0)
        break
      case 'Heritage':
        setActiveIndex(1)
        break
    }
  }, [currentRouter]);
  // 路由跳转
  const navigation = useNavigation();
  const onTabPress = (index) => {
    switch (index) {
      case 0:
        navigation.navigate('Hot')
        setActiveIndex(0)
        break;
      case 1:
        navigation.navigate('Heritage')
        setActiveIndex(1)
        break
    }
    // 这里可以添加其他逻辑，比如导航到不同的屏幕
  };

  // 切换
  return (
    <View className="justify-between flex-row items-center mb-2">
      <TouchableOpacity
        onPress={() => {navigation.navigate("Mine")}}
      >
        <Image source={{uri: userInfo.avatar || themeColor.noAvatar}} style={{width: 35, height: 35, borderRadius: 50}}></Image>
      </TouchableOpacity>
      <View className="flex-row justify-center">
        <TabBar tabs={HomeTab} onTabPress={onTabPress} activeIndex={activeIndex} />
      </View>
      <TouchableOpacity className="w-6" onPress={() => {navigation.navigate("Search")}}>
        <Ionicons name="search" size={25} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
