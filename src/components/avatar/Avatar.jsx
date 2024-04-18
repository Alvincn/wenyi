import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, Image} from "react-native";

const Avatar = ({source}) => {
  const navigation = useNavigation();
  return (
    <Image source={source} style={{width: 40, height: 40, borderRadius: 50}}></Image>
  );
};

export default Avatar;
