import { View } from "native-base";
import React, { useState } from "react";
import { Animated, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { images } from "../assets/images";
import { Actionsheet, Box, useDisclose, Center } from "native-base";
import Movies from "../firebase/Raw/mata.json";
import { StyleSheet } from "react-native";
import { colors } from "./shared";
import Banner from "../assets/images/banner.png";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setVideoDownloadData, setVideoIdForDownload } from "../Redux/Slice/AppSlice";


const AnimatedScroll = ({ animateValue, loaded, setLoaded }) => {

    const [info, setInfo] = useState({})

    const { isOpen, onOpen, onClose } = useDisclose();

    const truncTxt = (txt) => {
        return txt?.length > 21 ? `${txt.substr(0, 21)}...` : txt
    }

    const dispatch = useDispatch();

    const navigation = useNavigation();

    return (
        <Animated.ScrollView
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: animateValue }}}],
                {useNativeDriver: false}
            )}>
            
            {loaded ? (
            <>
                    <View style={{ flex: 1 }}>
                        {/* <MobileNav /> */}
                        <Image 
                            source={Banner}
                            resizeMode={"contain"}
                            style={{
                                width: "100%",
                                height: 550,
                                elevation: -1,
                                marginTop: -50
                            }}
                        />
                    <View className="w-full items-center justify-center">
                        <View className="w-[79%] mt-[-50px] items-center flex-row justify-around mx-[18px] space-x-1">
                            <Text style={styles.menuTxt} className="text-[9px] text-[#D6D6D7]">Suspenseful</Text>
                            <Text style={styles.menuTxt} className="w-1 h-1 rounded-full bg-white"></Text>
                            <Text style={styles.menuTxt} className="text-[9px] text-[#D6D6D7]">Thriller</Text>
                            <Text style={styles.menuTxt} className="w-1 h-1 rounded-full bg-white"></Text>
                            <Text style={styles.menuTxt} className="text-[9px] text-[#D6D6D7]">Vintage Crime</Text>
                            <Text style={styles.menuTxt} className="w-1 h-1 rounded-full bg-white"></Text>
                            <Text style={styles.menuTxt} className="text-[9px] text-[#D6D6D7]">1970s</Text>
                            <Text style={styles.menuTxt} className="w-1 h-1 rounded-full bg-white"></Text>
                            <Text style={styles.menuTxt} className="text-[9px] text-[#D6D6D7]">Golden Globe</Text>
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
                            <TouchableOpacity className="rounded-[4px] justify-center items-center bg-slate-50 w-[108px] h-[42px] flex-row">
                                {/* Play Icon */}
                                <Image 
                                    source={images.PlayMain}
                                    className="w-[24px] h-[24px]"
                                    resizeMode="contain"
                                />
                                <Text style={styles.menuTxt} className="text-black text-[17px] font-semibold ml-[12px]">Play</Text>
                            </TouchableOpacity>
                            <View className="items-center">
                                {/* Share Icon */}
                                <Image 
                                    source={images.InfoMain}
                                    className="w-[24px] h-[24px]"
                                    resizeMode="contain"
                                />
                                <Text style={styles.menuTxt} className="text-white text-[9px] pt-[8px]">Info</Text>
                            </View>
                        </View>
                    </View>
                </>
                ) : (
                    <View className="animate-pulse w-full justify-center items-center mt-14" style={{ marginTop: 200}}>
                        <View className="rounded-sm bg-slate-900/60 h-[100px] w-[200px]"></View>
                        <View className="w-[300px] h-6 rounded-sm bg-slate-900/60 my-4"></View>
                        <View className="w-[250px] h-4 rounded-sm bg-slate-900/60 mb-12"></View>
                    </View>
                )}

                {Movies?.length ? Movies[0].category.map((item, index) => (
                        <View className="" key={index}>
                            <View className="my-[8px] ml-2">
                                <Text style={{
                                    fontFamily: "Stem-Medium"
                                }} className="text-[17px] text-white">{item.catTitle}</Text>
                            </View>
                            <ScrollView 
                                horizontal
                                contentContainerStyle={{
                                    // paddingBottom: 14
                                }}>
                                {item.data.map((item, index) => (
                                        <TouchableOpacity key={index} 
                                        onPress={() => {
                                            setInfo(item);
                                            onOpen();
                                        }}>
                                        <Image 
                                            source={{ uri: item.image }}
                                            resizeMode={"contain"}
                                            style={{
                                                width: 124,
                                                height: 176,
                                                marginHorizontal: 4,
                                                marginLeft: 8,
                                                borderRadius: 8
                                            }}
                                        />
                                        </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    ))
                : <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            <View className="ml-4 mb-4 w-40 bg-slate-900/60 h-4 rounded-md"></View>
                            <ScrollView horizontal className="animate-pulse">
                                <View className="w-[124px] rounded-md mx-4 h-[176px] bg-slate-900/60"></View>
                                <View className="w-[124px] rounded-md mx-4 h-[176px] bg-slate-900/60"></View>
                                <View className="w-[124px] rounded-md mx-4 h-[176px] bg-slate-900/60"></View>
                            </ScrollView>
                        </View>

                        <View>
                            <View className="ml-4 h-4 mt-8 mb-4 w-40 bg-slate-900/60 rounded-md"></View>
                            <ScrollView horizontal className="animate-pulse">
                                <View className="w-[124px] rounded-md mx-4 h-[176px] bg-slate-900/60"></View>
                                <View className="w-[124px] rounded-md mx-4 h-[176px] bg-slate-900/60"></View>
                                <View className="w-[124px] rounded-md mx-4 h-[176px] bg-slate-900/60"></View>
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
                                        source={{ uri: info.image }}
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
                                            <Text
                                            style={{ fontFamily: "Stem-Medium" }}
                                            className="text-[#98999B] text-[11px] mx-1">{info.director}</Text>
                                        </View>
                                        <Text
                                        style={{ fontFamily: "Stem-Medium" }}
                                        className="leading-4 w-[70%] text-white text-[11px]">{info.description}</Text>
                                    </View>
                                </View>
                                <View>
                                    <View className="w-full py-[12px] flex-row justify-around items-center">
                                        <TouchableWithoutFeedback onPress={() => navigation.navigate("video-screen", { data: info.trailer })}>
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
                                            dispatch(setVideoDownloadData({ data: info }))
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
                                                    className="text-white">Download</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
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

export default AnimatedScroll;