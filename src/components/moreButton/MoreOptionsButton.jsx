import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {Ionicons} from "@expo/vector-icons";

const MoreOptions = () => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [optionsPosition, setOptionsPosition] = useState({ top: 0, right: 0 });
  const buttonRef = useRef(null);

  const handleToggleOptions = () => {
    if (buttonRef.current) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        setOptionsPosition({ top:  height, right: 0 });
      });
    }
    setOptionsVisible(!optionsVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleToggleOptions}
        ref={buttonRef}
        className="flex-col items-center"
      >
        <Ionicons name="ellipsis-vertical" size={25}/>
      </TouchableOpacity>

      {optionsVisible && (
        <View style={[styles.optionsContainer, { top: optionsPosition.top, right: optionsPosition.right }]}>
          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionText}>选项 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionText}>选项 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionText}>选项 3</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  moreButton: {
    fontSize: 24,
  },
  optionsContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 100,
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  optionItem: {
    paddingVertical: 5,
  },
  optionText: {
    fontSize: 16,
  },
});

export default MoreOptions;
