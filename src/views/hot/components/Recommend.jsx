import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity, StyleSheet, Platform, Image} from "react-native";
import {themeColor} from "../../../config/theme";
import {Ionicons} from "@expo/vector-icons";
import {dateMap} from "../../../config/constant";

const styles = StyleSheet.create({
  boxShadow: {},
  card: {
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 8,
    position: 'relative',
    width: '100%',
    marginVertical: 10,
    height: 200,
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  }
});
// 根据不同平台选择不同的阴影展示
if(Platform.OS === 'ios'){
  styles.boxShadow = {
    shadowColor: '#52006A',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  }
} else if(Platform.OS === 'android'){
  styles.boxShadow = {
    shadowColor: 'gray',
    elevation: 5
  }
}
const Recommend = () => {
  // 获取时间
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const navigation = useNavigation();
  return (
    <View
      style={[styles.card, styles.boxShadow]}
    >
      {/*顶部每日非遗内容区*/}
      <View className="flex-row justify-between items-center">
        <View className="flex-row">
          <Text className="font-bold text-4xl mr-1" style={{color: themeColor.primary}}>
            {day < 10? '0' + day: day}
          </Text>
          <View>
            <Text className="font-bold leading-5">{dateMap.get(month)}</Text>
            <Text className="font-bold leading-4">{year}</Text>
          </View>
          <Text className="font-bold text-3xl leading-10 ml-1">
            每日非遗
          </Text>
        </View>
        <TouchableOpacity className="flex-row h-full justify-center items-center">
          <Text>
            往期推荐 >
          </Text>
        </TouchableOpacity>
      </View>
      {/*下方图片展示*/}
      <TouchableOpacity className="w-full justify-center items-center flex-1">
        <Image source={require('../imgs/img.png')} className="max-h-36 min-w-full"></Image>
      </TouchableOpacity>
      {/*地址展示*/}
      <View className="flex-row justify-between absolute left-2.5 bottom-2 w-full" style={{backgroundColor: 'rgba(0, 0, 0, .5)'}}>
        <Text className="text-white pl-1">
          <Ionicons name="location" color="white"></Ionicons>
          <Text> 云南</Text>
          <Text> · </Text>
          <Text>大理</Text>
          <Text> · </Text>
          <Text>扎染</Text>
        </Text>
        <Text className="text-white pr-2">
          去看看 >
        </Text>
      </View>
    </View>
  );
};

export default Recommend;
