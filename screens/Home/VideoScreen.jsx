import React, { useEffect, useRef } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { colors } from "../../components/shared";
import movies from "../../firebase/Raw/vid_data.json";
// import * as ScreenOrientation from 'expo-screen-orientation';
import { WebView } from "react-native-webview";

const VideoScreen = (props) => {
    const { data } = props.route.params;

    const playerRef = useRef();

    // const baseUrl = "https://www.youtube.com/watch?v="


    // const changeScreenOrientation = async() => {
    //     await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    // }

    // useEffect(() => {
    //     changeScreenOrientation();
    // }, [ScreenOrientation])"
    let videoData = "https://www.youtube.com/embed/sfbUL_0ugkk";

    return (
        <ScrollView className="bg-black flex-1">
            <View className="flex-1">
                <WebView source={{ uri: data }} style={{ 
                    width: "100%",
                    height: 300
                }} />
            </View>
            <View className="flex-[1.1] py-5">
                <ScrollView>
                    {movies.map((item, index) => (
                        <View key={index} className="mx-[20px] flex-row">
                            <View className="bg-slate-900/60 h-[69px] w-[127px] rounded-[4px] mr-[16px] mb-[20px]"></View>
                            <View>
                                <View className="bg-slate-900/60 w-48 h-4 mb-2"></View>
                                <View className="bg-slate-900/60 w-32 h-4"></View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black
    }
})

export default VideoScreen;