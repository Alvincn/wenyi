import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {themeColor} from "../../../config/theme";
import TabBar from "./TabBar";
import {communityTab, HomeTab, userInfo} from "../../../config/config";
import {useCurrentRoute} from "../../../utils/routeUtils";

const Header = () => {
  const currentRouter = useCurrentRoute();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    switch (currentRouter){
      case 'Post':
        setActiveIndex(0)
        break
      case 'Topic':
        setActiveIndex(1)
        break
    }
  }, [currentRouter]);
  // 路由跳转
  const navigation = useNavigation();
  const onTabPress = (index) => {
    switch (index) {
      case 0:
        navigation.navigate('Post')
        setActiveIndex(0)
        break;
      case 1:
        navigation.navigate('Topic')
        setActiveIndex(1)
        break
    }
    // 这里可以添加其他逻辑，比如导航到不同的屏幕
  };

  // 切换
  return (
    <View className="justify-between flex-row items-center mb-2">
      <View className="w-6">
        <Ionicons name="search" size={27} color={'black'} />
      </View>
      <View className="flex-row justify-center">
        <TabBar tabs={communityTab} onTabPress={onTabPress} activeIndex={activeIndex} />
      </View>
      <TouchableOpacity
        onPress={() => {navigation.navigate("WritePost")}}
      >
        <Ionicons name="add-circle-outline" size={27} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
