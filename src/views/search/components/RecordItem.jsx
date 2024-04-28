import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RecordItem = ({text, fire = false}) => {
  const navigation = useNavigation();
  const setStorage = async () => {
    let result = await AsyncStorage.getItem("searchWords");
    if(result) {
      let parseJson = JSON.parse(result);
      if(parseJson.length >= 6){
        parseJson.pop()
      }
      parseJson.unshift(text)
      await AsyncStorage.removeItem("searchWords")
      await AsyncStorage.setItem("searchWords", JSON.stringify(parseJson))
    }else {
      let parseJson = [text]
      await AsyncStorage.removeItem("searchWords")
      await AsyncStorage.setItem("searchWords", JSON.stringify(parseJson))
    }
  }
  return (
    <TouchableOpacity
      className="w-1/2 py-2"
      onPress={(item) => {
        setStorage().then(res => {
          navigation.navigate("SearchResult", {
            keyWord: text
          })
        })
      }}
    >
      <Text className={["text-base", "font-bold", fire? "text-red-500": ''].join(' ')}>{ text } {fire? '🔥': ''}</Text>
    </TouchableOpacity>
  );
};

export default RecordItem;
