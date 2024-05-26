import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text} from "react-native";

const JoinTopicButton = () => {
  const navigation = useNavigation();
  return (
    <View className="absolute -top-20 bg-red-950">
      <Text>
        JoinTopic
      </Text>
    </View>
  );
};

export default JoinTopicButton;
