import React, {useEffect, useMemo, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import BackHeader from "../../components/backHeader/BackHeader";
import {Dimensions, PixelRatio, ScrollView, StyleSheet, Text, View} from 'react-native'
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";
import {Dialog, TextInput, Toast} from "@fruits-chain/react-native-xiaoshu";
import {deletePostDraft, getPostDraft, postSavePostsDraft} from "../../api/post";
import {fileUpload, picketImage} from "../../utils/utils";

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
  const [postTitle, setPostTitle] = useState(null)
  const [currentTime, setCurrentTime] = useState('')
  const [getDataFromWeb, setGetDataFromWeb] = useState(false)
  /**
   * 获取草稿信息
   * @returns {Promise<void>}
   */
  const getStorageData = async () => {
    const data = await getPostDraft();
    if(data.data !== null) {
      setPostTitle(data.data.title)
      setContentText(data.data.content)
      setGetDataFromWeb(true)
    }else {
      setPostTitle('')
      setContentText('')
      setGetDataFromWeb(false)
    }

  };
  useEffect(() => {
    getStorageData()
  }, []);
  const windowWidth = Dimensions.get('window');
  // 像素密度
  const pixelDensity = PixelRatio.get();
  /**
   * 获取当前时间
   * @returns {string}
   */
  const getCurrentTime = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()} : ${date.getMinutes()}`
  }
  const preview = async () => {
    if (!postTitle?.trim()) {
      return Toast({
        type: 'fail',
        message: '请输入标题'
      })
    }
    if (!contentText?.trim()) {
      return Toast({
        type: 'fail',
        message: '请输入内容'
      })
    }
    if(contentLength < 20){
      return Toast('请至少输入20个文字')
    }
    let editPost = {
      title: postTitle,
      content: contentText
    }
    postSavePostsDraft(editPost).then(res => {
      navigation.navigate("Preview")
    })
  }
  /**
   * 选择图片
   */
  const pressPicketImage = async () => {
    richText.current.insertHTML('<br/>')
    let result = await picketImage()
    if(!result) return ''
    let filePath = await fileUpload(result.assets[0])
    return {
      width: result.assets[0].width,
      height: result.assets[0].height,
      filePath: filePath
    }
  }
  /**
   * 点击回退询问是否保存草稿
   */
  const leftHandle = () => {
    if(contentText?.trim()){
      Dialog.confirm({
        title: '提示',
        message: '编辑尚未完成，保存草稿吗？',
      }).then(async action => {
        if (action === 'confirm') {
          let editPost = {
            title: postTitle,
            content: contentText
          }
          postSavePostsDraft(editPost).then(res => {
            navigation.goBack()
          })
        }
        if(action === 'cancel') {
          /**
           * 用户选择不保存草稿，则不删除草稿
           */
          if(getDataFromWeb) {
            await deletePostDraft()
            navigation.goBack()
          }else {
            navigation.goBack()
          }
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
    setCurrentTime(getCurrentTime())
    return contentText?.replace( /<[^>]*>/g, '').trim().length
  }, [contentText])
  return (
    <SafeAreaView className="h-full w-full">
      <BackHeader title="写帖子" rightContent={rightButton} rightHandle={preview} leftHandle={leftHandle}></BackHeader>
      <ScrollView
        ref={scrollContent}
        className='bg-white pb-32 pt-2'>
        <View className="flex-row items-center p-2">
          <TextInput
            style={{fontSize: 28, fontWeight: 'bold'}}
            placeholder="帖子标题"
            value={postTitle}
            onChange={setPostTitle}/>
        </View>
        <View className="px-2 justify-between flex-row">
          <Text className="text-gray-400 items-center justify-center">
            上次修改时间: {getCurrentTime()}
          </Text>
          <Text>字数:{contentLength || 0}</Text>
        </View>
        {contentText !== null &&<RichEditor
          ref={richText}
          editorStyle={{
            contentCSSText: 'font-size: 18px; line-height: 30px; '
          }}
          initialHeight={windowWidth.height}
          placeholder="请输入帖子正文"
          initialContentHTML={contentText}
          onChange={descriptionText => {
            setContentText(descriptionText);
          }}
          onKeyDown={({key, keyCode}) => {
            if(key === 'Enter' && keyCode === 13 ){
              scrollContent.current.scrollToEnd()
            }
          }}
          onPaste={data => {
            scrollContent.current.scrollToEnd()
          }}
        />}
      </ScrollView>

      {contentText !== null && <RichToolbar
        className=" w-full bg-white"
        editor={richText}
        onPressAddImage={async () => {
          let result = await pressPicketImage()
          if (result) {
            const pixel = result.width / result.height;
            richText.current.insertImage(result.filePath, `width: ${Dimensions.get('window').width}px; height: ${Dimensions.get('window').width / pixel}px; margin: 0 auto;`,)
            setTimeout(() => {
              richText.current.insertHTML('<br/>')
            }, 200)
            setTimeout(() => {
              scrollContent.current.scrollToEnd()
            }, 500)
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
      />}
    </SafeAreaView>
  );
};

export default WritePostScreen;
