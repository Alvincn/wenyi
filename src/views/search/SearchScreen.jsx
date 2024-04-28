import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import SearchRecord from "./components/SearchRecord";
import WantSearch from "./components/WantSearch";
import HotPosts from "./components/HotPosts";
import HeaderSearch from "../../components/headerSearch/HeaderSearch";

const SearchScreen = () => {
  const navigation = useNavigation();
  return (
    <View className="p-2">
      <SafeAreaView>
        {/*顶部搜索*/}
        <HeaderSearch></HeaderSearch>
        <SearchRecord></SearchRecord>
        {/*分割线*/}
        <View className="w-full h-0.5 bg-gray-200"></View>
        <WantSearch></WantSearch>
        <View className="w-full h-0.5 bg-gray-200"></View>
      </SafeAreaView>
    </View>
  );
};

export default SearchScreen;
