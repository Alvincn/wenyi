import React, {useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import RecordItem from "./RecordItem";

const WantSearch = () => {
  const navigation = useNavigation();
  const [wantList, setWantList] = useState(['京剧', '二人转', '北京', '云南扎染'])
  return (
    <View className="py-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-base">猜你想搜</Text>
        <TouchableOpacity className="flex-row items-center">
          <Ionicons name="refresh" size={17} color="grey"/>
          <Text className="text-base text-gray-500 leading-4">换一换</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row w-full flex-wrap">
        {
          wantList.length !== 0? wantList.map((item, index) => {
            return <RecordItem fire={index < 2} text={item} key={index}></RecordItem>
          }):<></>
        }

      </View>

    </View>
  );
};

export default WantSearch;
