import React, {useEffect} from 'react';
import {useNavigation} from "@react-navigation/native";
import {Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const CommunityScreen = () => {
  const navigation = useNavigation();
  return (
      <SafeAreaView>
        <Text>
          社区
        </Text>
      </SafeAreaView>
  );
};

export default CommunityScreen;
