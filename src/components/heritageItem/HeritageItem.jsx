import React, {useEffect, useMemo} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {boxShadow, themeColor} from "../../config/theme";

const HeritageItem = ({item, isCollection = false}) => {
  const navigation = useNavigation();
  // 申报时间
  const time = useMemo(() => {
    return item.rx_time? item.rx_time.split("</br>")[0]: item.rxTime? item.rxTime: ''
    // return ''
  }, [item])
  // 描述
  const description = useMemo(() => {
    if(item.content) {
      return item.content.split('&lt;br /&gt;')[2].trim()
    }else {
      if(item.heritageContent) {
        return item.heritageContent.split('&lt;br /&gt;')[2].trim()
      }
      return item.title
    }
  }, [item])
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('HeritageDetail', {
          heritageInfo: isCollection? JSON.parse(item.totalInfo) : item
        })
      }}
      className={["py-2", "my-0.5", "rounded", isCollection ? 'bg-white px-2 m-1': ''].join(' ')}
      style={isCollection? boxShadow(5).boxShadow: null}
    >
      {/*标题*/}
      <View className="mb-1 flex-row">
        {isCollection && <View className="justify-center items-center bg-red-950 px-2 rounded" style={{backgroundColor: themeColor.primary}}>
          <Text className="text-white font-bold">非遗</Text>
        </View>}
        <Text className="text-lg font-bold">{item.title || item.heritageName}</Text>
      </View>
      <View>
        <Text className="text-base " numberOfLines={2}>
          {description}
        </Text>
      </View>
      <View className="mt-2 flex-row">
        {/*申报时间*/}
        <View className="flex-row mr-3">
          <Ionicons name='time-outline' size={15}/>
          <Text className='pl-0.5'>{time}</Text>
        </View>
        {/*申报单位*/}
        <View className="flex-row">
          <Ionicons name='location-outline' size={15}/>
          <Text className='pl-0.5'>{item.unit || item.heritageLocation}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HeritageItem;
