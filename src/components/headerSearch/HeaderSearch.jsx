import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity, Keyboard} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {TextInput, Toast} from "@fruits-chain/react-native-xiaoshu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {themeColor} from "../../config/theme";

const header = ({defaultValue = ''}) => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState(defaultValue)
  useEffect(() => {
  }, []);
  // 存入本地存储
  const setStorage = async () => {
    let result = await AsyncStorage.getItem("searchWords");
    if(result) {
      let parseJson = JSON.parse(result);
      if(parseJson.length >= 6){
        parseJson.pop()
      }
      parseJson.unshift(searchText)
      await AsyncStorage.removeItem("searchWords")
      await AsyncStorage.setItem("searchWords", JSON.stringify(parseJson))
    }else {
      let parseJson = [searchText]
      await AsyncStorage.removeItem("searchWords")
      await AsyncStorage.setItem("searchWords", JSON.stringify(parseJson))
    }
  }
  const search = async () => {
    if (searchText.trim() === '') {
      return Toast("请输入关键词哦~")
    }
    await setStorage()
    navigation.navigate("SearchResult", {
      keyWord: searchText
    })
  }
  return (
    <View>
      <View className="flex-row h-10 items-center">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-outline" size={25}/>
        </TouchableOpacity>
        <View className="bg-gray-200 flex-row flex-1 h-full mx-2 rounded items-center px-2">
          <Ionicons name="search" size={20}/>
          <Text className="text-gray-400"> | </Text>
          <View className="flex-1">
            <TextInput
              placeholder="输入搜索内容"
              value={searchText}
              onChange={setSearchText}
              onSubmitEditing={search}
            ></TextInput>
          </View>
        </View>
        <View className="h-full rounded" style={{backgroundColor: themeColor.primary}}>
          <TouchableOpacity
            className="h-full flex-row justify-center items-center px-4 py-1 rounded"
            onPress={() => search()}
          >
            <Text className="font-bold text-white text-base">搜索</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

export default header;
