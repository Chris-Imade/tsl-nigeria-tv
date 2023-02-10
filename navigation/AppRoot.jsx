import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from '../components/shared';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { Downloads, Home, Lists, Login, News, Notification, Profile, SignUp, VideoScreen, Welcome } from '../screens';
import Search from '../screens/Search';
import { TouchableHighlight } from 'react-native';
import { Image } from 'react-native';
import { images } from '../assets/images';
import { setSearchList, setSearchNotification } from '../Redux/Slice/AppSlice';


const AppStack = createNativeStackNavigator();

const AppStackScreen = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={() => ({
                "headerShown": false
            })}>
                {/* All available screen */}
                <AppStack.Screen name='home-screen' component={Home} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}


const RootStack = createNativeStackNavigator();

const HomeStack = () => {

    const navigation = useNavigation();

    const lightModeEnabled = useSelector((state) => state.data.lightModeEnabled);

    const dispatch = useDispatch();


  return (
        <RootStack.Navigator screenOptions={() => ({})}>
            {/* All the Home related screens */}
            <RootStack.Screen options={{
                headerShown: false
            }} name='home-screen' component={Home} />
            <RootStack.Screen  
            options={{
                headerTintColor: colors.white,
                headerStyle: {
                    backgroundColor: colors.black
                },
                headerTitleStyle: {
                    color: "transparent"
                }
            }}
            name='video-screen' component={VideoScreen} />
            <RootStack.Screen options={{
                headerTitleStyle: {
                    color: "transparent",
                },
                headerRight: () => (
                    <TouchableHighlight onPress={() => navigation.navigate("profile-screen")}>
                        <Image 
                            source={images.MaleProfile}
                            style={{
                                width: 24,
                                height: 24,
                                marginRight: 20
                            }}
                            resizeMode={"contain"}
                        />
                    </TouchableHighlight>
                ),
                headerStyle: {
                    backgroundColor: colors.black,
                },
                headerTintColor: colors.white
            }} name='search-screen' component={Search} />
            <RootStack.Screen options={{
                headerStyle: {
                    backgroundColor: colors.black
                },
                headerTitle: "Profile",
                headerTintColor: colors.white
            }} name='profile-screen' component={Profile} />
            <RootStack.Screen options={{
                headerStyle: {
                    backgroundColor: colors.black
                },
                headerTitle: "Lists",
                headerTintColor: colors.white,
                headerRight: () => (
                    <TouchableHighlight onPress={() => dispatch(setSearchList())}>
                        <Image 
                            source={images.SearchSmall}
                            className="w-[24px] h-[24px]"
                            resizeMode='contain'
                        />
                </TouchableHighlight>
                )
            }} name='lists-screen' component={Lists} />
            <RootStack.Screen options={{
                headerStyle: {
                    backgroundColor: colors.black
                },
                headerTitle: "Notification",
                headerTintColor: colors.white,
                headerRight: () => (
                    <TouchableHighlight onPress={() => dispatch(setSearchNotification())}>
                        <Image 
                            source={images.SearchSmall}
                            className="w-[24px] h-[24px]"
                            resizeMode='contain'
                        />
                </TouchableHighlight>
                )
            }} name='notification-screen' component={Notification} />
        </RootStack.Navigator>
  )
}


const StackProfile = createNativeStackNavigator();

const ProfileStack = () => {

    const lightModeEnabled = useSelector((state) => state.data.lightModeEnabled);

    return (
        <StackProfile.Navigator>
            {/* All the profile related screens */}
        </StackProfile.Navigator>
    )
}




const Auth = createNativeStackNavigator();

const AuthStack = () => {

    const lightModeEnabled = useSelector((state) => state.data.lightModeEnabled);

    return (
        <Auth.Navigator initialRouteName='Welcome' screenOptions={() => ({
            // "headerShown": false
            headerTitle: "",
            headerTintColor: lightModeEnabled ? colors.black : colors.white,
            headerStyle: {
                backgroundColor: lightModeEnabled ? colors.white : colors.black
            }
        })}>
            {/* All the auth related screens */}
            <Auth.Screen name="Login" component={Login} />
            <Auth.Screen name="SignUp" component={SignUp} />
            <Auth.Screen
            options={{
                headerShown: false
            }}
            name="Welcome" component={Welcome} />
        </Auth.Navigator>
    )
}




const Tab = createBottomTabNavigator();

const HomeApp = () => {

    const lightModeEnabled = useSelector((state) => state.data.lightModeEnabled);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {

                    if(route.name == "Home") {
                        return focused ? 
                        <Image 
                            style={{
                                width: 24,
                                height: 24
                            }}
                            resizeMode={"contain"}
                            source={images.HomeFilled} 
                        /> : 
                        <Image 
                            style={{
                                width: 24,
                                height: 24
                            }}
                            resizeMode={"contain"}
                            source={images.HomeOutline} 
                        />;
                    } else if (route.name === "Hot & Spicy") {
                        return focused ? 
                        <Image 
                            style={{
                                width: 24,
                                height: 24
                            }}
                            resizeMode={"contain"}
                            source={images.VideoFilled} 
                        /> : 
                        <Image 
                            style={{
                                width: 24,
                                height: 24
                            }}
                            resizeMode={"contain"}
                            source={images.videoOutline} 
                        />;
                    } else if(route.name === "Downloads") {
                        return focused ? 
                        <Image 
                            style={{
                                width: 24,
                                height: 24
                            }}
                            resizeMode={"contain"}
                            source={images.DownloadFilled} 
                        /> : 
                        <Image 
                            style={{
                                width: 24,
                                height: 24
                            }}
                            resizeMode={"contain"}
                            source={images.DownloadOutline} 
                        />;
                    } else {
                        return null
                    }
                   
                },
                "tabBarActiveTintColor": colors.white,
                "tabBarInactiveTintColor": lightModeEnabled ? colors.darkGray : "#323337",
                "tabBarStyle": [{
                    "display": "flex",
                    "justifyContent": "center",
                    "alignItems": "space-around",
                    "paddingBottom": 10,
                    "height": 60,
                    "backgroundColor": lightModeEnabled ? colors.white : colors.black,
                    "borderTopWidth": 0,
                    "elevation": 0
                }, null],
                "headerShown": false,
            })}
        >
            {/* All the tab related screens */}
            <Tab.Screen name='Home' component={HomeStack} />
            <Tab.Screen name='Hot & Spicy' component={News} />
            <Tab.Screen name='Downloads' component={Downloads} />
            {/* <Tab.Screen name='Profile' component={ProfileStack} /> */}
        </Tab.Navigator>
    )
}

const AppRoot = () => {
    const accessToken = useSelector((state) => state.data.accessToken);
    // let accessToken = "sfsdfafaf";
    const [userToken, setUserToken] = useState("");


    useEffect(() => {
        setUserToken(accessToken);
    }, [accessToken])


    return (
            <AppStack.Navigator screenOptions={() => ({
                "headerShown": false,
            })}>
                {
                    userToken ? (
                        <AppStack.Screen name='HomeTabs' component={HomeApp} />
                        ) : (
                        <AppStack.Screen name='AuthStack' component={AuthStack} />
                    )
                }
            </AppStack.Navigator>
        )
}

export default AppRoot;