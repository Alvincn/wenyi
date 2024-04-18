import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CommunityScreen from "../../views/community/CommunityScreen";
import HomeScreen from "../../views/home/HomeScreent";
import {Ionicons} from "@expo/vector-icons";
import {themeColor} from "../../config/theme";
import MapScreen from "../../views/map/MapScreen";
const FooterTab = () => {
  const navigation = useNavigation();

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'HomeScreen') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Community') {
            iconName = focused ? 'telescope' : 'telescope-outline';
          } else if (route.name === 'MapView') {
            iconName = focused ? 'map' : 'map-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: themeColor.primary,
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false, tabBarShowLabel: false}}></Tab.Screen>
      <Tab.Screen name="MapView" component={MapScreen} options={{headerShown: false, tabBarShowLabel: false}}></Tab.Screen>
      <Tab.Screen name="Community" component={CommunityScreen} options={{headerShown: false, tabBarShowLabel: false}}></Tab.Screen>
    </Tab.Navigator>

  );
};

export default FooterTab;
