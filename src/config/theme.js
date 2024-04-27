import {Platform, StyleSheet} from "react-native";

export const themeColor = {
  primary: '#4a9aff',
  primaryDiabled: 'rgba(161,209,255,0.5)',
  primaryBgImg: require('../../assets/backGround.png'),
  mineDefaultBg: require('../../assets/defaultBack.jpg'),
  noAvatar: 'http://ivikey.top/server/image/noAvatar.png'
}
/**
 * 页面阴影
  */
export const boxShadow = (elevation = 5) => {
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
      elevation: elevation
    }
  }
  return styles
}
