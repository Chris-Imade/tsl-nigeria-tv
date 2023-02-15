import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Platform, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Animated, SafeAreaView, TouchableHighlight, ImageBackground, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AnimatedScroll, MobileNav } from "../../components";
import { colors, ScreenHeight, ScreenWidth } from "../../components/shared";
import { useNavigation } from "@react-navigation/native";
import * as ScreenOrientation from 'expo-screen-orientation';
import { images } from "../../assets/images";
import { setCategories, setVideoId } from "../../Redux/Slice/AppSlice";

const Home = () => {
    const [errorResponseData, setErrorResponseData] = useState("");
    const [responseData, setResponseData] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    
    const [loaded, setLoaded] =  useState(false);    
    
    const navigation = useNavigation();
    
    const [showDetailedMenu, setShowDetailedMenu] = useState(false);    



    const lightModeEnabled = useSelector((state) => state?.data?.lightModeEnabled);
    const categories = useSelector((state) => state?.data?.categories);

    const accessToken = useSelector((state) => state.data.accessToken);
    
    const animateValue = useRef(new Animated.Value(0)).current;
    
    const dispatch = useDispatch();
    
    // Animated Heights
    const MIN_HEIGHT = 75;
    const MAX_HEIGHT = 130;
    const SCROLL_VALUE = MAX_HEIGHT - MIN_HEIGHT;

    const animatedHeight = animateValue.interpolate({
        inputRange: [0, SCROLL_VALUE],
        outputRange: [MAX_HEIGHT, MIN_HEIGHT],
        extrapolate: "clamp"
    });
    
    // Animated Background color
    const animatedBackground = animateValue.interpolate({
        inputRange: [0, SCROLL_VALUE],
        outputRange: ["#00000041", "#000000b6"],
        extrapolate: "clamp"
    })
    
    const getData = async(url = '') => {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Token ${accessToken}`
            }// body data type must match "Content-Type" header
            });
            
            
        return response.json(); // parses JSON response into native JavaScript objects
    
        // console.log("Happy Coding --->!");
    }

    useEffect(() => {
        getData(`https://web-production-93c3.up.railway.app/api/categories`)
        .then((data) => {
            // console.log(data);
            dispatch(setCategories(data));
                
                if(data) {
                    setIsLoading(false);
                    // console.log("<------------ Data is returned ----------------->");
                } else {
                    // console.log("What could go wrong?")
                }

            // console.log("<------------ ErrorResponseD            ata ----------------->", errorResponseData);
        }).catch((error) => {
            setIsLoading("false");
            setErrorResponseData(error.message);
        });
    }, [])


    return (
        <View style={[styles.container, {
            backgroundColor: "#000"
        }]} className="">

        {/* <View style={{
            width: "100%",
            height: 45,
            backgroundColor: "green",
            position: "absolute",
            top: 30,
            left: 0,
            zIndex: 1
        }}></View> */}

        <Animated.View style={{
                height: animatedHeight,
                overflow: "hidden",
                backgroundColor: animatedBackground,
                position: "absolute",
                top: 20,
                left: 0,
                zIndex: 1,
                elevation: 1
            }}>
                <View 
                    className="flex-row justify-between items-center h-[75px]">
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                width: ScreenWidth - 20,
                                // marginHorizontal: 20,
                                alignItems: "center",
                            }} 
                            className="ml-5"
                        >
                        {/* Logo */}
                        <Image 
                            source={images.TSLFullLogo}
                            style={{
                                width: 114,
                                height: 38
                            }}
                            resizeMode={"contain"}
                        />
                    {/* Search and profile icons */}
                        <View
                            className="flex-row">
                                <TouchableOpacity 
                                onPress={() => navigation.navigate("search-screen")}
                                className="mr-[26px] w-[28px] h-[28px]">
                                    <Image
                                        source={images.SearchSmall}
                                        style={{
                                            width: 24,
                                            height: 24,
                                        }}
                                    />
                                </TouchableOpacity>

                                <TouchableWithoutFeedback onPress={() => navigation.navigate("profile-screen")}>
                                    <Image 
                                        source={images.MaleProfile}
                                        resizeMode="contain"
                                        className="w-[28px] h-[28px] mr-[26px]"
                                    />
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                </View>



                <View 
                    className={`flex-row justify-around items-center shadow-md`} style={{ }}>
                    <View
                        className="flex-row justify-around w-full mb-5"
                    >
                        <TouchableWithoutFeedback onPress={() => setShowDetailedMenu(true)}>
                            <Text style={styles.menuTxt} className="text-white">TV Shows</Text>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => setShowDetailedMenu(true)}>
                            <Text style={styles.menuTxt} className="text-white">Categories</Text>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => navigation.navigate("lists-screen")}>
                            <Text style={styles.menuTxt} className="text-white">My List</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Animated.View> 


            {/* <DynamicHeader animatedValue={scrollOffsetY} /> */}
            {/* Main navbar */}
            <AnimatedScroll 
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                animateValue={animateValue} 
            />
            
            {/* Menu Selection Overlay/Modal */}
            {showDetailedMenu && (
                <View 
                    className="bg-[#000000dc]"
                    style={{
                        position: "absolute",
                        width: ScreenWidth,
                        height: ScreenHeight - 100,
                        top: 0,
                        left: 0,
                        elevation: 50,
                        zIndex: 50,
                        justifyContent: "space-around",
                        alignItems: "center"
                    }}>
                        <Text style={{
                            color: lightModeEnabled ? colors?.black : colors?.white,
                            marginTop: 100,
                            fontFamily: "Stem-Medium",
                            fontSize: 21
                        }}>All Categories</Text>
                        <ScrollView contentContainerStyle={{
                            alignItems: "center",
                            marginVertical: 20
                        }}>
                            {categories.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => {
                                    dispatch(setVideoId(item.id));
                                    setShowDetailedMenu(false);
                                    navigation.navigate("category-details")
                                }} className="mt-[33px]"><Text style={{ color: lightModeEnabled ? colors?.black : "#98999B", fontFamily: "Stem-Medium", fontSize: 16 }}>{item.name}</Text></TouchableOpacity>
                            ))}
                        </ScrollView>
                        <View>
                            <TouchableHighlight
                                className="flex justify-center items-center bg-white h-14 w-14 rounded-full"
                                onPress={() => setShowDetailedMenu(false)}>
                                <Image 
                                        source={images.MainClose}
                                        style={{
                                            width: 20,
                                            height: 20
                                        }}
                                        resizeMode={"contain"}
                                    />
                            </TouchableHighlight>
                        </View>
                </View>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "ios" ? null : 25,
        paddingBottom: 30
    },
    menuTxt: {
        fontFamily: "Stem-Regular"
    }
})

export default Home;