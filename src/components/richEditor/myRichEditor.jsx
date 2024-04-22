import React, {useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, StyleSheet} from "react-native";
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";
import * as ImagePicker from "expo-image-picker";
const handleH1 = () => <Text style={styles.editorText}>H1</Text>
const handleH2 = () => <Text style={styles.editorText}>H2</Text>
const handleH3 = () => <Text style={styles.editorText}>H3</Text>
const styles = StyleSheet.create({
  editorText: {
    fontSize: 20,
    color: 'gray',
    fontWeight: 'bold'
  }
})
const myRichEditor = () => {
  const navigation = useNavigation();

  /**
   * 富文本Ref
   * @type {React.RefObject<unknown>}
   */
  const richText = React.createRef();
  /**
   * 选取图片
   */
  const picketImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      quality: 1
    })
    if (result.canceled) {
      return
    }
    return result.assets[0]
  }
  return (
    <View className="h-full relative">



    </View>
  );
};

export default myRichEditor;
