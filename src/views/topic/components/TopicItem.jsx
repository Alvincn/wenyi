import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, Image, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TopicItem = ({ item, index }) => {
  const navigation = useNavigation();
  const RenderIndex = () => {
    let renderIndex = <></>
    if(index === 0) {
      renderIndex = <View className="bg-red-500 max-h-7 px-1 py-1 rounded">
        <Text className="text-white text-center">{index + 1}</Text>
      </View>
    }else if(index === 1){
      renderIndex = <View className="bg-orange-500 max-h-7 px-1 py-1 rounded">
        <Text className="text-white text-center">{index + 1}</Text>
      </View>
    }else if(index === 2){
      renderIndex = <View className="bg-yellow-500 max-h-7 px-1 py-1 rounded">
        <Text className="text-white">{index + 1}</Text>
      </View>
    }else {
      renderIndex = <Text className="text-yellow-200 text-center">{index + 1}</Text>
    }
    return renderIndex
  }
  return (
    <TouchableOpacity
      onPress={async () => {
        await AsyncStorage.setItem("clickTopicId", String(item.topicId))
        navigation.navigate("TopicDetail", {
          topicId: item.topicId
        })
      }}
      className="
      w-full px-2 py-2 rounded mb-1 border-b border-b-gray-300
      flex flex-row justify-between
      "
    >
      <View className="">
        <RenderIndex></RenderIndex>
      </View>
      <View className="flex-1 pl-1 flex-col">
        <Text className={["font-bold", "text-base", index === 0? "text-red-500": "text-black"].join(' ')}>
          {item.title} {index === 0 && '🔥'}
        </Text>
        <Text className="mb-0.5" numberOfLines={1}>
          {item.description || ''}
        </Text>
        <Text className="text-gray-400 text-sm">
          {item.heat}万热度
        </Text>
      </View>
      <View>
        <Image className="rounded" source={{uri: item.coverImg}} style={{width: 100, aspectRatio: 16 / 9}}></Image>
      </View>
    </TouchableOpacity>
  );
};

export default TopicItem;
