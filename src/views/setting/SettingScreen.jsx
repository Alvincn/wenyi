import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text} from "react-native";

const SettingScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>
        SettingScreen
      </Text>
    </View>
  );
};

export default SettingScreen;
