import React, {createContext, useContext, useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity} from "react-native";
import MinePosts from "../../mine/routers/minePosts/MinePosts";
import HeritageResultItemScreen from "../routers/HeritageResultItemScreen";
import PostResultItemScreen from "../routers/PostResultItemScreen";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import UserResultItemScreen from "../routers/UserResultItemScreen";
import SearchKeywordContext from "../../../context/SearchKeyWordContext";

const ResultType = (props) => {
  const navigation = useNavigation();
  const {keyWord, setKeyword} = useContext(SearchKeywordContext)
  useEffect(() => {
    console.log(props.keyWord)
    setKeyword(props.keyWord)
  }, [props.keyWord])
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
              navigation.navigate(route.name, { keyWord });
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
    <View className="h-full rounded-r-2xl rounded-l-2xl">
      <Tab.Navigator
        tabBar={props => <MyTabBar {...props} />}
      >
        <Tab.Screen initialParams={{keyWord: keyWord}} name="HeritageResult" component={HeritageResultItemScreen} options={{title: '非遗'}} />
        <Tab.Screen initialParams={{keyWord: keyWord}} name="PostResult" component={PostResultItemScreen} options={{title:'帖子'}}/>
        <Tab.Screen initialParams={{keyWord: keyWord}} name="UserResult" component={UserResultItemScreen} options={{title:'用户'}}/>
      </Tab.Navigator>
    </View>
  );
};

export default ResultType;
