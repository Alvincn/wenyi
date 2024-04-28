import React, {useEffect, useMemo, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, Image, TouchableOpacity, ImageBackground, ScrollView, StyleSheet, Dimensions} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import BackHeader from "../../components/backHeader/BackHeader";
import {addCollectionHeritage, getBiYingImg, isCollectionHeritage, removeCollectionHeritage} from "../../api/heritage";
import {Ionicons} from "@expo/vector-icons";
import {StatusBar} from "expo-status-bar";
import {themeColor} from "../../config/theme";
import LoadingItem from "../../components/loading/LoadingItem";
import {LinearGradient} from "expo-linear-gradient";
import {Toast} from "@fruits-chain/react-native-xiaoshu";
const HeritageDetailScreen = ({route}) => {
  const [isCollection, setIsCollection] = useState(false);
  const heritageInfo = route.params.heritageInfo;
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();
  const [biImg, setBiImg] = useState([{
    imageUrl: 'https://ivikey.top/server/image/defaultBack.jpg'
  }])
  // 计算内容
  const heritageContent = useMemo(() => {
      if(heritageInfo.content) {
        let content = heritageInfo.content
        content = content.replaceAll('&lt;br /&gt;', '').replace("\n", '').split(' ')
        return content.join('')
      }else {
        return heritageInfo.title
      }
  }, [heritageInfo])
  /**
   * 获取用户是否关注了此非遗
   */
  const reqIsCollection = () => {
    isCollectionHeritage({heritageId: heritageInfo.id}).then(res => {
      setIsCollection(res.data)
    })
  }
  const collectionData = useMemo(() => {
      return {
        heritageId: heritageInfo.id,
        heritageName: heritageInfo.title,
        heritageLocation: heritageInfo.unit,
        heritageContent: heritageInfo.content,
        rxTime: heritageInfo.rx_time.split('</br>')[0],
        totalInfo: JSON.stringify(heritageInfo)
      }
  }, [heritageInfo])
  /**
   * 点击收藏
   */
  const handleCollection = () => {
    if(isCollection) {
      removeCollectionHeritage(collectionData).then(res => {
        if(res.code !== 200) {
          setTimeout(() => {
            navigation.navigate("Login")
          }, 1000)
          return Toast.fail("未登录！")
        }
        setIsCollection(false)
      })
    }else {
      addCollectionHeritage(collectionData).then(res => {
        if(res.code !== 200) {
          setTimeout(() => {
            navigation.navigate("Login")
          }, 1000)
          return Toast.fail("未登录！")
        }
        setIsCollection(true)
      })
    }

  }
  useEffect(() => {
    setLoading(true)
    reqIsCollection()
    if(heritageInfo !== undefined) {
      getBiYingImg(heritageInfo.title).then(res => {
        if(res.length) {
          setBiImg(res)
        }else {
          setBiImg([{
            imageUrl: themeColor.mineDefaultBg
          }])
        }
        setLoading(false)
      })
    }
  }, [heritageInfo])

  return (
    <View>
      <LoadingItem loading={loading}></LoadingItem>
      {!loading && <View>
        {/*背景图片*/}
        {biImg.length !== 0 ? <View style={{height: 400}}>
            <ImageBackground source={{uri: biImg[0].imageUrl}} className="h-full">
              <SafeAreaView></SafeAreaView>
              <StatusBar style={"light"}/>
              {/*头部操作区*/}
              <View className="pl-2 mt-5 z-50 flex-row justify-between">
                <TouchableOpacity
                  style={{backgroundColor: "rgba(0, 0, 0, .3)"}}
                  className="flex-row rounded-full w-10 h-10 items-center justify-center"
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Ionicons name="chevron-back" size={30} color="white"></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{backgroundColor: "rgba(0, 0, 0, .3)"}}
                  className="flex-row rounded-full w-10 h-10 items-center justify-center mr-2"
                  onPress={() => {
                    handleCollection()
                  }}
                >
                  <Ionicons name={isCollection? "star": "star-outline"} size={22} color={isCollection? "#f8b555": "white"}></Ionicons>
                </TouchableOpacity>
              </View>
              <LinearGradient
                colors={['transparent', 'rgba(255, 255, 255, 1)']} // 调整颜色和透明度以达到你想要的效果
                style={styles.linearGradient}
              />
            </ImageBackground>
          </View> :
          <SafeAreaView>
            <BackHeader title={"非遗详情"} rightHandle={() => {
            }} rightContent={() => <></>} leftHandle={() => navigation.goBack()}></BackHeader>
          </SafeAreaView>
        }
        <View
          style={{height: Dimensions.get("window").height - 120}}
          className={[biImg.length !== 0 ? '-top-64 bg-white' : '', 'relative', '', 'mx-2', 'rounded-r-2xl', 'rounded-l-2xl'].join(" ")}
        >
          <View className="w-full p-2">
            <View className="my-2">
              <Text className="text-3xl font-bold text-center">
                {/*<Ionicons name="caret-back-outline" size={20}/>*/}
                  {heritageInfo.title}
                {/*<Ionicons name="caret-forward" size={20}/>*/}
              </Text>
              <View className="flex-row justify-center py-1">
                <Text className="text-base text-center text-gray-400">{heritageInfo.project_num}</Text>
                <Text className="text-base text-center pl-4 text-gray-400">{heritageInfo.type}</Text>
              </View>
              <View className="flex-row justify-center p-1">
                <View className="flex-row items-center pl-2">
                  <Ionicons name="time-outline" size={16} color={'gray'} className=""></Ionicons>
                  <Text className="text-base text-center pl-0.5 leading-4 text-gray-400">{heritageInfo.rx_time.split('</br>')[0]}</Text>
                </View>
                <View className="flex-row items-center pl-2">
                  <Ionicons name="location-outline" size={15} color={'gray'}></Ionicons>
                  <Text className="text-base text-center pl-0.5 leading-4 text-gray-400">{heritageInfo.unit}</Text>
                </View>
              </View>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="mt-2 mb-20"
            >
              <Text className="text-lg">
                {heritageContent}
              </Text>
              <Text className="text-gray-400 text-right pb-8">
                图片来源自<Text className="font-bold">必应图片</Text>
              </Text>
            </ScrollView>
          </View>
        </View>
      </View>}
    </View>
  );
};
const styles = StyleSheet.create({
  linearGradient: {
    zIndex: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
export default HeritageDetailScreen;

