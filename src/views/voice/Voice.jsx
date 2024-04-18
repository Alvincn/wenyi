import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text} from "react-native";

const VoiceScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>
        Voice
      </Text>
    </View>
  );
};

export default VoiceScreen;
