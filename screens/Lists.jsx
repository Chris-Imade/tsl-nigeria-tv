import { useNavigation } from "@react-navigation/native";
import { Actionsheet, Center, useDisclose } from "native-base";
import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { images } from "../assets/images";
import { colors, ScreenWidth } from "../components/shared";
import movies from "../firebase/Raw/vid_data.json";

const Lists = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchList = useSelector((state) => state.data.searchList);
  const videoList = useSelector((state) => state.data.videoList);

  const [info, setInfo] = useState({});

  const { isOpen, onOpen, onClose } = useDisclose();

  const navigation = useNavigation();

  const truncTxt = (txt) => {
    return txt?.length > 21 ? `${txt.substr(0, 21)}...` : txt;
  };

  const filteredList =
    videoList &&
    videoList.filter((item) => {
      return Object.values(item)
        .join("")
        .toLowerCase()
        ?.includes(searchQuery?.toLowerCase());
    });

    if(filteredList.length === 0) {
      return (
        
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: colors.black,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: Platform.OS == "android" ? 30 : 30,
          }}
        >
          <View
          style={{
            borderWidth: 2,
            borderColor: "#545558",
            borderStyle: "dashed",
            marginHorizontal: 28,
            paddingVertical: 23,
            paddingHorizontal: 19,
            width: ScreenWidth - 40,
          }}
        >
          <Text
            style={{
              width: ScreenWidth - 80,
              fontFamily: "Stem-Regular",
              fontSize: 12,
              lineHeight: 13,
            }}
            className="text-white"
          >
            You have no items on your list right now. 
            come back later.
          </Text>
        </View>
        </SafeAreaView>
      )
    } else {
      return (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: colors.black,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: Platform.OS == "android" ? 30 : 30,
          }}
        >
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
            <View className="flex-wrap-reverse justify-start flex-row mx-[16px] w-full">
              {filteredList
                ? filteredList?.map((item, index) => (
                    <TouchableNativeFeedback
                      onPress={() => {
                        setInfo(item);
                        onOpen();
                      }}
                      key={index}
                    >
                      <Image
                        source={{ uri: item.mobile_thumbnail }}
                        className="my-[6px] mx-[6px] h-[176px] w-[124px] rounded-[8px]"
                        resizeMode="contain"
                      />
                    </TouchableNativeFeedback>
                  ))
                : filteredList.map((item, index) => (
                    <View key={index}>
                      <View className="bg-slate-900/60 my-[6px] mx-[6px] h-[176px] w-[124px] rounded-[8px]"></View>
                    </View>
                  ))}
            </View>
          </ScrollView>
    
          <Center>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
              <Actionsheet.Content style={{ backgroundColor: colors.darkMode }}>
                <View className="w-full p-5 items-center justify-center">
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("video-elongated", { data: info.id })
                    }
                    className="w-full items-center justify-start flex-row"
                  >
                    <Image
                      source={{ uri: info.mobile_thumbnail }}
                      className="w-[100px] h-[139px] rounded-md"
                      resizeMode={"contain"}
                    />
                    {/* <View className="w-[100px] h-[139px] bg-slate-200 rounded-md"></View> */}
                    <View className="ml-5 justify-start h-full w-full">
                      <Text
                        style={{
                          fontFamily: "Stem-Medium",
                        }}
                        className="text-[17px] font-semibold text-white"
                      >
                        {truncTxt(info?.title)}
                      </Text>
                      <View className="flex-row my-1">
                        <Text
                          style={{ fontFamily: "Stem-Medium" }}
                          className="text-[#98999B] text-[11px] mx-1"
                        >
                          {info.year}
                        </Text>
                        <Text
                          style={{ fontFamily: "Stem-Medium" }}
                          className="text-[#98999B] text-[11px] mx-1"
                        >
                          {info.rating}
                        </Text>
                        {/* <Text
                                            style={{ fontFamily: "Stem-Medium" }}
                                            className="text-[#98999B] text-[11px] mx-1">{info.director}</Text> */}
                      </View>
                      <Text
                        style={{ fontFamily: "Stem-Medium" }}
                        className="leading-4 w-[70%] text-white text-[11px]"
                      >
                        {info.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View className="w-full justify-center items-center">
                    <View className="w-full py-[12px] flex-row justify-around items-center">
                      <TouchableWithoutFeedback
                        onPress={() =>
                          navigation.navigate("video-elongated", { data: info.id })
                        }
                      >
                        <View className="justify-center items-center">
                          <Image
                            source={images.PlayRound}
                            className="w-[37px] h-[37px] mb-[8px]"
                            resizeMode="contain"
                          />
                          <Text
                            style={{ fontFamily: "Stem-Medium" }}
                            className="text-white"
                          >
                            Play
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback
                        onPress={() => {
                          navigation.navigate("Downloads");
                          dispatch(setVideoDownloadData(info));
                        }}
                      >
                        <View className="justify-center items-center opacity-[0.5]">
                          <Image
                            source={images.DownloadRound}
                            className="w-[37px] h-[37px] mb-[8px]"
                            resizeMode="contain"
                          />
                          <Text
                            style={{ fontFamily: "Stem-Medium" }}
                            className="text-white"
                          >
                            Download
                          </Text>
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
                          className="text-white"
                        >
                          Share
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Actionsheet.Content>
            </Actionsheet>
          </Center>
        </SafeAreaView>
      );
    }
};

export default Lists;
