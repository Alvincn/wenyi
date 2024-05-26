import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity} from "react-native";
import {StatusBar} from "expo-status-bar";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import HeatPosts from "../routers/HeatPosts";
import DatePosts from "../routers/DatePosts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TopicPosts = ({ topicId }) => {
  const Tab = createMaterialTopTabNavigator();

  const MyTabBar = ({ state, descriptors, navigation }) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = async () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              className={["flex-1", "h-9", "items-center"].join(" ")}
            >
              <Text className={["text-center","text-base", 'leading-7', isFocused? "font-bold": ""].join(" ")}>
                {label}
              </Text>
              {isFocused?
                <View className="w-6 h-1 bg-blue-600 rounded-2xl relative -top-1"></View>:
                <></>
              }
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  return (
    <View className="h-4/5 rounded-r-2xl rounded-l-2xl">
      <StatusBar style="dark"></StatusBar>
      <Tab.Navigator
        tabBar={props => <MyTabBar {...props} />}
      >
        <Tab.Screen name="HeatPosts" component={HeatPosts} options={{title:'默认'}}/>
        <Tab.Screen name="DatePosts" component={DatePosts} options={{title:'最新'}}/>
      </Tab.Navigator>
    </View>
  );
};

export default TopicPosts;
