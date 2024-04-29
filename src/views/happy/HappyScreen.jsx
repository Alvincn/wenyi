import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {WebView} from "react-native-webview";
import {Ionicons} from "@expo/vector-icons";

const HappyScreen = () => {
  const navigation = useNavigation();
  const happyList = [
    'https://bubblespop.netlify.app/',
    'https://goldfishies.com/',
    'http://www.staggeringbeauty.com/',
    'https://lines.frvr.com/',
    'http://emojisandearthporn.com/',
    'https://www.adultswim.com/etcetera/elastic-man/'
  ]
  const [random, setRandom] = useState(0)
  useEffect(() => {
    setRandom(Math.floor(Math.random() * happyList.length))
  }, [])
  return (
    <SafeAreaView>
      <View className="w-full h-full relative">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
          className="absolute top-3 left-3 z-20 bg-gray-300 rounded-full items-center justify-center w-10 h-10"
        >
          <Ionicons name="caret-back" size={30}/>
        </TouchableOpacity>
        <WebView
          source={{uri: happyList[random]}}
          originWhitelist={['*']}
        >
        </WebView>
      </View>
    </SafeAreaView>
  );
};

export default HappyScreen;
