import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, Platform, TouchableOpacity} from "react-native";
import {WebView} from "react-native-webview";
import {StatusBar} from "expo-status-bar";
import {getHeritageByKeyWord, getHeritagesData} from "../../api/heritage";
import {TextInput, Toast} from "@fruits-chain/react-native-xiaoshu";
import {Ionicons} from "@expo/vector-icons";
import LoadingItem from "../../components/loading/LoadingItem";

const MapScreen = () => {
  const navigation = useNavigation();
  const [weather, setWeather] = useState({})
  const [location, setLocation] = useState({})
  const [loading, setLoading] = useState(true)
  const goHeritage = (obj) => {
    getHeritageByKeyWord(obj.Name_CN).then(res => {
      if (!res) return Toast("Sorry~暂未找到该非遗信息")
      if (res.length === 0) return Toast("Sorry~暂未找到该非遗信息");
      if (res.length === 1) {
        return navigation.navigate('HeritageDetail', {
          heritageInfo: res[0]
        })
      };
      let filterMap = res.filter(item => {
        return item.title === obj.Name_CN
          && Number(item.rx_time?.split("</br>")[0]) === obj.Time
          && item.unit === obj.Place_CN
          && item.num === obj.Proj_num
      })
      if (filterMap && filterMap.length > 0) {
        navigation.navigate('HeritageDetail', {
          heritageInfo: filterMap[0]
        })
      } else {
        return Toast("Sorry~暂未找到该非遗信息")
      }
    })
  }

  // 接受webview发来的消息
  const reviceData = data => {
    setLoading(false)
    let obj = JSON.parse(data)
    switch (obj.action) {
      case 'weather':
        setWeather(JSON.parse(obj.message) || {})
        break;
      case 'location':
        setLocation(JSON.parse(obj.message) || {})
        break
      case 'clickHeritage':
        console.log(JSON.parse(obj.message))
        goHeritage(JSON.parse(obj.message).heritage)
        break
    }
  }
  // 根据天气切换图标
  const weatherIcon = useMemo(() => {
    let weatherIcon = '';
    if(weather.weather === undefined){
      return <></>
    }else if(weather.weather.indexOf("晴") !== -1) {
      weatherIcon = '☀'
    }else if(weather.weather.indexOf("雷") !== -1) {
      weatherIcon = '🌩️'
    }else if(weather.weather.indexOf("雪") !== -1) {
      weatherIcon = '🌨️'
    }else if(weather.weather.indexOf("雨") !== -1) {
      weatherIcon = '🌧️'
    }else if(weather.weather.indexOf("云") !== -1) {
      weatherIcon = '⛅'
    }else if(weather.weather.indexOf("阴") !== -1) {
      weatherIcon = '☁️'
    }else if(weather.weather.indexOf("风") !== -1) {
      weatherIcon = '🌪️'
    }
    return weatherIcon? <Text className="font-bold">{weatherIcon}{weather.weather}</Text>: <></>;
  }, [weather])
  return (
    <View className="w-full">
      <LoadingItem loading={loading} title="数据量较大，努力加载中🫡" vertical={true}></LoadingItem>
      <View>
        <View className="w-full h-full">
          <StatusBar style={"light"}></StatusBar>
          <WebView
            source={{uri: 'https://ivikey.top/'}}
            onMessage={event => {
              const {data} = event.nativeEvent;
              reviceData(data);
            }}
            originWhitelist={['*']}
            // incognito={true} // 是否禁用缓存
          >
          </WebView>
        </View>
        <View className="absolute top-10 left-2 h-8 w-72 rounded flex-row">
          <View className="flex-row bg-white mr-2 justify-around items-center w-32 rounded">
            <View className="flex-row">
              {weatherIcon}
            </View>
            <View className="flex-row">
              <Text className="font-bold">📍{location.city || "北京"}</Text>
            </View>
          </View>
          <TouchableOpacity
            className="flex-row items-center justify-center px-2 flex-1 bg-white rounded-2xl"
            onPress={() => {navigation.navigate("Search")}}
          >
            <Ionicons name="search" size={20}/>
            <Text className="flex-1 pl-1">搜索...</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MapScreen;
