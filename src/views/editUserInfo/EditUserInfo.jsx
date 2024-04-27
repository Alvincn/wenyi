import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, ImageBackground, Image, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {themeColor} from "../../config/theme";
import {getUserInfo, updateUserInfo} from "../../api/user";
import {Ionicons} from "@expo/vector-icons";
import {StatusBar} from "expo-status-bar";
import {TextInput, Cell, Picker, DatePicker, StepSelector, Toast} from "@fruits-chain/react-native-xiaoshu";
import {fileUpload, formatDate, picketImage, requestProvince, throttle} from "../../utils/utils";
import {getSearchSchool} from "../../api/school";


const EditUserInfo = () => {
  const loginRef = useRef(null);
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({})
  // 学校列表
  const [schoolArr, setSchoolArr] = useState([])
  // 学校名称
  const [schoolName, setSchoolName] = useState('')
  // 图片base64格式
  const [imgBase64,setImgBase64] = useState('')
  const getUserDetail = () => {
    getUserInfo().then(async res => {
      setUserInfo(res.data)
    })
  }
  useEffect(() => {
    getUserDetail()
  }, []);

  /**
   * 保存信息
   */
  const saveUserInfo = () => {
    if(userInfo.email){
      let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if(!pattern.test(userInfo.email)){
        return Toast.fail("邮箱格式不对哦，再检查一下叭～")
      }
    }
    loginRef.current = Toast.loading({
      duration: 0,
      message: "更新中～",
      forbidPress: true
    })
    updateUserInfo(userInfo).then(res => {
      loginRef.current.close()
      if(res.code === 200) {
        Toast.success('更新用户信息成功')
        navigation.goBack();
      }else {
        Toast.fail(res.message)
      }
    })
  }

  // 日期范围
  const Y_M_LIMIT = {
    min: new Date(1960, 1, 1 ),
    max: new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate()),
  }

  // 男女
  const gender = [
    {
      label: '女',
      value: '0',
    },
    {
      label: '男',
      value: '1',
    }
  ]

  // 选择省市
  const selectProvince = () => {
    StepSelector({
      request: requestProvince,
      onConfirm: (v, o, isEnd) => {
        setUserInfo(userInfo => {
          userInfo["locationArr"] = JSON.stringify(v);
          return userInfo
        })
        changeInfo(o.map(item => item.label).join('·'), "location")
      },
    }).catch((err) => {})
  }
  /**
   * 搜索学校
   */
  const searchSchool = (value) => {
    setSchoolName(value)
    if(value === '') {
      return setSchoolArr([])
    }
    throttle(getSearchSchool(value).then(res => {
      setSchoolArr(res.data)
    }))
  }

  /**
   * 修改信息
   */
  const changeInfo = (value, columns) => {
    let obj = JSON.parse(JSON.stringify(userInfo));
    obj[columns] = value;
    setUserInfo(obj)
  }
  return (
    <View className="w-full h-full relative">
      <StatusBar style="light"></StatusBar>
      <View className='h-1/4 relative'>
        <ImageBackground source={themeColor.mineDefaultBg} className="h-full">
          {/*顶部返回区*/}
          <View className="flex-row justify-between p-2 pt-10 items-center">
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="chevron-back" size={30} color={"white"}></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {saveUserInfo()}}
              className="bg-gray-700 justify-center items-center px-4 py-1 rounded-2xl"
            >
              <Text className="text-center text-white font-bold text-base">保存</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        {/*头像*/}
        <TouchableOpacity
          className="absolute -bottom-14 left-1/3 border-white border-4 rounded-full z-20"
          onPress={() => {
            picketImage({aspect: [1, 1], base64: true}).then(res => {
              if(!res) return
              setImgBase64(res.assets[0].base64)
              fileUpload(res.assets[0]).then(res => {
                changeInfo(res, "avatar")
              })
            })
          }}
        >
          { imgBase64?
            <Image source={{uri: `data:image/png;base64,${imgBase64}`}} className="w-32 h-32 rounded-full"></Image>
            :<Image source={{uri: userInfo.avatar !== null ? userInfo.avatar : themeColor.noAvatar}}
                  className="w-32 h-32 rounded-full"></Image>
          }
          <View className="absolute">
            <View className="bg-gray-900 opacity-50 w-32 h-32 rounded-full"></View>
            <View className="absolute w-full h-full justify-center items-center">
              <Ionicons name="camera" color="white" size={25}></Ionicons>
              <Text className="text-white font-bold text-base pt-2">更换头像</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/*内容区域*/}
      <View className="relative w-full bg-white h-full rounded-r-2xl -top-3 rounded-l-2xl pt-20">
        {/*编辑昵称*/}
        <Cell.Group>
          <Cell
            title="昵称:"
            value={<TextInput placeholder="🤩输入昵称！宝～" value={userInfo.nickname} onChange={(value) => changeInfo(value, 'nickname')}/>}
          />
          <Cell
            title="简介:"
            value={<TextInput placeholder="😎介绍一下自己吧～" value={userInfo.saying} onChange={(value) => changeInfo(value, 'saying')}/>}
          />
          <Cell
            title="性别:"
            value={(
            <TouchableOpacity
              onPress={() => {
                Picker({
                  title: '选择性别',
                    columns: gender,
                  }).then(data => {
                    changeInfo(data.values[0], 'gender')
                  })
              }}
              className="justify-center">
              <View className="align-middle relative top-1">
                <Text className={[userInfo.gender === null ?"text-gray-400": '', "text-base"].join(' ')}>{userInfo.gender === '1'? '男': userInfo.gender === '0'? '女': '告诉我你的性别吧~'}</Text>
              </View>
            </TouchableOpacity>
          )}
          />
          <Cell
            title="生日:"
            value={(
              <TouchableOpacity
                onPress={() => {
                  DatePicker({
                    ...Y_M_LIMIT,
                    title: '选择生日',
                    mode: 'Y-D',
                  }).then(({ action, value }) => {
                    if(action === 'confirm') {
                      const date = formatDate(value)
                      changeInfo(date + " 00: 00", "birthday")
                    }
                  })
                }}
                className="justify-center">
                <View className="align-middle relative top-1">
                  <Text className={[userInfo.birthday === null ?"text-gray-400": '', "text-base"].join(' ')}>{userInfo.birthday? userInfo.birthday.split(' ').length? userInfo.birthday.split(' ')[0]: userInfo.birthday: '🤩告诉我你的生日叭，我会记住你的生日哦～'}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          <Cell
            title="家乡:"
            value={(
              <TouchableOpacity
                onPress={() => {
                  selectProvince()
                }}
                className="justify-center">
                <View className="align-middle relative top-1">
                  <Text className={[userInfo.location === null ?"text-gray-400": '', "text-base"].join(' ')}>{userInfo.location? userInfo.location: '😆选择你的家乡，做你家乡的宣传大使！'}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          <Cell
            title="学校:"
            value={(
              <>
                <TextInput placeholder="填入学校，发现更多朋友🤠～" value={userInfo.schoolName || schoolName} onChange={(value) => searchSchool(value)}/>
                <View>
                  {schoolArr.map((item, index) => {
                    return (
                      <TouchableOpacity
                        className="w-full py-1"
                        key={item.schoolId}
                        onPress={() => {
                          changeInfo(item.schoolId, "schoolId")
                          setSchoolName(item.schoolName)
                          setSchoolArr([])
                        }}
                      >
                        <Text>{item.schoolName}</Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </>
            )}
          />
          <Cell
            title="邮箱:"
            value={<TextInput placeholder="设置下邮箱叭，可以用于账号找回哦👍～" value={userInfo.email} onChange={(value) => changeInfo(value, 'email')}/>}
          />
        </Cell.Group>
      </View>
    </View>

  );
};

export default EditUserInfo;
