import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {Text, TouchableOpacity, View} from "react-native";
import RecordItem from "./RecordItem";
import {Ionicons} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchRecord = () => {
  const navigation = useNavigation();
  const [searchRecords, setSearchRecords] = useState([])
  const getStorage = async () => {
    let result = await AsyncStorage.getItem("searchWords")
    if(result) {
      setSearchRecords(JSON.parse(result))
    }else {
      setSearchRecords([])
    }
  }
  useEffect(() => {
    navigation.addListener("focus", () => {
      getStorage()
    })
  }, []);
  return (
    <View className="py-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-base">历史记录</Text>
        <TouchableOpacity
          className="flex-row items-center"
          onPress={async () => {
            await AsyncStorage.removeItem("searchWords")
            await getStorage()
          }}
        >
          <Ionicons name="trash" size={17} color="grey"/>
          <Text className="text-base text-gray-500 leading-4">清空</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row w-full flex-wrap">
        {
          searchRecords.length !== 0? searchRecords.map((item, index) => {
            return <RecordItem text={item} key={index}></RecordItem>
          }):<Text className="pt-3">还没有搜索记录呢🫡 </Text>
        }
      </View>

    </View>
  );
};

export default SearchRecord;
