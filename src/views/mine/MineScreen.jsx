import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";


const MineScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Text>
        MineScreen
      </Text>
    </SafeAreaView>
  );
};

export default MineScreen;
