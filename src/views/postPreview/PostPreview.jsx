import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import BackHeader from "../../components/backHeader/BackHeader";
import {Dialog, Picker, StepSelector, TextInput, Toast} from "@fruits-chain/react-native-xiaoshu";
import {Ionicons} from "@expo/vector-icons";
import {getAllOpenTopics} from "../../api/topic";
import {RichEditor} from "react-native-pell-rich-editor";
import {fileUpload, getCurrentTime, picketImage, requestProvince} from "../../utils/utils";
import {getPostDraft, postSendPosts} from "../../api/post";
import * as ImagePicker from "expo-image-picker";
const rightContent = () => {
  return (
    <Text className="text-base text-center text-blue-700">
      发布
    </Text>
  )
}
const styles = StyleSheet.create({
  boxShadow: {}
})
if(Platform.OS === 'ios'){
  styles.boxShadow = {
    shadowColor: '#52006A',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  }
} else if(Platform.OS === 'android'){
  styles.boxShadow = {
    shadowColor: 'gray',
    elevation: 10
  }
}
const PostPreview = () => {
  const navigation = useNavigation();
  const [selectProvinceData, setSelectProvinceData] = useState([])
  const [currentTime, setCurrentTime] = useState('')
  const defaultAreaData = useRef([])
  const richText = useRef(null)
  /**
   * 获取存储中的文本数据
   */
  const [contentText, setContentText] = useState('')
  const [contentTitle, setContentTitle] = useState('')
  const [contentInfo, setContentInfo] = useState({})
  const getStorageData = async () => {
    const data = await getPostDraft();
    if(data.data !== null) {
      setContentTitle(data.data.title)
      setContentText(data.data.content)
      setContentInfo(data.data)
      richText.current.insertHTML('<br/>')
    }
  };
  useEffect(() => {
    getStorageData().then(res => {
      setCurrentTime(getCurrentTime())
    })
    setTimeout(() => {
      richText.current.insertHTML('<br/>')
    }, 300)
  }, [contentText]);
  const LoadingReturnRef = useRef(null);
  /**
   * 筛选出文字
   */
  const contentWords = () => {
    const matchRule = /(?<=>)([^<>]+)(?=<\/[^<>]+>)/g;
    if(!contentText.trim()) return;
    const contentMatches = contentText.match(matchRule)
    return contentMatches ? contentMatches.map(tag => tag.replace(/<\/?[^>]+>/g, '')).join('') : "";
  }
  /**
   * 发布
   */
  const handleSend = () => {
    if(contentTitle.trim() === '') {
      return Toast.fail("标题不能为空~")
    }
    if(contentText.trim() === '') {
      return Toast.fail("内容不能为空哦~")
    }
    let data = {
      title: contentTitle,
      content: contentText,
      description: contentWords().substring(0,30),
      location: selectProvinceData.map(item => item.label).join('·'),
      topic: JSON.stringify(chooseTopic.map(item => item.topicId)),
      privateStatus: isPrivate,
      coverImg: coverImg,
      locationArr: JSON.stringify(defaultAreaData.current)
    }
    Dialog.confirm({
      title: '发布提示🧐',
      message:
        '发布将会进入审核阶段，确认发布吗？',
      confirmButtonText: '发布',
    }).then(action => {
      if(action === 'confirm'){
        LoadingReturnRef.current = Toast.loading({
          message: '发布中...',
          duration: 0,
          forbidPress: true
        })
        postSendPosts(data).then(async res => {
          if (res.code === 403) {
            Toast.fail('登录已过期，即将跳转到登录页面~')
            LoadingReturnRef.current.close()
            setTimeout(() => {
              navigation.navigate('Login')
            }, 1000)
          }
          // 发布成功
          if (res.code === 200) {
            Toast.success('发布成功，内容审核中~')
            LoadingReturnRef.current.close()
            setTimeout(() => {
              navigation.navigate('Home', {
                screen: 'Community'
              })
            }, 1000)
          }
        })
      }
    })

  }
  /**
   * 选择省市
   */
  const selectProvince = () => {
    StepSelector({
      request: requestProvince,
      onConfirm: (v, o, isEnd) => {
        defaultAreaData.current = v;
        setSelectProvinceData(o)
      },
    }).catch((err) => {})
  }
  /**
   * 是否显示话题列表
   */
  const [showTopicList, setShowTopicList] = useState(false)
  /**
   * 全部话题列表
   */
  const [topicList, setTopicList] = useState([])
  /**
   * 选择封面
   */
  const [coverImg, setCoverImg] = useState('')
  const getAllTopicList = () => {
    getAllOpenTopics().then(res => {
      setTopicList(res.data)
    })
  }
  /**
   * 已选话题
   */
  const [chooseTopic, setChooseTopic] = useState([])
  /**
   * chooseTopic去重
   */
  /**
   * 内容公开度
   */
  const isPrivateList = [
    {
      label: '公开',
      value: '1'
    },
    {
      label: '私密',
      value: '0'
    }
  ]
  const [isPrivate, setIsPrivate] = useState("1")
  return (
    <SafeAreaView>
      <BackHeader title="发布预览" rightContent={rightContent} rightHandle={handleSend}></BackHeader>
      <ScrollView>
        <View
          className="p-2 mb-20"
        >
          {/*选择封面*/}
          <View style={styles.boxShadow} className="bg-white h-12 px-2 py-1 rounded flex-row items-center">
            <TouchableOpacity
              className="flex-row items-center justify-between w-full"
              onPress={async () => {
                picketImage({aspect: [4, 3], base64: true, quality: 0.5}).then(res => {
                  if(!res) return
                  fileUpload(res.assets[0]).then(res => {
                    setCoverImg(res)
                  })
                })
              }}
            >
              <View>
                <Text className="text-base font-bold text-gray-400">封面：</Text>
              </View>
              {coverImg?
                <View className="w-30 flex-row items-center">
                  <Image source={{uri: coverImg}} width={60} height={40}/>
                  <Text className="pl-1"> ></Text>
                </View>
                :<View>
                  <Text className="text-gray-600">选择封面 > </Text>
                </View>
              }
            </TouchableOpacity>
          </View>
          {/*标题*/}
          <View style={styles.boxShadow} className="bg-white px-2 mt-3 py-1 rounded flex-row items-center">
            <Text className="text-base font-bold text-gray-400">标题：</Text>
            <TextInput
              placeholder="输入帖子标题"
              value={contentTitle}
              onChange={setContentTitle}
              style={{fontSize: 16, fontWeight: 'bold'}}
            />
          </View>

          {/* 选择发布地点 */}
          <View style={styles.boxShadow} className="mt-3 bg-white p-2 rounded">
            <TouchableOpacity
              className="flex-row items-center justify-between"
              onPress={selectProvince}
            >
              <View className="flex-row items-center">
                <Text className="text-base font-bold text-gray-400">
                  地点：
                </Text>
                <View>
                  <Text style={{fontSize: 15, width: 250, lineHeight: 20}} numberOfLines={1}>
                    {selectProvinceData.length === 0? contentInfo.location: selectProvinceData.map(item => item.label).join('·')}
                  </Text>
                </View>
              </View>
              <Text className="text-gray-600">
                选择地点 >
              </Text>
            </TouchableOpacity>

          </View>
          {/*选择的话题*/}
          {
            chooseTopic.length > 0? (
              <View className="flex-row p-2 bg-white mt-3 flex-wrap">
                <Text className="text-base font-bold">话题：</Text>
                {chooseTopic.map((topic, index) => {
                  return (
                    <View
                      key={index}
                      className="mr-2 flex-row items-center bg-blue-100 rounded px-1 mb-1"
                    >
                      <Text className="text-blue-500 text-base">#&nbsp;{topic.title}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          let arr = JSON.parse(JSON.stringify(chooseTopic))
                          arr.splice(index, 1)
                          setChooseTopic(arr)
                        }}
                      >
                        <Ionicons name="close" size={15}/>
                      </TouchableOpacity>
                    </View>
                  )
                })}
              </View>
            ): <></>
          }
          {/* 选择话题 */}
          <View className="flex-row my-3 h-12 justify-between">
            <TouchableOpacity
              onPress={() => {
                getAllTopicList()
                setShowTopicList(!showTopicList)
              }}
              style={styles.boxShadow}
              className="flex-row flex-1 h-full bg-white p-2 justify-center items-center rounded-xl"
            >
              <Ionicons name="chatbox-ellipses" size={15}/>
              <Text className="ml-1 font-bold text-base">
                话题
              </Text>
            </TouchableOpacity>
            <View className="w-2"></View>
            <TouchableOpacity
              style={styles.boxShadow}
              className="flex-row flex-1 h-full bg-white p-2 justify-center items-center rounded-xl"
              onPress={() => {
                Picker({
                  title: '是否公开',
                  columns: isPrivateList
                }).then(data => {
                  if(data.action === 'confirm'){
                    setIsPrivate(data.values[0])
                  }
                })
              }}
            >
              <Ionicons name={isPrivate === "1"?'lock-open': 'lock-closed'} size={15}/>
              <Text className="font-bold text-base">
                {isPrivate === "1"? '所有人可见': "所有人不可见"}
              </Text>
            </TouchableOpacity>
          </View>
          {/*话题列表*/}
          {showTopicList && chooseTopic.length !== topicList.length && (
            <View className="bg-white p-2 rounded mb-3">
              <ScrollView
                className="max-h-36"
              >
                {
                  topicList.filter(item1 => !chooseTopic.some(item2 => item1.topicId === item2.topicId)).map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={item.topicId}
                        className="flex-row items-center justify-between my-0.5"
                        onPress={() => {
                          let arr = chooseTopic
                          arr.push(item)
                          setChooseTopic(arr)
                          setShowTopicList(false)
                        }}
                      >
                        <Text className={['text-base', 'font-bold', index < 3? 'text-red-500': ''].join(' ')}>
                          # {item.title}
                          <Ionicons name=""/>
                        </Text>
                        <View className="flex-row">
                          <Image source={require('./img/fire-red.png')} className="w-4 h-4 "/>
                          <Text className="text-base ml-1 cursor-vertical-text">{item.heat}</Text>
                        </View>
                      </TouchableOpacity>
                    )
                  })

                }

              </ScrollView>
            </View>
          )}
          {/*文章预览*/}
          {contentInfo.content && <ScrollView className="bg-white rounded ">
            {/*标题*/}
            <Text className="text-xl px-2 pt-1 font-bold">
              {contentTitle}
            </Text>
            <RichEditor
              ref={richText}
              initialContentHTML={contentInfo.content}
              editorStyle={{
                contentCSSText: 'font-size: 18px; line-height: 25px; padding-top: 5px'
              }}
              disabled={true}
            />
            {selectProvinceData.length !== 0 &&
              <Text className="pl-2">
                <Ionicons name="location-outline"/>
                &nbsp;{selectProvinceData.map(item => item.label).join('·')}
              </Text>}
            <Text className="pl-2">
              <Ionicons name="time-outline"/>
              &nbsp;{currentTime}
            </Text>
          </ScrollView>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostPreview;
