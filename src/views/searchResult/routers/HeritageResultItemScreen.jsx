import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, ScrollView, Dimensions, TouchableOpacity} from "react-native";
import {getHeritageByKeyWord, reqGetHeritageByLocation} from "../../../api/heritage";
import SearchKeywordContext from "../../../context/SearchKeyWordContext";
import HeritageItem from "../../../components/heritageItem/HeritageItem";
import LoadingItem from "../../../components/loading/LoadingItem";
import {themeColor} from "../../../config/theme";
import {Ionicons} from "@expo/vector-icons";
import {Collapse, Toast} from "@fruits-chain/react-native-xiaoshu";

const HeritageResultItemScreen = () => {
  const {keyword} = useContext(SearchKeywordContext)
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)
  const [heritageList, setHeritageList] = useState([]);
  const [localHeritageList, setLocalHeritageList] = useState([]);
  // 根据关键词获取
  const getHeritageList = async () => {
    setHeritageList([])
    let res = await getHeritageByKeyWord(keyword)
    if (res) setHeritageList(res)
  }
  const renderHeritage = () => {
    if(loading) return <LoadingItem loading={loading}></LoadingItem>
    if(localHeritageList.length <= 0) return <></>
    return localHeritageList.map((item, index) => {
      return (
        <TouchableOpacity
          onPress={() => {
            goHeritage(item)
          }}
          key={index}
          className="py-2 flex-row justify-between items-center"
        >
          <View>
            <View>
              <Text className="font-bold text-lg">{item.nameCn}</Text>
            </View>
            <View>
              <Text className="text-base"><Ionicons name="location"/>{item.placeCn}</Text>
            </View>
          </View>
          <View>
            <Ionicons name="caret-forward" size={20}/>
          </View>

        </TouchableOpacity>
      )
    })

  }
  const renderCollapse = (renderHeritage) => {
    if(localHeritageList.length <= 0) return <></>
    return <Collapse title="地区非遗" defaultCollapse={true}>
      {renderHeritage()}
    </Collapse>
  }
  // 地区
  const goHeritage = (obj) => {
    getHeritageByKeyWord(obj.nameCn).then(res => {
      if (!res) return Toast("Sorry~暂未找到该非遗信息")
      if (res.length === 0) return Toast("Sorry~暂未找到该非遗信息");
      if (res.length === 1) {
        return navigation.navigate('HeritageDetail', {
          heritageInfo: res[0]
        })
      };
      let filterMap = res.filter(item => {
        return item.title === obj.nameCn
          && Number(item.rx_time?.split("</br>")[0]) === obj.time
          && item.unit === obj.placeCn
          && item.num === obj.projNum
      })
      if (filterMap && filterMap.length > 0) {
        navigation.navigate('HeritageDetail', {
          heritageInfo: filterMap[0]
        })
      } else {
        return Toast("Sorry~暂未找到该非遗信息")
      }
    })
  }
  // 根据地点获取
  const getHeritageByLocation = async () => {
    setLocalHeritageList([])
    let res = await reqGetHeritageByLocation(keyword)
    setLocalHeritageList(res.data)
    setLoading(false)

  }
  useEffect(() => {
    if(keyword) {
      setLoading(true)
      getHeritageList()
      getHeritageByLocation()
    }
  }, [keyword])
  return (
    <View style={{height: Dimensions.get("screen").height - 130}} className="relative">
      <LoadingItem loading={loading} className="w-full h-full"></LoadingItem>
      <ScrollView className="h-full bg-white px-2 rounded-xl" >

        {/*缺醒状态*/}
        {
          !loading? heritageList.length === 0 && localHeritageList.length === 0? (
            <View className="flex-row pt-2 justify-center items-center">
              <Text className="text-base font-bold">
                啥也木有搜到呢，换个关键词试试😰
              </Text>
            </View>): <></>: <></>
        }
        {
          renderCollapse(renderHeritage)
        }
        {
          !loading && heritageList.length > 0? heritageList.map((item, index) => {return <HeritageItem item={item} key={index}></HeritageItem>}) :<></>
        }
      </ScrollView>
    </View>
  );
};

export default HeritageResultItemScreen;
