import React, {useEffect} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import BackHeader from "../../components/backHeader/BackHeader";
import MinePosts from "../mine/routers/minePosts/MinePosts";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import AllFeedback from "./routers/AllFeedback";
import MyFeedback from "./routers/MyFeedback";

const FeedBackListScreen = () => {
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();
  return (
    <SafeAreaView>
      <BackHeader
        title="反馈列表"
        rightHandle={() => {
          navigation.navigate("Feedback")
        }}
        rightContent={() => <Text className="w-14 text-blue-700 text-right">写反馈</Text> }
      ></BackHeader>
      <View className="w-full h-full">
        <Tab.Navigator>
          <Tab.Screen name="AllFeedback" component={AllFeedback} options={{title: '全部反馈'}}/>
          <Tab.Screen name="MyFeedback" component={MyFeedback} options={{title:'我的反馈'}}/>
        </Tab.Navigator>
      </View>

    </SafeAreaView>
  );
};

export default FeedBackListScreen;
