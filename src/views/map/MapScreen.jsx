import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, Platform} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {WebView} from "react-native-webview";

const MapScreen = () => {
  const navigation = useNavigation();
  return (
    <View className="w-full">
        <View
          className="w-full h-full"
        >
          <WebView
            source={{uri: 'https://ivikey.top/map'}}
          >
          </WebView>
        </View>
    </View>
  );
};

export default MapScreen;
