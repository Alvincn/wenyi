import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RouterView from "./src/router/RouterView";
import { NavigationContainer } from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {Provider} from "@fruits-chain/react-native-xiaoshu";
export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <StatusBar style="auto"></StatusBar>
        <RouterView/>
      </NavigationContainer>
    </Provider>
  );
}
