import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, Image, TouchableOpacity} from "react-native";

const ToolsTab = () => {
  const navigation = useNavigation();
  const tools = [
    {
      title: '我的',
      icon: require('../imgs/person.png'),
      src: 'Mine'
    },
    {
      title: '非遗库',
      icon: require('../imgs/knowledge.png'),
      src: 'Heritage'
    },
    {
      title: '文驿',
      icon: require('../imgs/star.png'),
      src: 'MapView'
    },
    {
      title: '逛逛',
      icon: require('../imgs/deng.png'),
      src: 'Community'
    },
    {
      title: '反馈',
      icon: require('../imgs/back.png'),
      src: 'Feedback'
    }
  ]
  return (
    <View className="flex-row justify-between">
      {
        tools.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              className="justify-center items-center pt-2 pb-2"
              onPress={() => {navigation.navigate(item.src)}}
            >
              <Image source={item.icon} className="w-8 h-8"></Image>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )
        })
      }
    </View>
  );
};

export default ToolsTab;
