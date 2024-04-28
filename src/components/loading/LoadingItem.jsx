import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View} from "react-native";
import {Loading} from "@fruits-chain/react-native-xiaoshu";

/**
 * Loading组件
 * @param loading
 * @param title
 * @param vertical
 * @param bgWhite
 * @returns {JSX.Element}
 * @constructor
 */
const LoadingItem = ({loading, title = '加载中...', vertical = false, bgWhite = true}) => {
  const navigation = useNavigation();
  return (
    loading && <View className={["w-screen h-screen justify-center items-center absolute top-0 left-0 bottom-0 right-0 z-50", bgWhite? "bg-white": ""].join(" ")}>
      <Loading vertical={vertical}>{title}</Loading>
    </View>
  );
};

export default LoadingItem;
