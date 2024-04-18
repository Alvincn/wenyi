import React, {useEffect, useRef, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import {useNavigation, useRoute, useIsFocused, useNavigationState} from "@react-navigation/native";

const TabBar = ({ tabs, onTabPress, activeIndex }) => {
  const navigation = useNavigation()

  const borderPosition = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(borderPosition, {
      toValue: activeIndex *  width * (1.6),
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [activeIndex]);

  const renderTabs = () => {
    return tabs.map((tab, index) => {
      return (
        <TouchableOpacity
          key={tab.key}
          onPress={() => {
            onTabPress(index);
            Animated.timing(borderPosition, {
              toValue: index *  width * (tab.title.length / 1.8),
              duration: 200,
              useNativeDriver: true,
            }).start();
          }}
          style={[styles.tab]}
        >
          <Text style={[styles.fontStyle, activeIndex === index? styles.fontActive: null]}>
            {tab.title}
          </Text>

        </TouchableOpacity>
      );
    });
  };

  const width = 35; // 根据你的布局调整这个宽度

  return (
    <View style={styles.tabBar}>
      <View>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            width: width,
            left: 3,
            height: 4,
            backgroundColor: 'blue',
            borderRadius: 20,
            transform: [{ translateX: borderPosition }],
          }}
        />
      </View>
      {renderTabs()}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 35,
  },
  tab: {
    marginRight: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fontStyle: {
    fontSize: 17
  },
  fontActive: {
    fontWeight: 'bold',
    fontSize: 19
  }
});

export default TabBar;