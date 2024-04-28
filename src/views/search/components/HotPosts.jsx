import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text} from "react-native";

const HotPosts = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>
        HotPosts
      </Text>
    </View>
  );
};

export default HotPosts;
