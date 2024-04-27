import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text} from "react-native";
import {Loading} from "@fruits-chain/react-native-xiaoshu";

/**
 * Loading组件
 * @param loading
 * @returns {JSX.Element}
 * @constructor
 */
const LoadingItem = ({loading}) => {
  const navigation = useNavigation();
  return (
    loading && <View className="w-full h-full justify-center items-center">
      <Loading>加载中...</Loading>
    </View>
  );
};

export default LoadingItem;
