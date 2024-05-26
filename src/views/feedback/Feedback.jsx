import React, {useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity, Image, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import BackHeader from "../../components/backHeader/BackHeader";
import {Dialog, Picker, TextInput, Toast} from "@fruits-chain/react-native-xiaoshu";
import {FEEDBACK_LIST, FEEDBACK_MAP} from "../../config/constant";
import {themeColor} from "../../config/theme";
import {fileUpload, getCurrentTime, picketImage} from "../../utils/utils";
import uploaderImage from "@fruits-chain/react-native-xiaoshu/src/uploader/uploader-image";
import {Ionicons} from "@expo/vector-icons";
import {postSendFeedback} from "../../api/feedback";
import {deletePostDraft, postSavePostsDraft} from "../../api/post";

const FeedbackScreen = () => {
  const navigation = useNavigation();
  const [type, setType] = useState("");
  const [reason, setReason] = useState("")
  const [imgArr, setImgArr] = useState([])
  const sendFeedBack = () => {
    if(!type) return Toast("请选择类型🫠")
    if(!reason.trim() || reason.trim().length < 20) return Toast("请最少输入20个字哦🥺")
    const data = {
      type: type,
      submitTime: getCurrentTime(),
      content: reason.trim(),
      imgs: JSON.stringify(imgArr)
    }
    postSendFeedback(data).then(res => {
      console.log(res)
    })
  }
  return (
    <SafeAreaView>
      <StatusBar style={"dark"}></StatusBar>
      <BackHeader
        title="反馈"
        rightContent={() => <Text className="w-14 text-blue-700">反馈列表</Text>}
        rightHandle={() => {
          navigation.navigate("FeedbackList")
        }}
      />
      <View className="px-2 py-4 relative h-full w-full">
        <View className="flex-row pb-2">
          <Text className="text-base font-bold">反馈类型：</Text>
          <TouchableOpacity
            onPress={() => {
              Picker({
                title: '反馈类型',
                columns: FEEDBACK_LIST,
              }).then(data => {
                if(data.action === 'confirm'){
                  setType(data.values[0])
                }
              })
            }}
            className="flex-1 flex-row justify-between items-center"
          >
            <Text className="text-lg">
              {FEEDBACK_MAP.get(type)}
            </Text>
            <Text>
              选择 >
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row mt-2 w-full">
          <Text className="text-base font-bold">反馈内容：</Text>
          <TextInput
            bordered
            placeholder="完善反馈信息"
            inputWidth={310}
            maxLength={200}
            showWordLimit
            type="textarea"
            value={reason}
            onChange={setReason}
          />
        </View>
        <View className="flex-row mt-2 w-full">
          <Text className="text-base font-bold">上传图片：</Text>

          <View className="flex-row flex-wrap w-72">
            <TouchableOpacity
              className=" items-center justify-center w-20 border border-gray-300"
              onPress={() => {
                picketImage().then(res => {
                  fileUpload(res.assets[0]).then(res1 => {
                    let arr = JSON.parse(JSON.stringify(imgArr))
                    arr.push(res1)
                    setImgArr(arr)
                  })
                })
              }}
            >
              <Image
                source={{uri: 'https://ivikey.top/server/image/upload1.png'}}
                className="w-12 h-12"
                resizeMode={"contain"}
              />
            </TouchableOpacity>
            {
              imgArr.map((item, index) => {
                return (
                  <View className="m-2 relative">
                    <Image
                      key={index}
                      source={{uri: item}}
                      style={{width: 80, aspectRatio: 9/16 }}
                    ></Image>
                    <TouchableOpacity
                      onPress={() => {
                        let arr = JSON.parse(JSON.stringify(imgArr))
                        arr.splice(index, 1)
                        setImgArr(arr)
                      }}
                      className="absolute right-0 top-0 bg-gray-400"
                    >
                      <Ionicons name="close-sharp" color={"white"} size={15}/>
                    </TouchableOpacity>
                  </View>
                )
              })
            }
          </View>


        </View>
        <TouchableOpacity
          className="mt-10 w-full h-10 justify-center items-center rounded"
          style={{backgroundColor: themeColor.primary}}
          onPress={() => {
            Dialog.confirm({
              title: '提示',
              message: '确定提交嘛？',
            }).then(async action => {
              if (action === 'confirm') {
                sendFeedBack()
              }
            })
          }}
        >
          <Text className="font-bold text-base text-white">提交反馈</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FeedbackScreen;
