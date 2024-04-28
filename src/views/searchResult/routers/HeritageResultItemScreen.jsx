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
    if(loading) return <></>
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
  }
  useEffect(() => {
    if(keyword) {
      setLoading(true)
      getHeritageList()
      getHeritageByLocation()
      setLoading(false)
    }
  }, [keyword])
  return (
    <View style={{height: Dimensions.get("screen").height - 130}}>
      <ScrollView className="h-full bg-white px-2 rounded-xl" >
        <LoadingItem loading={loading}></LoadingItem>
        {/*缺醒状态*/}
        {
          heritageList.length === 0 && localHeritageList.length === 0? (
            <View className="flex-row pt-16 justify-center items-center">
              <Text className="text-base font-bold">
                啥也木有搜到呢，换个关键词试试😰
              </Text>
            </View>): <></>
        }

        {/*地区非遗*/}
        {/*{*/}
        {/*  heritageList.length > 0 && localHeritageList.length > 0? <Text className="text-xl font-bold text-blue-500 text-center">地区非遗</Text>: <></>*/}
        {/*}*/}
        {/*<View className={[heritageList.length > 0? "border-b-2 border-gray-300": ""].join(" ")}>*/}

        {
          renderCollapse(renderHeritage)
        }

        {/*</View>*/}


        {/*非遗列表*/}
        {/*{*/}
        {/*  heritageList.length > 0 && localHeritageList.length > 0? <Text className="text-xl font-bold text-blue-500 text-center">非遗列表</Text>: <></>*/}
        {/*}*/}
        {
          !loading && heritageList.length > 0? heritageList.map((item, index) => {return <HeritageItem item={item} key={index}></HeritageItem>}) :<></>
        }

      </ScrollView>
    </View>
  );
};

export default HeritageResultItemScreen;
