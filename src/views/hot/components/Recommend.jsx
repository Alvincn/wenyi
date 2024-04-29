import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity, StyleSheet, Platform, Image} from "react-native";
import {themeColor} from "../../../config/theme";
import {Ionicons} from "@expo/vector-icons";
import {dateMap} from "../../../config/constant";
import {getGoodsPosts} from "../../../api/post";

const styles = StyleSheet.create({
  boxShadow: {},
  card: {
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 8,
    position: 'relative',
    width: '100%',
    marginVertical: 10,
    height: 200,
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  }
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
    shadowColor: 'gray',
    elevation: 5
  }
}
const dayHeritageInfo = {
  address: "530000",
  area: "532901",
  auto_id: "376",
  cate: "新增项目",
  city: "532900",
  content: "申报地区或单位：云南省大理市 &lt;br /&gt;\r\n　　 &lt;br /&gt;\r\n　　扎染古称“绞缬”，是我国一种古老的纺织品染色技艺。大理白族自治州大理市周城村和巍山彝族回族自治县的大仓、庙街等地至今仍保留着这一传统技艺，其中以周城白族的扎染业最为著名，被文化部命名为“民族扎染之乡”。 &lt;br /&gt;\r\n　　据史书记载，东汉时期大理地区就有染织之法。唐贞元十六年，南诏舞队到长安献艺，所着舞衣“裙襦鸟兽草木，文以八彩杂革”即为扎染而成。明清时期，洱海白族地区的染织技艺已到达很高水平，出现了染布行会，明朝洱海卫红布、清代喜洲布和大理布均是名噪一时的畅销产品。近代以来，大理染织业继续发展，周城成为远近闻名的手工织染村。 &lt;br /&gt;\r\n　　扎染一般以棉白布或棉麻混纺白布为原料，染料主要是植物蓝靛（云南民间俗称板兰根）。扎染的主要步骤有画刷图案、绞扎、浸泡、染布、蒸煮、晒干、拆线、碾布等，技术关键是绞扎手法和染色技艺，染缸、染棒、晒架、石碾等是扎染的主要工具。白族扎染品种多样，图案多为自然形的小纹样，分布均匀，题材寓意吉祥，具有重要的美学价值和实用功能，深受国内外消费者的好评。 &lt;br /&gt;\r\n　　大理白族扎染显示出浓郁的民间艺术风格，一千多种纹样是千百年来白族历史文化的缩影，折射出白族的民情风俗与审美情趣，与各种工艺手段一起构成富有魅力的大理白族织染文化。 &lt;br /&gt;\r\n　　但是，当前产业化的趋势使部分传统扎染技艺走向消亡，原有的民间特色开始退化，污染问题日益突出，市场经营滋生了对经济利益的过度追求，植物染料板兰根供不应求。在此情势下，白族扎染技艺的传承受到困扰。只有认真解决上述问题，才能促进大理传统白族织染技艺的传承和发展。",
  id: "14304",
  num: "Ⅷ-26",
  num_first: "8",
  num_sec: "26",
  project_num: "Ⅷ-026_01_532901",
  protect_unit: "大理市非物质文化遗产保护管理所",
  province: "云南省大理市",
  rx_time: '2006</br>(第一批)',
  title: "白族扎染技艺",
  type: "传统技艺",
  unit: "云南省大理市",
}
const Recommend = () => {
  // 获取时间
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const navigation = useNavigation();

  return (
    <View
      style={[styles.card, styles.boxShadow]}
    >
      {/*顶部每日非遗内容区*/}
      <View className="flex-row justify-between items-center">
        <View className="flex-row">
          <Text className="font-bold text-4xl mr-1" style={{color: themeColor.primary}}>
            {day < 10? '0' + day: day}
          </Text>
          <View>
            <Text className="font-bold leading-5">{dateMap.get(month)}</Text>
            <Text className="font-bold leading-4">{year}</Text>
          </View>
          <Text className="font-bold text-3xl leading-10 ml-1">
            每日非遗
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Happy")
          }}
        >
          <Text>
            天天开心🤪
          </Text>
        </TouchableOpacity>
      </View>
      {/*下方图片展示*/}
      <TouchableOpacity
        className="w-full justify-center items-center flex-1"
        onPress={() => {
          navigation.navigate("HeritageDetail", {
            heritageInfo: dayHeritageInfo
          })
        }}
      >
        <Image source={require('../imgs/img.png')} className="max-h-36 min-w-full"></Image>
      </TouchableOpacity>
      {/*地址展示*/}
      <View className="flex-row justify-between absolute left-2.5 bottom-2 w-full" style={{backgroundColor: 'rgba(0, 0, 0, .5)'}}>
        <Text className="text-white pl-1">
          <Ionicons name="location" color="white"></Ionicons>
          <Text> 云南</Text>
          <Text> · </Text>
          <Text>大理</Text>
          <Text> · </Text>
          <Text>扎染</Text>
        </Text>
        <Text className="text-white pr-2">
          去看看 >
        </Text>
      </View>
    </View>
  );
};

export default Recommend;
