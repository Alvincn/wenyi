import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

/**
 *
 * @param title 中间内容
 * @param rightContent 右边的内容
 * @param rightHandle 右边点击触发函数
 * @returns {JSX.Element}
 * @constructor
 */
const BackHeader = ({title, rightContent, rightHandle, leftHandle}) => {
  const navigation = useNavigation();
  return (
    <View className="flex-row justify-between p-3 border-b-2 border-gray-300 items-center">
      <TouchableOpacity
        className='h-full w-8'
        onPress={() => {
          if(leftHandle) {
            leftHandle()
          }else {
            navigation.goBack();
          }
        }}
      >
        <Ionicons name="arrow-back" size={25}/>
      </TouchableOpacity>
      <Text className="text-xl flex-1 text-center">
        {title}
      </Text>
      <TouchableOpacity
        onPress={() => rightHandle()}
        className="w-8">
        {rightContent()}
      </TouchableOpacity>
    </View>
  );
};

export default BackHeader;
