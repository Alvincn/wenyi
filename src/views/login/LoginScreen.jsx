import React, {useEffect, useMemo, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {
  Animated, Dimensions,
  ImageBackground, Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity, TouchableWithoutFeedback,
  View
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {themeColor} from "../../config/theme";
import {Ionicons} from "@expo/vector-icons";
import {getFindUserByUserName, postRegister, postLogin} from "../../api/user";
import {Checkbox, PasswordInput, TextInput, Toast} from '@fruits-chain/react-native-xiaoshu'
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const navigation = useNavigation();
  /**
   * 配置 style 的样式
   * @type {{boxShadow: {}}}
   */
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
      elevation: 25
    }
  }

  /**
   * 数据区
   */
  // 用户名
  const [userName, setUserName] = useState('')
  // 密码
  const [password, setPassword] = useState('')
  // 勾选协议
  const [checkProtocol, setCheckProtocol] = useState(false)
  /**
   * 当前用户进度
   *  0:输入用户名;
   *  1:老用户输入密码;
   *  2:新用户输入密码
  */
  const [userState, setUserState] = useState(0)

  /**
   * 密码正则检查
   * @returns {boolean}
   */
  const validatePassword = () => {
    const reg = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^\da-zA-Z\s]).{1,20}$/
    return reg.test(password)
  }

  // 下一步
  const nextStep = () => {
    if(userState === 0) {
      // 根据用户名查找用户
      getFindUserByUserName({
        userName: userName
      }).then(res => {
        animationSequence.start()
        if(res.code === 201){
          // 新用户
          setUserState(2)
        }else {
          // 老用户
          setUserState(1)
        }
      })
    }else if(userState === 1){
      // 老用户，直接登录
      if(validatePassword()){
        postLogin({
          username: userName,
          password: password
        }).then(async res => {
          if (res.code !== 200) {
            return Toast.fail(res.message)
          }
          await AsyncStorage.setItem('wenyiToken', res.data)
          navigation.navigate('Home')
        })
      }else {
        Toast({
          message: '密码至少包含字母、数字、特殊字符哦~'
        })
      }
    }else {
      // 新用户，注册后登录
      if(validatePassword()){
        postRegister({
          username: userName,
          password: password
        }).then(res => {
          postLogin({
            username: userName,
            password: password
          }).then(async res => {
            if (res.code !== 200) {
              return Toast.fail(res.message)
            }
            await AsyncStorage.setItem('wenyiToken', res.data)
            navigation.navigate('Home')

          })
        })
      }else {
        Toast({
          message: '密码至少包含字母、数字、特殊字符哦~'
        })
      }
    }
  }

  /**
   * 按钮状态设置
  */
  const buttonState = useMemo(() => {
    // 在输入用户名位置
    if(userState === 0) {
      return (checkProtocol && userName.trim() !== '')
    }
    if(userState === 1 || userState === 2) {
      return (checkProtocol && password.trim() !== '')
    }
  }, [userState, userName, password, checkProtocol])

  /**
   * 欢迎语设置
   * @returns {{hope: string, welcome: string}}
   */
  const welcomeText = () => {
    let text = {
      welcome: '',
      hope: ''
    }
    switch (userState) {
      case 0:
        text = {
          welcome: '欢迎登录',
          hope: '我们希望'
        }
        break
      case 1:
        text = {
          welcome: '回到',
          hope: '让我们继续'
        }
        break
      case 2:
        text = {
          welcome: '加入',
          hope: '让我们一起'
        }
        break

    }
    return text
  }

  /**
   * 设置动画
   * @type {Animated.Value}
   */
  const translateXUsername = new Animated.Value(0);
  const translateXPassword = new Animated.Value(460); // 假设 screenWidth 是屏幕的宽度
  const animatedValue = new Animated.Value(0)
  const moveUsernameOut = Animated.timing(translateXUsername, {
    toValue: -460, // 向左移出屏幕
    duration: 500,
    useNativeDriver: true,
  });
  const movePasswordIn = Animated.timing(translateXPassword, {
    toValue: 0, // 从右侧进入屏幕
    duration: 500,
    useNativeDriver: true,
  });
  const animationSequence = Animated.sequence([moveUsernameOut, movePasswordIn]);
  useEffect(() => {
    AsyncStorage.clear()
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true //使用原生加速
    }).start()
  }, []);

  /**
   * 用户名输入框
   * @returns {JSX.Element}
   */
  const userInputBox = () => {
    return (
      <Animated.View
        style={{
          translateX: translateXUsername
        }}
      >
        <View className="bg-white mt-16 flex-row items-center px-3 py-1 w-full rounded-xl h-12" style={styles.boxShadow}>
          <Ionicons name='person-outline' size={25} color="gray"/>
          <View className="flex-1 pl-2">
            <TextInput placeholder="请输入用户名" value={userName} onChange={setUserName}></TextInput>
          </View>
        </View>
        <View className="flex-row justify-between">
          <Text className="mt-2">未注册账号将会自动注册</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home')
            }}
            className="flex-row justify-center items-center"
          >
            <Text className="text-blue-500 font-bold leading-8">
              跳过登录
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    )
  }

  /**
   * 密码输入框
   * @returns {JSX.Element}
   */
  const changeShowPassword = () => {
    Keyboard.dismiss()
  }
  const passwordInputBox = () => {
    return (
      <Animated.View
        style={{
          translateX: translateXPassword
        }}
      >
        <View
          className="
            relative
            bg-white
            mt-16
            flex-row
            items-center
            px-3
            py-1
            w-full
            rounded-xl
            h-12"
          style={styles.boxShadow}
        >
          <Ionicons name='lock-closed-outline' size={25} color="gray"/>
          <View className="flex-1">
            <PasswordInput
              value={password}
              onChangeSecureTextEntry={changeShowPassword}
              onChangeText={setPassword}
              placeholder={userState === 1? "请输入密码~": "请设置密码~"}
            ></PasswordInput>
          </View>
        </View>
        <View className="flex-row items-center pt-4 justify-between">
          <Text>{userState === 1?'老朋友，欢迎回来': '欢迎新朋友，将会为您自动注册！'}</Text>
          <TouchableOpacity
            onPress={() => {
              setUserName('')
              setPassword('')
              setUserState(0)
            }}
          >
            <Text className="text-blue-400 font-bold">输入用户名</Text>
          </TouchableOpacity>
        </View>

      </Animated.View>
    )
  }

  /**
   * 监听键盘事件
   */
  const [keyboardShow, setKeyboardShow] = useState(false)
  const [keyboardHeight, setKeyboardHeight] = useState(80);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardHeight(event.endCoordinates.height< 360? 360: event.endCoordinates.height);
      setKeyboardShow(true)
      // 在这里执行键盘弹起时的操作，比如调整界面布局等
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (event) => {
      setKeyboardHeight(80);
      setKeyboardShow(false)
      // 在这里执行键盘隐藏时的操作
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  useEffect(() => {
  }, [keyboardShow])

  /**
   * 总返回
   */
  return (
    <SafeAreaView className="h-full w-full">
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss()
        }}
      >
        <ImageBackground
          source={themeColor.primaryBgImg}
          resizeMode="cover"
          className="w-full min-h-screen absolute left-0 right-0 bottom-0 top-0"
        >
          <View className="h-full p-4 pb-0">
            {/* 顶部说明 */}
            <View
              className="mt-20"
            >
              <Text className="text-4xl font-bold text-center">
                👋 嗨
              </Text>
              <Text className="text-3xl font-bold text-center my-2">
                {welcomeText().welcome}<Text className="font-black" style={{color: themeColor.primary}}>文驿</Text>
              </Text>
              <Text className="text-2xl font-bold text-center my-1">
                {welcomeText().hope}传播中国传统文化
              </Text>
            </View>
            {/*用户名输入框*/}
            {
              userState === 0?
                userInputBox():passwordInputBox()
            }
            {/* 下一步按钮 */}
            <View className="absolute left-4 w-full h-14" style={{bottom: keyboardHeight}} >
              <TouchableOpacity
                className="h-12 justify-center items-center rounded-xl mb-4 transition-all"
                onPress={() => {
                  nextStep()
                }}
                disabled={!buttonState}
                style={{
                  backgroundColor: buttonState? themeColor.primary: themeColor.primaryDiabled,
                }}>
                <Text className="font-bold text-white text-xl" >{userState === 0? '下一步': '登录'}</Text>
              </TouchableOpacity>
              <Checkbox
                label="我已阅读并同意《文驿用户协议》与《文驿隐私协议》"
                value={checkProtocol}
                onChange={(value) => setCheckProtocol(value)}>
              </Checkbox>
            </View>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>

    </SafeAreaView>

  );
};

export default LoginScreen;
