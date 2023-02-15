import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import { useFonts } from 'expo-font';
import AppRoot from "./navigation/AppRoot";
import { News, Profile, VideoEnlongated, VideoScreen, Welcome } from "./screens";
import Search from "./screens/Search";
import { store, persistor } from "./Redux/store";
import { PersistGate } from 'redux-persist/integration/react';

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
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
         <AppRoot />
        </NativeBaseProvider>
      </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}


export default App;