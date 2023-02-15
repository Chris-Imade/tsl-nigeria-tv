import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { TouchableHighlight } from "react-native";
import { Image, Platform, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import WebView from "react-native-webview";
import { useSelector } from "react-redux";
import { images } from "../assets/images";
import { colors, ScreenHeight, ScreenWidth } from "../components/shared";
import { setVideoList } from "../Redux/Slice/AppSlice";

const VideoEnlongated = (props) => {
    const [errorResponseData, setErrorResponseData] = useState("");
    const [responseData, setResponseData] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { data } = props.route.params;
    const [localData, setLocalData] = useState({});
    const [showDetailedMenu, setShowDetailedMenu] = useState(false); 
    const [id,setId] = useState(data);
    console.log(localData);
    
    const lightModeEnabled = useSelector((state) => state.data.lightModeEnabled);
    const accessToken = useSelector((state) => state.data.accessToken);

    const navigation = useNavigation();

    const embedURI = `https://www.youtube.com/embed/${localData.video_link}`;


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
        getData(`https://web-production-93c3.up.railway.app/api/videos/${id}`)
        .then((data) => {
            // console.log(data);
            setLocalData(data);
                
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
    }, [data, id])



    return (
        <>
            <ScrollView style={{ flex: 1, backgroundColor: lightModeEnabled ? colors.white : colors.black }}>
            <SafeAreaView>
                <View  className="h-[220px]">
                    {localData && (
                        <WebView 
                            allowsFullscreenVideo={true}
                            javaScriptEnabled={true}
                            allowsBackForwardNavigationGestures
                            mediaPlaybackRequiresUserAction={((Platform.OS !== 'android') || (Platform.Version >= 17)) ? false : undefined}
                            scrollEnabled={false}
                            source={{ uri: embedURI }} 
                            style={{ 
                                width: ScreenWidth,
                                height: "100%",
                            }} 
                            
                        />
                    )}
                </View>
                <View style={{ marginLeft: 20, marginTop: 8, marginBottom: 32 }}>
                    <Text style={{ fontFamily: "Stem-Medium", fontSize: 25, color: lightModeEnabled ? colors.black : colors.trueWhite }}>{localData?.title}</Text>
                </View>
                <View>
                    <View style={{ flexDirection: "row",marginLeft: 20, marginBottom: 8  }}>
                        <Text style={{ color: lightModeEnabled ? colors.black : colors.white, fontSize: 11, fontFamily: "Stem-Medium", marginRight: 12 }}>{new Date(localData?.date_uploaded).getFullYear()}</Text>
                        <Text style={{ color: lightModeEnabled ? colors.black : colors.white, fontSize: 11, fontFamily: "Stem-Medium", marginRight: 12 }}>{new Date(localData?.date_uploaded).getDay()+"th"}</Text>
                        <Text style={{ color: lightModeEnabled ? colors.black : colors.white, fontSize: 11, fontFamily: "Stem-Medium" }}>{localData.rating}</Text>
                    </View>
                    <View className="justify-center items-center">
                        <TouchableWithoutFeedback onPress={() => navigation.navigate("video-screen" , { data: localData.video_link })}>
                            <View style={{
                                width: "95%", 
                                paddingVertical: 17,
                                borderRadius: 12,
                                height: 55,
                            }} className="flex-row justify-center items-center bg-white">
                                <Image 
                                    source={images.PlayMainArr}
                                    style={{
                                        width: 24,
                                        height: 24
                                    }}
                                    resizeMode={"contain"}
                                />
                                <Image 
                                    source={images.PlayMainDet}
                                    style={{
                                        width: 36,
                                        height: 23
                                    }}
                                    resizeMode={"contain"}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View style={{
                                width: "95%", 
                                paddingVertical: 17,
                                borderRadius: 12,
                                borderWidth: 1.5, 
                                borderStyle: "solid", 
                                borderColor: colors.grayMedium,
                                height: 55,
                                marginTop: 16
                            }} className="flex-row justify-center items-center bg-[#191A1C]">
                                <Image 
                                    source={images.DownloadDetails}
                                    style={{
                                        width: 24,
                                        height: 24,
                                        marginRight: 8
                                    }}
                                    resizeMode={"contain"}
                                />
                                <Text style={{
                                    color: "#F5F5F5",
                                    fontFamily: "Stem-Medium",
                                    fontSize: 17
                                }}>Download</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View className="leading-[16px]" style={{ marginHorizontal: 20, marginTop: 20 }}>
                        <Text style={{ fontFamily: "Stem-Regular", fontSize: 13, color: lightModeEnabled ? colors.black : colors.white }}>{localData.description}</Text>
                        <TouchableWithoutFeedback onPress={() => setShowDetailedMenu(true)}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                <Text style={{ color: lightModeEnabled ? colors.black : colors.white }}>Staring: </Text>
                                {localData?.actors?.map((item, index) => (
                                    <Text style={{ marginHorizontal: 10, color: lightModeEnabled ? colors.black : colors.white }} key={index}>{item.name}</Text>
                                ))}
                                <Text style={{ color: lightModeEnabled ? colors.black : colors.white }}>...more</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={{  }}>
                            <Text style={{ fontFamily: "Stem-Medium", fontSize: 16, color: lightModeEnabled ? colors.black : colors.white }}>Director: <Text>Kevwe Modupke</Text></Text>
                        </View>
                    </View>
                    <View className="mt-8" style={{ width: ScreenWidth, justifyContent: "center", alignItems: "center" }}>
                        <View style={{ width: 264, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <TouchableOpacity onPress={() => dispatch(setVideoList(localData))} style={{ alignItems: "center", justifyContent: "center" }}>
                                <Image source={images.AddToList} style={{ width: 24, height: 24 }} resizeMode={"contain"} />
                                <Text style={{ fontSize: 9, fontFamily: "Stem-Medium", color: colors.white }}>My List</Text>
                            </TouchableOpacity>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Image source={images.Star} style={{ width: 24, height: 24 }} resizeMode={"contain"} />
                                <Text style={{ fontSize: 9, fontFamily: "Stem-Medium", color: colors.white }}>Rate</Text>
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Image source={images.Share} style={{ width: 24, height: 24 }} resizeMode={"contain"} />
                                <Text style={{ fontSize: 9, fontFamily: "Stem-Medium", color: colors.white }}>Share</Text>
                            </View>
                        </View>
                    </View>                
                </View>
                <View style={{ marginTop: 64 }}>
                    <View style={{ width: ScreenWidth, backgroundColor: "#1E1E1E", height: 3 }}></View>
                    <Text style={{ marginLeft: 20, fontSize: 15, fontFamily: "Stem-Medium", paddingVertical: 12, borderStyle: "solid", borderTopWidth: 5, color: colors.trueWhite, borderTopColor: colors.companyGreen, width: 125 }}>MORE LIKE THIS</Text>
                </View>
                <View>
                    <ScrollView className="w-full">
                        <View className="flex-wrap justify-center flex-row mx-[16px] w-full">
                            {localData?.more_like_this?.map((item, index) => (
                                <TouchableHighlight onPress={() => setId(item.id)} key={index}>
                                    <Image
                                        source={{ uri: item?.mobile_thumbnail }}
                                        className="my-[6px] mx-[6px] h-[176px] w-[124px] rounded-[8px]"
                                        resizeMode="contain"
                                    />
                                </TouchableHighlight>
                            ))}
                        </View>
                    </ScrollView>
                </View>
                
                
            </SafeAreaView>
        </ScrollView>
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
                        }}>Actors</Text>
                        <ScrollView contentContainerStyle={{
                            alignItems: "center",
                            marginVertical: 20
                        }}>
                            {localData.actors.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => {
                                    navigation.navigate("actors-profile", { data: item.id })
                                }} className="mt-[33px]"><Text style={{ color: lightModeEnabled ? colors?.black : "#98999B", fontFamily: "Stem-Medium", fontSize: 16 }}>{item.name}</Text></TouchableOpacity>
                            ))}
                        </ScrollView>
                        <View className="absolute" style={{ top: ScreenHeight - 300 }}>
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
        </>
    )
}

export default VideoEnlongated;