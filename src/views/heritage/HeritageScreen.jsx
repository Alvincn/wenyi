import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text} from "react-native";

const HeritageScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>
        Heritage
      </Text>
    </View>
  );
};

export default HeritageScreen;
