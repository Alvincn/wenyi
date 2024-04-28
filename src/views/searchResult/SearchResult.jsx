import React, {createContext, useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import HeaderSearch from "../../components/headerSearch/HeaderSearch";
import ResultType from "./components/ResultType";
import {SearchKeywordProvider} from "../../context/SearchKeyWordContext";

const SearchResult = ({route}) => {
  const keyWord = route.params.keyWord
  const navigation = useNavigation();

  return (
    <SearchKeywordProvider>
      <SafeAreaView className="p-2">
        <HeaderSearch defaultValue={keyWord}></HeaderSearch>
        <View className="pt-2">
          <ResultType keyWord={keyWord}></ResultType>
        </View>
      </SafeAreaView>
    </SearchKeywordProvider>
  );
};

export default SearchResult;
