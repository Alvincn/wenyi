import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, Image, TouchableOpacity} from "react-native";

const ToolsTab = () => {
  const navigation = useNavigation();
  const tools = [
    {
      title: '方言库',
      icon: require('../imgs/voice.png'),
      src: 'Voice'
    },
    {
      title: '非遗库',
      icon: require('../imgs/city.png'),
      src: 'Heritage'
    },
    {
      title: '文驿',
      icon: require('../imgs/signpost.png'),
      src: 'MapView'
    },
    {
      title: '逛逛',
      icon: require('../imgs/message.png'),
      src: 'Community'
    },
    {
      title: '反馈',
      icon: require('../imgs/box.png'),
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
              <Image source={item.icon}></Image>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )
        })
      }
    </View>
  );
};

export default ToolsTab;
