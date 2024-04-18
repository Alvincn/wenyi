import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const MapScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <SafeAreaView>
        <Text>
          MapScreen
        </Text>
      </SafeAreaView>

    </View>
  );
};

export default MapScreen;
