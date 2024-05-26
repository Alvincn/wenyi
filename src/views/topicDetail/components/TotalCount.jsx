import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity} from "react-native";

const TotalCount = ({ detail }) => {
  const navigation = useNavigation();
  return (
    <View>
      <View className="flex-row my-2 justify-between">
        <View className="flex-row">
          <Text className="px-2 py-1 bg-blue-100 mr-2 rounded">
            🧐观看量：{detail.watchNum}
          </Text>
          <Text className="px-2 py-1 bg-blue-100 rounded">
            🤗参与量：{detail.joinCount}
          </Text>
        </View>
        <TouchableOpacity className="bg-blue-500 px-3 py-1 rounded">
          <Text className="text-white">
            参与话题
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default TotalCount;
