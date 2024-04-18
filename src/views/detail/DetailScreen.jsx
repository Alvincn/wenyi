import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity} from "react-native";
// import Icons from '@expo/vector-icons'

const DetailScreen = () => {
  const navigation = useNavigation();
  return (
      <View>
        <Text>
          DetailScreen
            <Text style={{  fontSize: 15 }}>
              Log in with Facebook
            </Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          className="w-full bg-blue-500  h-20 justify-center items-center"

        >
          <Text className="text-blue-50">
            回去
          </Text>
        </TouchableOpacity>
      </View>
  );
};

export default DetailScreen;
