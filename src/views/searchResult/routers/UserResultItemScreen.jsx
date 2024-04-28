import React, {useContext} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text} from "react-native";
import SearchKeywordContext from "../../../context/SearchKeyWordContext";

const UserResultItemScreen = ({ route }) => {
  const {keyword} = useContext(SearchKeywordContext)

  const navigation = useNavigation();
  return (
    <View>
      <Text>
        UserResultItemScreen{keyword}
      </Text>
    </View>
  );
};

export default UserResultItemScreen;
