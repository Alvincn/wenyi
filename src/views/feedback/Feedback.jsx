import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text} from "react-native";

const FeedbackScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>
        Feedback
      </Text>
    </View>
  );
};

export default FeedbackScreen;
