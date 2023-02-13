import { Skeleton, View, VStack } from "native-base";
import React, { useState } from "react";
import { Animated, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Actionsheet, Box, useDisclose, Center } from "native-base";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setVideoDownloadData, setVideoList, setCategoryDetailsPage } from "../Redux/Slice/AppSlice";
import { images } from "../assets/images";
import { colors } from "../components/shared";


const CatDetAnimScroll = ({ animateValue, isLoading, setIsLoading }) => {

    const [info, setInfo] = useState({})

    const { isOpen, onOpen, onClose } = useDisclose();

    const truncTxt = (txt) => {
        return txt?.length > 21 ? `${txt.substr(0, 21)}...` : txt
    }

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const videoList = useSelector((state) => state.data?.videoList);

    const categoryDetailsPage = useSelector((state) => state.data?.categoryDetailsPage);
    
    // console.log(categoryDetailsPage);

    return (
        <Animated.ScrollView
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: animateValue }}}],
                {useNativeDriver: false}
            )}>
            
            {!isLoading ? (
            <>
                    <View style={{ flex: 1 }}>
                        {/* <MobileNav /> */}
                        <Image 
                            source={{ uri: categoryDetailsPage?.videos[0]?.mobile_banner }}
                            resizeMode={"cover"}
                            style={{
                                width: "100%",
                                height: 550,
                                elevation: -1,
                                marginTop: -50
                            }}
                        />
                    <View className="w-full items-center justify-center">
                        <View className="w-[79%] mt-[-50px] items-center flex-row justify-around mx-[18px] space-x-1">
                            <Text style={styles.menuTxt} className="text-[9px] text-[#D6D6D7]">{categoryDetailsPage?.videos[0]?.mood[0]}</Text>
                            <Text style={styles.menuTxt} className="w-1 h-1 rounded-full bg-white"></Text>
                            <Text style={styles.menuTxt} className="text-[9px] text-[#D6D6D7]">{categoryDetailsPage?.videos[0]?.mood[1]}</Text>
                            <Text style={styles.menuTxt} className="w-1 h-1 rounded-full bg-white"></Text>
                            <Text style={styles.menuTxt} className="text-[9px] text-[#D6D6D7]">{categoryDetailsPage?.videos[0]?.genres[0]}</Text>
                            <Text style={styles.menuTxt} className="w-1 h-1 rounded-full bg-white"></Text>
                            <Text style={styles.menuTxt} className="text-[9px] text-[#D6D6D7]">{categoryDetailsPage?.videos[0]?.genres[1]}</Text>
                        </View>
                    </View>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <View className="flex-row justify-around mb-[47px] mt-[24px] w-[79%]">
                            <View className="items-center">
                                {/* My List icon */}
                                <Image
                                    source={images.AddRound}
                                    className="w-[24px] h-[24px]"
                                    resizeMode="contain"
                                />
                                <Text style={styles.menuTxt} className="text-white text-[9px] pt-[8px]">My List</Text>
                            </View>
                            <TouchableOpacity 
                            onPress={() => navigation.navigate("video-screen", { data: categoryDetailsPage.videos[0].video_link })}
                            className="rounded-[4px] justify-center items-center bg-slate-50 w-[108px] h-[42px] flex-row">
                                {/* Play Icon */}
                                <Image 
                                    source={images.PlayMain}
                                    className="w-[24px] h-[24px]"
                                    resizeMode="contain"
                                />
                                <Text style={styles.menuTxt} className="text-black text-[17px] font-semibold ml-[12px]">Play</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={() => {
                                onOpen();
                                setInfo(categoryDetailsPage.videos[0]);
                            }} className="items-center">
                                <Image
                                    source={images.InfoMain}
                                    className="w-[24px] h-[24px]"
                                    resizeMode="contain"
                                />
                                <Text style={styles.menuTxt} className="text-white text-[9px] pt-[8px]">Info</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
                ) : isLoading ? (
                    <View className="animate-pulse w-full justify-center items-center mt-14" style={{ marginTop: 200}}>
                        <Skeleton className="rounded-sm bg-slate-900/60 h-[100px] w-[200px]"></Skeleton>
                        <Skeleton className="w-[300px] h-6 rounded-sm bg-slate-900/60 my-4"></Skeleton>
                        <Skeleton className="w-[250px] h-4 rounded-sm bg-slate-900/60 mb-12"></Skeleton>
                    </View>
                ) : null}

                {!isLoading ? (
                        <View className="">
                            <View className="my-[8px] ml-2">
                                <Text style={{
                                    fontFamily: "Stem-Medium"
                                }} className="text-[17px] text-white">Trending</Text>
                            </View>
                            <ScrollView 
                                contentContainerStyle={{
                                    // paddingBottom: 14
                                    width: "100%"
                                }}>
                                    <View className="flex-wrap justify-center flex-row mx-[16px] w-full">
                                    {categoryDetailsPage ? categoryDetailsPage.videos.map((item, index) => (
                                        <TouchableOpacity key={index} 
                                                onPress={() => {
                                                    setInfo(item);
                                                    onOpen();
                                                }}>
                                                <Image 
                                                    source={{ uri: item.mobile_thumbnail }}
                                                    resizeMode={"contain"}
                                                    className="my-[6px] mx-[6px] h-[176px] w-[124px] rounded-[8px]"
                                                />
                                        </TouchableOpacity>
                                        )) : (
                                            <View key={index}>
                                                <Skeleton className="bg-slate-900/60 my-[6px] mx-[6px] h-[176px] w-[124px] rounded-[8px]"></Skeleton>
                                            </View>
                                    )}
                                    </View>
                            </ScrollView>
                        </View>
                    )
                : <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            <Skeleton className="ml-4 mb-4 w-40 bg-slate-900/60 h-4 rounded-md"></Skeleton>
                            <ScrollView horizontal className="">
                                <Skeleton className="w-[124px] rounded-md mx-4 h-[176px] bg-slate-900/60"></Skeleton>
                                <Skeleton className="w-[124px] rounded-md mx-4 h-[176px] bg-slate-900/60"></Skeleton>
                                <Skeleton className="w-[124px] rounded-md mx-4 h-[176px] bg-slate-900/60"></Skeleton>
                            </ScrollView>
                        </View>

                        <View>
                            <Skeleton className="ml-4 h-4 mt-8 mb-4 w-40 bg-slate-900/60 rounded-md"></Skeleton>
                            <ScrollView horizontal className="">
                                <Skeleton className="w-[124px] rounded-md mx-4 h-[176px] bg-slate-900/60"></Skeleton>
                                <Skeleton className="w-[124px] rounded-md mx-4 h-[176px] bg-slate-900/60"></Skeleton>
                                <Skeleton className="w-[124px] rounded-md mx-4 h-[176px] bg-slate-900/60"></Skeleton>
                            </ScrollView>
                        </View>
                    </ScrollView>
                }
                {/* Bottom Sheets */}

                <Center>
                    <Actionsheet isOpen={isOpen} onClose={onClose}>
                        <Actionsheet.Content style={{backgroundColor: colors.darkMode}}>
                            <View className="w-full p-5 items-center justify-center">
                                <View className="w-full items-center justify-start flex-row">
                                    <Image
                                        source={{ uri: info.mobile_thumbnail }}
                                        className="w-[100px] h-[139px] rounded-md"
                                        resizeMode={"contain"}
                                    />
                                    {/* <View className="w-[100px] h-[139px] bg-slate-200 rounded-md"></View> */}
                                    <View className="ml-5 justify-start h-full w-full">
                                        <Text 
                                        style={{
                                            fontFamily: "Stem-Medium"
                                        }}
                                        className="text-[17px] font-semibold text-white">{truncTxt(info?.title)}</Text>
                                        <View className="flex-row my-1">
                                            <Text
                                            style={{ fontFamily: "Stem-Medium" }}
                                            className="text-[#98999B] text-[11px] mx-1">{info.year}</Text>
                                            <Text
                                            style={{ fontFamily: "Stem-Medium" }}
                                            className="text-[#98999B] text-[11px] mx-1">{info.rating}</Text>
                                            {/* <Text
                                            style={{ fontFamily: "Stem-Medium" }}
                                            className="text-[#98999B] text-[11px] mx-1">{info.director}</Text> */}
                                        </View>
                                        <Text
                                        style={{ fontFamily: "Stem-Medium" }}
                                        className="leading-4 w-[70%] text-white text-[11px]">{info.description}</Text>
                                    </View>
                                </View>
                                <View>
                                    <View className="w-full py-[12px] flex-row justify-around items-center">
                                        <TouchableWithoutFeedback onPress={() => navigation.navigate("video-screen", { data: info.video_link })}>
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
                                            // dispatch(setVideoIdForDownload("BkL9l7qovsE"))
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
                                            dispatch(setVideoList(info))
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
        </Animated.ScrollView>
    )
}

const styles = StyleSheet.create({
    menuTxt: {
        fontFamily: "Stem-Medium"
    }
})

export default CatDetAnimScroll;