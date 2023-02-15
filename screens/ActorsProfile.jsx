import { useNavigation } from "@react-navigation/native";
import { Actionsheet, Center, useDisclose, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { Image, TouchableHighlight, TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { ScrollView } from "react-native";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { images } from "../assets/images";
import { colors } from "../components/shared";
import { setVideoDownloadData } from "../Redux/Slice/AppSlice";

const ActorsProfile = (props) => {
    const { data } = props?.route?.params;

    const [actorsProfile, setActorsProfile] = useState();
    const accessToken = useSelector((state) => state.data.accessToken);
    const lightModeEnabled = useSelector((state) => state.data.lightModeEnabled);
    const { isOpen, onOpen, onClose } = useDisclose();
    const [errorResponseData, setErrorResponseData] = useState("");
    const [responseData, setResponseData] = useState("");
    const [isLoading, setIsLoading] = useState();
    const [info, setInfo] = useState();

    const navigation = useNavigation();

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
        getData(`https://web-production-93c3.up.railway.app/api/actors/${1}`)
        .then((data) => {
            // console.log(data);
            setActorsProfile(data);
                
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
    }, [data])


    return (
        <>
            {actorsProfile ? (
             <ScrollView contentContainerStyle={{
                paddingTop: 50, flex: 1, backgroundColor: lightModeEnabled ? colors.white : colors.black
             }}>
                <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                    <View className="items-center text-center mr-[16px]">
                        <Image 
                            source={{ uri: actorsProfile.image }}
                            style={{
                                width: 156,
                                height: 173
                            }}
                            resizeMode={"cover"}
                        />
                        <View className="mt-[8px]">
                            <Text style={{ fontFamily: "Stem-Medium", fontSize: 16, color: lightModeEnabled ? colors.black : colors.white }}>{actorsProfile.name}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontFamily: "Stem-Medium", color: "#545558", fontSize: 11 }}>About</Text>
                        <Text style={{ color: lightModeEnabled ? colors.black : colors.white }}>{actorsProfile.bio}</Text>
                    </View>
                </View>

                <View className="mt-[32px] mb-12">
                    <Text style={{ fontSize: 16, fontFamily: "Stem-Medium", color: "#F5F5F5", marginHorizontal: 20, marginBottom: 15 }}>Feature TVShows</Text>
                    <View className="flex-wrap justify-start flex-row mx-[16px] w-full">
                        {actorsProfile?._videos?.map((item, index) => (
                            <>
                                <TouchableHighlight onPress={() => {
                                    onOpen();
                                    setInfo(item)
                                }} key={index}>
                                    <Image
                                        source={{ uri: item?.mobile_thumbnail }}
                                        className="my-[6px] mx-[6px] h-[176px] w-[124px] rounded-[8px]"
                                        resizeMode="contain"
                                    />
                                </TouchableHighlight>
                            </>
                        ))}
                    </View>
                </View>
             </ScrollView>
            ) : (
                <></>
            )}
                <Center>
                    <Actionsheet isOpen={isOpen} onClose={onClose}>
                        <Actionsheet.Content style={{backgroundColor: colors.darkMode}}>
                            <View className="w-full p-5 items-center justify-center">
                                <Center style={{ justifyContent: "center", alignItems: "center" }}>
                                <TouchableOpacity 
                                onPress={() => navigation.navigate("video-elongated", { data: info?.id })}
                                className="w-full items-center justify-start flex-row"
                                >
                                    <Image
                                        source={{ uri: info?.mobile_thumbnail }}
                                        className="w-[100px] h-[139px] rounded-md"
                                        resizeMode={"contain"}
                                    />
                                    {/* <View className="w-[100px] h-[139px] bg-slate-200 rounded-md"></View> */}
                                    <View className="ml-5 justify-start h-full w-full">
                                        <Text
                                        style={{
                                            fontFamily: "Stem-Medium"
                                        }}
                                        className="text-[17px] font-semibold text-white">{info?.title}</Text>
                                        <View className="flex-row my-1">
                                            <Text
                                            style={{ fontFamily: "Stem-Medium" }}
                                            className="text-[#98999B] text-[11px] mx-1">{new Date(info?.date_uploaded).getFullYear()}</Text>
                                            <Text
                                            style={{ fontFamily: "Stem-Medium" }}
                                            className="text-[#98999B] text-[11px] mx-1">{info?.age_rating}</Text>
                                            {/* <Text
                                            style={{ fontFamily: "Stem-Medium" }}
                                            className="text-[#98999B] text-[11px] mx-1">{info.director}</Text> */}
                                        </View>
                                        <Text
                                        style={{ fontFamily: "Stem-Medium" }}
                                        className="leading-4 w-[70%] text-white text-[11px]">{info?.description}</Text>
                                    </View>
                                </TouchableOpacity>
                                </Center>
                                <View>
                                    <View className="w-full py-[12px] flex-row justify-around items-center">
                                        <TouchableWithoutFeedback onPress={() => navigation.navigate("video-elongated", { data: info.id })}>
                                            <View className="justify-center items-center">
                                                <Image 
                                                    source={images.PlayRound}
                                                    className="w-[37px] h-[37px] mb-[8px]"
                                                    resizeMode="contain"
                                                />
                                                <Text
                                                style={{ fontFamily: "Stem-Medium" }}
                                                className="text-white">Play</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={() => {
                                            navigation.navigate("Downloads");
                                            dispatch(setVideoDownloadData(info));
                                        }}>
                                            <View className="justify-center items-center opacity-[0.5]">
                                                <Image 
                                                    source={images.DownloadRound}
                                                    className="w-[37px] h-[37px] mb-[8px]"
                                                    resizeMode="contain"
                                                />
                                                <Text
                                                    style={{ fontFamily: "Stem-Medium" }}
                                                    className="text-white">Download
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={() => {
                                            // dispatch(setVideoList(info))
                                        }}>
                                            <View className="justify-center items-center opacity-[0.5]">
                                                <Image 
                                                    source={images.AddRound}
                                                    className="w-[37px] h-[37px] mb-[8px]"
                                                    resizeMode="contain"
                                                />
                                                <Text
                                                style={{ fontFamily: "Stem-Medium" }}
                                                className="text-white">Playlist</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <View className="justify-center items-center opacity-[0.5]">
                                            <Image 
                                                source={images.ShareRound}
                                                className="w-[37px] h-[37px] mb-[8px]"
                                                resizeMode="contain"
                                            />
                                            <Text
                                            style={{ fontFamily: "Stem-Medium" }}
                                            className="text-white">Share</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>            
                        </Actionsheet.Content>
                    </Actionsheet>
                </Center>

        </>
    )
}

export default ActorsProfile;