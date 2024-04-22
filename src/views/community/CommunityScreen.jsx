import React, {useEffect} from 'react';
import {useNavigation} from "@react-navigation/native";
import {ImageBackground, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "./components/Header";
import HotScreen from "../hot/HotScreen";
import HeritageScreen from "../heritage/HeritageScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import PostScreen from "../posts/PostScreen";
import TopicScreen from "../topic/TopicScreen";

const CommunityScreen = () => {
  const navigation = useNavigation();
  const Stack = createNativeStackNavigator();
  return (
    <ImageBackground
      source={require('./img/communityBack.png')}
      className="w-full h-full"
    >
      <SafeAreaView className="w-full h-full p-4">
        <Header></Header>
        {/*展示导航的地方*/}
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: 'rgba(0, 0, 0, 0)'
            }
          }}
        >
          <Stack.Screen name="Post" component={PostScreen}/>{/**/}
          <Stack.Screen name="Topic" component={TopicScreen}/>{/**/}
        </Stack.Navigator>
      </SafeAreaView>
    </ImageBackground>

  );
};

export default CommunityScreen;
