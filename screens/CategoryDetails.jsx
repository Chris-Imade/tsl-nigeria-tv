import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Platform, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Animated, SafeAreaView, TouchableHighlight, ImageBackground, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AnimatedScroll, MobileNav } from "./";
import { useNavigation } from "@react-navigation/native";
import * as ScreenOrientation from 'expo-screen-orientation';
import { images } from "../assets/images";
import { setCategoryDetailsPage, setVideoId } from "../Redux/Slice/AppSlice";
import CatDetAnimScroll from "./CatDetAnimScroll";
import { ScreenWidth, colors, ScreenHeight } from "../components/shared";

const CategoryDetails = () => {
    const [errorResponseData, setErrorResponseData] = useState("");
    const [responseData, setResponseData] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    
    
    const navigation = useNavigation();
    
    const [showDetailedMenu, setShowDetailedMenu] = useState(false);    



    const lightModeEnabled = useSelector((state) => state?.data?.lightModeEnabled);
    const categories = useSelector((state) => state?.data?.cateogries);
    const videoId = useSelector((state) => state?.data?.videoId);
    
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
        outputRange: ["#00000012", "#00000088"],
        extrapolate: "clamp"
    })
    

    useEffect(() => {
        
        const getData = async(url = '') => {
            // Default options are marked with *
            const response = await fetch(url, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: 'Token 818fbb131c82e940cb22b8b348dc430af391d4d7'
                }// body data type must match "Content-Type" header
                });
                
                
            return response.json(); // parses JSON response into native JavaScript objects
        
            // console.log("Happy Coding --->!");
        }

        getData(`https://web-production-93c3.up.railway.app/api/categories/${videoId}`)
        .then((data) => {
            // console.log(data);
            dispatch(setCategoryDetailsPage(data));
                
                if(data) {
                    setIsLoading(false);
                    // console.log("<------------ Data is returned ----------------->");
                } else {
                    // console.log("What could go wrong?")
                }

            // console.log("<------------ ErrorResponseData ----------------->", errorResponseData);
        }).catch((error) => {
            setIsLoading("false");
            setErrorResponseData(error.message);
        });
    }, [videoId])


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
                            // colors={[colors.black, colors.firstGradientShade]}
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
                    <View className={`w-[48px] h-[48px] bg-slate-100`}></View>
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
                        <TouchableWithoutFeedback>
                            <Text style={styles.menuTxt} className="text-white"></Text>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback>
                            <Text style={styles.menuTxt} className="text-white"></Text>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback>
                            <Text style={styles.menuTxt} className="text-white"></Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Animated.View> 


            {/* <DynamicHeader animatedValue={scrollOffsetY} /> */}
            {/* Main navbar */}
            <CatDetAnimScroll 
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

export default CategoryDetails;