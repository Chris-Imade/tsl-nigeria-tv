import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { images } from "../assets/images";
import { colors, ScreenWidth } from "../components/shared";
import movies from "../firebase/Raw/vid_data.json";

const Lists = () => {
    
    const [searchQuery, setSearchQuery] = useState("")

    const searchList = useSelector((state) => state.data.searchList);
    const videoList = useSelector((state) => state.data.videoList);

    const filteredList = videoList?.filter((item) => {
        return Object.values(item).join('').toLowerCase()?.includes(searchQuery?.toLowerCase());
    })
    
     return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.black, justifyContent: "center", alignItems: "center", paddingTop: Platform.OS == "android" ? 30 : 30 }}>
            {searchList && (
                <View className="flex-row w-full mx-[20px] items-center my-7">
                    <Image
                        source={images.SearchSmall}
                        resizeMode="contain"
                        className="w-[24px] h-[24px] ml-3"
                    />
                    <TextInput 
                        placeholder="Search from your list..."
                        placeholderTextColor={colors.white}
                        className="mx-[10px] py-3 text-white"
                        onChangeText={(text) => setSearchQuery(text)}
                    />
                </View>
            )}
                <ScrollView className="w-full">
                    <View className="flex-wrap justify-center flex-row mx-[16px] w-full">
                        {filteredList ? 
                        filteredList.map((item, index) => (
                            <View key={index}>
                                <Image
                                    source={{ uri: item.mobile_thumbnail }}
                                    className="my-[6px] mx-[6px] h-[176px] w-[124px] rounded-[8px]"
                                    resizeMode="contain"
                                />
                            </View>
                        )) : filteredList.map((item, index) => (
                            <View key={index}>
                                <View className="bg-slate-900/60 my-[6px] mx-[6px] h-[176px] w-[124px] rounded-[8px]"></View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
        </SafeAreaView>
     )
}

export default Lists;