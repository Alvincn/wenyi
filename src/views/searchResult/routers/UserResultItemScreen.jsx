import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, Dimensions, ScrollView, Image, TouchableOpacity} from "react-native";
import SearchKeywordContext from "../../../context/SearchKeyWordContext";
import PostItem from "../../../components/postItem/PostItem";
import {searchUser} from "../../../api/user";
import {themeColor} from "../../../config/theme";
import {Ionicons} from "@expo/vector-icons";
import {calculateAge} from "../../../utils/utils";

const UserResultItemScreen = ({ route }) => {
  const {keyword} = useContext(SearchKeywordContext)
  const [userList, setUserList] = useState([])
  const navigation = useNavigation();
  const getUserList = async () => {
    setUserList([])
    let result = await searchUser(keyword)
    setUserList(result.data)
  }
  useEffect(() => {
    if(!keyword) return
    getUserList();
  }, [keyword])
  // 年龄性别
  const ShowGenderAndAge = ({item}) => {
    if(!item.birthday || item.gender === null) return <></>
    const age = calculateAge(item.birthday)
    return <View className="flex-row">
      <Ionicons name={Number(item.gender) === 1? "male": "female"} size={14} color={themeColor.primary}/>
      <Text className="pl-1">{age}岁</Text>
    </View>
  }
  const ShowLocation = ({location}) => {
    if(!location) return <></>
    return <View className="flex-row pl-1">
      <Ionicons name="location" size={14} color={themeColor.primary}/>
      <Text className="pl">{location}</Text>
    </View>
  }
  const ShowSchool = ({schoolName}) => {
    if(!schoolName) return <></>
    return <View className="flex-row pl-1">
      <Ionicons name="school" size={14} color={themeColor.primary}/>
      <Text className="pl">{schoolName}</Text>
    </View>
  }
  return (
    <View style={{height: Dimensions.get("screen").height - 130}}>
      <ScrollView className="h-full bg-white px-2 rounded-xl pt-2" >
        {
          userList.length > 0 ?userList.map((item, index) => {
            return (
              <TouchableOpacity
                key={item.id}
                className="flex-row p-2 mb-2 items-center justify-between"
                onPress={() => {
                  navigation.navigate("UserCenter", {
                    userId: item.id
                  })
                }}
              >
                <Image source={{uri: item.avatar || themeColor.noAvatar}} width={60} height={60} className="rounded-full mr-1"></Image>
                <View className="flex-1">
                  <Text className="text-base font-bold">{item.nickname}</Text>
                  <Text className="" numberOfLines={1}>{item.saying}</Text>
                  <View className="flex-row pt-1">
                    <ShowGenderAndAge item={item}></ShowGenderAndAge>
                    <ShowLocation location={item.location}></ShowLocation>
                    <ShowSchool schoolName={item.schoolName}></ShowSchool>
                  </View>
                </View>
                <View>
                  <Ionicons name="caret-forward" size={20}/>
                </View>
              </TouchableOpacity>
            )
          }):<></>
        }
        {/*缺醒状态*/}
        {
          userList.length === 0? (
            <View className="flex-row pt-2 justify-center items-center">
              <Text className="text-base font-bold">
                啥也木有搜到呢，换个关键词试试😰
              </Text>
            </View>): <></>
        }
      </ScrollView>
    </View>
  );
};

export default UserResultItemScreen;
