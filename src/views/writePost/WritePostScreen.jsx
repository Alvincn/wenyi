import React, {useEffect, useMemo, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import BackHeader from "../../components/backHeader/BackHeader";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback, TouchableOpacity
} from 'react-native'
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";
import * as ImagePicker from 'expo-image-picker'
import {Dialog, TextInput, Toast} from "@fruits-chain/react-native-xiaoshu";
import MyRichEditor from "../../components/richEditor/myRichEditor";
import {Ionicons} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const handleH1 = () => <Text style={styles.editorText}>H1</Text>
const handleH2 = () => <Text style={styles.editorText}>H2</Text>
const handleH3 = () => <Text style={styles.editorText}>H3</Text>

const rightButton = () => {
  return (
    <Text className="text-base text-center text-blue-700">
      预览
    </Text>
  )
}
const styles = StyleSheet.create({
  editorText: {
    fontSize: 20,
    color: 'gray',
    fontWeight: 'bold'
  }
})

const WritePostScreen = () => {
  const [contentText, setContentText] = useState('');
  const navigation = useNavigation();
  const richText = React.useRef(null);
  const scrollContent = React.useRef(null);
  const [postTitle, setPostTitle] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  useEffect(() => {
    const getStorageData = async () => {
      const data = await AsyncStorage.getItem('editPost');
      const parseData = JSON.parse(data)
      console.log('data',JSON.parse(data))
      parseData.title? setPostTitle(parseData.title): setPostTitle('')
      parseData.content? setContentText(parseData.content): setContentText('')
    };
    getStorageData()
  }, []);
  /**
   * 获取当前时间
   * @returns {string}
   */
  const getCurrentTime = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()} : ${date.getMinutes()}`
  }
  const preview = () => {
    if(!postTitle.trim()) {
      return Toast({
        type: 'fail',
        message: '请输入标题'
      })
    }
    if(!contentText.trim()) {
      return Toast({
        type: 'fail',
        message: '请输入内容'
      })
    }
    navigation.navigate("Preview")
  }
  /**
   * 选择图片
   */
  const picketImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      quality: 1
    })
    if (result.canceled) {
      return ''
    }
    return result.assets[0]
  }
  /**
   * 点击回退询问是否保存草稿
   */
  const leftHandle = () => {
    if(contentText.trim()){
      Dialog.confirm({
        title: '提示',
        message: '编辑尚未完成，保存草稿吗？',
      }).then(async action => {
        if (action === 'confirm') {
          let editPost = {
            title: postTitle,
            content: contentText
          }
          await AsyncStorage.setItem('editPost', JSON.stringify(editPost))
          navigation.goBack()
        }
      })
    }else {
      navigation.goBack()
    }
  }
  /**
   * 计算输入字数
   */
  const contentLength = useMemo(() => {
    const matchRule = /<[^>]*>([^<]*)<\/[^>]*>/g;
    if(!contentText.trim()) return;
    const contentMatches = contentText.match(matchRule)
    setCurrentTime(getCurrentTime())
    return contentMatches ? contentMatches.map(tag => tag.replace(/<\/?[^>]+>/g, '')).join('') : [];
  }, [contentText])
  return (
    <SafeAreaView className="h-full w-full">
      <BackHeader title="写帖子" rightContent={rightButton} rightHandle={preview} leftHandle={leftHandle}></BackHeader>
      <ScrollView
        ref={scrollContent}
        className='bg-white pb-32 pt-2'>
        <View className="flex-row items-center">
          <Text className="text-lg font-bold pl-2">标题：</Text>
          <TextInput placeholder="输入帖子标题" value={postTitle} onChange={setPostTitle}/>
        </View>
        <View className="px-2 justify-between flex-row">
          <Text className="text-gray-400 items-center justify-center">
            上次修改时间: {getCurrentTime()}
          </Text>
          <Text>字数:{contentLength?.length || 0}</Text>
        </View>
        <RichEditor
          ref={richText}
          placeholder="请输入帖子正文"
          initialContentHTML={contentText}
          style={{
            backgroundColor: 'red'
          }}
          onChange={ descriptionText => {
            setContentText(descriptionText);
          }}
          onPaste={data => {
            console.log(data)
            scrollContent.current.scrollToEnd()
          }}
        />
      </ScrollView>

      <RichToolbar
        className=" w-full bg-white"
        editor={richText}
        onPressAddImage={async () => {
          let result = await picketImage()
          if(result) {
            richText.current.insertImage('data:image/jpeg;base64,'+result.base64)
            richText.current.insertHTML('<br/>')
          }
        }}
        actions={[
          actions.heading1,
          actions.heading2,
          actions.heading3,
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.insertImage,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.checkboxList
        ]}
        iconMap={{
          [actions.heading1]: handleH1,
          [actions.heading2]: handleH2,
          [actions.heading3]: handleH3
        }}

      />
    </SafeAreaView>
  );
};

export default WritePostScreen;
