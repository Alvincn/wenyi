import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text} from "react-native";
import {getFeedback} from "../../api/feedback";
import {SafeAreaView} from "react-native-safe-area-context";
import LoadingItem from "../../components/loading/LoadingItem";
import BackHeader from "../../components/backHeader/BackHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Ionicons} from "@expo/vector-icons";
import {Dialog} from "@fruits-chain/react-native-xiaoshu";

const FeedbackDetail = ({ route }) => {
  const id = route.params.id;
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({})
  const [feedback, setFeedback] = useState({});
  const [loading, setLoading] = useState(false)
  const getFeedbackById = () => {
    setLoading(true)
    getFeedback(id).then(res => {
      setFeedback(res.data)
      setLoading(false)
    })
  }
  const getUserInfo = async () => {
    let userInfo = await AsyncStorage.getItem("userInfo");
    console.log(userInfo)
  }
  useEffect(() => {
    if(!id) return
    getFeedbackById()
    getUserInfo()
  }, [id])
  return (
    <SafeAreaView>
      <LoadingItem loading={loading}></LoadingItem>
      {!loading?(
        <View>
          <BackHeader
            title="反馈详情"
            // rightContent={() => userInfo.id === <Ionicons name="trash" size={20} color="grey"/>}
            // rightHandle={() => {
            //   Dialog.confirm({
            //     title: '提示',
            //     message: '确定撤回该反馈嘛？',
            //   }).then(async action => {
            //     if (action === 'confirm') {
            //       sendFeedBack()
            //     }
            //   })
            // }}
          ></BackHeader>
          <View className="flex-row p-2">
            <Text >
              {}
            </Text>
          </View>
        </View>):<></>
      }
    </SafeAreaView>
  );
};

export default FeedbackDetail;
