import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, Dimensions, TouchableOpacity, Animated} from "react-native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import MinePosts from "../../minePosts/MinePosts";

const userPost = () => {
  const Tab = createMaterialTopTabNavigator();
  const MyTabBar = ({ state, descriptors, navigation, position }) => {
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

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
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
                <View className="w-5 h-1 bg-blue-600 rounded-2xl relative -top-1"></View>:
                <></>
              }
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  return (
    <View className="bg-white p-2 h-full relative -top-5 rounded-r-2xl rounded-l-2xl">
      <Tab.Navigator
        tabBar={props => <MyTabBar {...props} />}
      >
        <Tab.Screen name="MinePosts" component={MinePosts} options={{title: '帖子'}}/>
        <Tab.Screen name="MineLike" component={MinePosts} options={{title:'喜欢'}}/>
        <Tab.Screen name="MineCollection" component={MinePosts} options={{title:'收藏'}}/>
      </Tab.Navigator>
    </View>
  );
};

export default userPost;
