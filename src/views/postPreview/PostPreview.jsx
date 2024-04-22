import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import BackHeader from "../../components/backHeader/BackHeader";
import {Picker, StepSelector, TextInput} from "@fruits-chain/react-native-xiaoshu";
import {getAllAreaByCity, getAllCitiesByProvince, getALlProvince, getAllTowns} from "../../api/province";
import {Ionicons} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getAllOpenTopics} from "../../api/topic";
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
  const provinceData = useRef(0)
  const areaData = useRef(0)
  /**
   * 发布
   */
  const handleSend = () => {
    console.log('发布')
  }
  /**
   * 选择省市
   */
  const selectProvince = () => {
    StepSelector({
      request: requestProvince,
      onConfirm: (v, o, isEnd) => {
        setSelectProvinceData(o)
      },
    }).catch(() => {})
  }
  /**
   * 请求省市数据
   */
  const requestProvince = (pId, index) => {
    return new Promise(async (resolve) => {
      // 根据选择的省份ID获取对应的城市列表
      switch (index) {
        case 0:
          let provinces = await getALlProvince();
          resolve({
            options: provinces.data.length === 0 ? [] : provinces.data.map((province, i) => ({
              value: province.province, // 使用数字索引作为值
              label: province.name,
            })),
            placeholder: `请选择省`,
          });
          break;
        case 1:
          provinceData.current = pId
          let cities = await getAllCitiesByProvince(pId);
          resolve({
            options: cities.data.length === 0 ? [] : cities.data.map((city, i) => ({
              value: city.city, // 使用数字索引作为值
              label: city.name,
            })),
            placeholder: `请选择市`,
          });
          break;
        case 2:
          areaData.current = pId
          let areas = await getAllAreaByCity(provinceData.current, pId);
          resolve({
            options: areas.data.length === 0 ? [] : areas.data.map((area, i) => ({
              value: area.id, // 使用数字索引作为值
              label: area.name,
            })),
            placeholder: `请选择县`,
          });
          break;
        case 3:
          let towns = await getAllTowns(provinceData.current, areaData.current);
          resolve({
            options: towns.data.length === 0 ? [] : towns.data.map((town, i) => ({
              value: town.id, // 使用数字索引作为值
              label: town.name,
            })),
            placeholder: `请选择县`,
          });
          break;
        case 4:
          resolve({
            options: [],
            placeholder: `请选择镇`,
          });
          break;
      }
    });
  }
  /**
   * 获取存储中的文本数据
   */
  const [contentText, setContentText] = useState('')
  const [contentTitle, setContentTitle] = useState('')
  useEffect(() => {
    const getStorageData = async () => {
      const data = await AsyncStorage.getItem('editPost');
      const parseData = JSON.parse(data)
      parseData.title? setContentTitle(parseData.title): setContentTitle('')
      parseData.content? setContentText(parseData.content): setContentText('')
    };
    getStorageData()
  }, []);
  /**
   * 是否显示话题列表
   */
  const [showTopicList, setShowTopicList] = useState(false)
  /**
   * 全部话题列表
   */
  const [topicList, setTopicList] = useState([])
  const getAllTopicList = () => {
    getAllOpenTopics().then(res => {
      setTopicList(res.data)
    })
  }
  /**
   * 已选话题
   */
  const chooseTopic = useRef([])
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
      <ScrollView>
        <BackHeader title="预览" rightContent={rightContent} rightHandle={handleSend}></BackHeader>
        <View
          className="p-2"
        >
          <View style={styles.boxShadow} className="bg-white px-2 py-1 rounded flex-row items-center">
            <Text className="text-base font-bold">标题：</Text>
            <TextInput placeholder="输入帖子标题" value={contentTitle} onChange={setContentTitle}/>
          </View>
          {/* 选择发布地点 */}
          <View style={styles.boxShadow} className="mt-3 bg-white p-2 rounded">
            <TouchableOpacity
              className="flex-row items-center justify-between"
              onPress={selectProvince}
            >
              <View className="flex-row items-center">
                <Text className="text-base font-bold">
                  地点：
                </Text>
                <Text className="text-sm">
                  {selectProvinceData.map(item => item.label).join('')}
                </Text>
              </View>
              <TouchableOpacity>
                <Text className="text-gray-600">
                  选择地点 >
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>

          </View>
          {/*选择的话题*/}
          {
            chooseTopic.current.length > 0? (
              <View className="flex-row p-2 bg-white mt-3">
                <Text className="text-base font-bold">话题：</Text>
                {chooseTopic.current.map((topic, index) => {
                  return (
                    <View
                      key={index}
                      className="mr-2"
                    >
                      <Text className="text-blue-500 text-base"># {topic.title}</Text>
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
          <View></View>
          {/*话题列表*/}
          {showTopicList && chooseTopic.current.length !== topicList.length && (
            <View className="bg-white p-2 rounded">
              <ScrollView
                className="max-h-36"
              >
                {
                  topicList.filter(item1 => !chooseTopic.current.some(item2 => item1.topicId === item2.topicId)).map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={item.topicId}
                        className="flex-row items-center justify-between mb-1"
                        onPress={() => {
                          chooseTopic.current.push(item)
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
        </View>
        {/*标题*/}
        <View>
          <Text>
            123
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostPreview;
