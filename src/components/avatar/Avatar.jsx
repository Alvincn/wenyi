import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, Image} from "react-native";

const Avatar = ({source, size = 40}) => {
  const navigation = useNavigation();
  return (
    <Image source={source} style={{width: size, height: size, borderRadius: 50}}></Image>
  );
};

export default Avatar;
