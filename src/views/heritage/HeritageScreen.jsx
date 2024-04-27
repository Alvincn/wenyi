import React, {useEffect, useState} from 'react';
import {Link, useNavigation} from "@react-navigation/native";
import {View, Text, ScrollView, RefreshControl, StyleSheet, Platform, FlatList, VirtualizedList} from "react-native";
import {Dropdown} from "@fruits-chain/react-native-xiaoshu";
import {PROVINCE, TYPE} from "../../config/constant";
import {getHeritagesData} from "../../api/heritage";
import LoadingItem from "../../components/loading/LoadingItem";
import HeritageItem from "../../components/heritageItem/HeritageItem";

const HeritageScreen = () => {
  // 所属地区
  const [selectProvince, setSelectProvince] = useState(null)
  // 类型
  const [selectType, setSelectType] = useState(null)
  /**
   * 页面相关
  */
  // 页码
  const [page, setPage] = useState({
    current: 1,
    total: 0,
    total_page: 0
  })
  // 页码信息
  /**
   * 非遗数据相关
   */
  // 非遗列表
  const [heritages, setHeritages] = useState([])
  const navigation = useNavigation();
  /**
   * 下拉刷新
   */
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const onRefresh = React.useCallback(() => {
    getData()
  }, []);
  /**
   * 获取非遗数据
   */
  const getData = () => {
    getHeritagesData({
      province: selectProvince || '',
      type: selectType || '',
      page: page.current
    }).then(res => {
      let list = heritages.concat(res.list)
      setHeritages(list)
      setPage(res.pageInfo)
      setLoading(false)
    })
  }
  /**
   * 监控页面选择，重新获取数据
   */
  useEffect(() => {
    getData()
  }, [selectType, selectProvince])
  useEffect(() => {
    setLoading(true)
    navigation.addListener("focus", () => {
      getData()
    })
  }, []);
  const renderItem = ({ item }) => (
    <HeritageItem item={item}></HeritageItem>
  );
  return (
    <View className="h-full">
      {/*顶部检索区域*/}
      <View className="flex-row w-full mt-4">
        <View className="bg-white flex-1 mr-2 mb-1 rounded-2xl">
          <Dropdown
            style={{borderRadius: 10}}
          >
            <Dropdown.Item
              options={PROVINCE}
              value={selectProvince}
              placeholder="选择地区"
              onChange={v => {
                setHeritages([])
                setSelectProvince(v)
              }}
            />
          </Dropdown>
        </View>
        <View style={styles.boxShadow} className="bg-white rounded-2xl mb-1 flex-1">
          <Dropdown
            style={{borderRadius: 10}}
          >
            <Dropdown.Item
              options={TYPE}
              value={selectType}
              placeholder="选择类型"
              onChange={v => {
                setHeritages([])
                setSelectType(v)
              }}
            />
          </Dropdown>
        </View>
      </View>

      {/* 数据区 */}
      {loading && <LoadingItem loading={loading}></LoadingItem>}
      {!loading && <View className="mb-20">
        <View className="flex-row justify-between my-1">
          <Text className="">共<Text className="font-bold">{page.total}</Text>条数据</Text>
          <Text className="">数据来源于<Text className="font-bold">中国非物质文化遗产网</Text></Text>
        </View>
        <FlatList
          data={heritages}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={onRefresh}
          keyExtractor={(item, index) => {
            return item.id + "" + index
          }}
          onEndReached={() => {
            page.current += 1
            getData()
          }}
        />
      </View>}
    </View>
  );
};

/**
 * 页面阴影
 */
const styles = StyleSheet.create({
  boxShadow: {},
});
// 根据不同平台选择不同的阴影展示
if(Platform.OS === 'ios'){
  styles.boxShadow = {
    shadowColor: '#52006A',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  }
} else if(Platform.OS === 'android'){
  styles.boxShadow = {
    shadowColor: 'black',
    elevation: 5
  }
}
export default HeritageScreen;
