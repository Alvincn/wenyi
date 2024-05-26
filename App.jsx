import { StatusBar } from 'expo-status-bar';
import RouterView from "./src/router/RouterView";
import { NavigationContainer } from '@react-navigation/native';
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
