import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text} from "react-native";

const TopicScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>
        TopicScreen
      </Text>
    </View>
  );
};

export default TopicScreen;
