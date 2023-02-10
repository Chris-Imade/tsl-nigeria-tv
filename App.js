import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import { useFonts } from 'expo-font';
import AppRoot from "./navigation/AppRoot";
import store from "./Redux/store";
import { News, Profile, VideoScreen, Welcome } from "./screens";
import Search from "./screens/Search";

  const App = () => {

    const [fontsLoaded] = useFonts({
      'Stem-Bold': require('./assets/fonts/Stem-Bold.ttf'),
      'Stem-ExtraLight': require('./assets/fonts/Stem-ExtraLight.ttf'),
      'Stem-Light': require('./assets/fonts/Stem-Light.ttf'),
      'Stem-Medium': require('./assets/fonts/Stem-Medium.ttf'),
      'Stem-Regular': require('./assets/fonts/Stem-Regular.ttf'),
      'Stem-SemiLight': require('./assets/fonts/Stem-SemiLight.ttf'),
      'Stem-Thin': require('./assets/fonts/Stem-Thin.ttf'),
    });


    if(!fontsLoaded) {
      return null;
    }


  return (
    <NavigationContainer>
      <Provider store={store}>
        <NativeBaseProvider>
         <AppRoot />
        </NativeBaseProvider>
      </Provider>
    </NavigationContainer>
  );
}


export default App;