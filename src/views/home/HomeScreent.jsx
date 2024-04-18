import React, {useEffect} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, ImageBackground, Image, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "./components/Header";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HotScreen from "../hot/HotScreen";
import HeritageScreen from "../heritage/HeritageScreen";
import {themeColor} from "../../config/theme";

const HomeScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    <ImageBackground source={themeColor.primaryBgImg} className="w-full h-full" resizeMode="cover">
      <SafeAreaView className="w-full h-full p-3 ">
        {/*顶部Tab*/}
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
          <Stack.Screen name="Hot" component={HotScreen}/>{/**/}
          <Stack.Screen name="Heritage" component={HeritageScreen}/>{/**/}
        </Stack.Navigator>
      </SafeAreaView>
    </ImageBackground>

  );
};

export default HomeScreen;
