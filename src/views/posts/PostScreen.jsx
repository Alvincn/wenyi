import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text} from "react-native";

const PostScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>
        PostScreen
      </Text>
    </View>
  );
};

export default PostScreen;
