import { View, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ToastAndroid,
  Share
} from "react-native";
import { images } from "../assets/images";
import { Actionsheet, Box, useDisclose, Center } from "native-base";
import { StyleSheet } from "react-native";
import { colors } from "./shared";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  // setVideoDownloadData,
  // setVideoIdForDownload,
  setVideoList,
  setRemoveListItem
} from "../Redux/Slice/AppSlice";
import * as Clipboard from 'expo-clipboard';
// import * as Sharing from 'expo-sharing';

const AnimatedScroll = ({ animateValue, isLoading, setIsLoading }) => {

  const categories = useSelector((state) => state?.data?.categories);
  // console.log("categories", categories);

  const [info, setInfo] = useState({});

  const [indexId, setIndexId] = useState(categories[0]?.videos[0]?.id);

  const [addedToList, setAddedToList] = useState(false);

  // console.log(categories[0]?.videos[0]);

  const { isOpen, onOpen, onClose } = useDisclose();

  const [copiedText, setCopiedText] = React.useState('');

  const [bottomList, setBottomList] = useState(false);

  const truncTxt = (txt) => {
    return txt?.length > 21 ? `${txt.substr(0, 21)}...` : txt;
  };

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const videoList = useSelector((state) => state.data.videoList);


  useEffect(() => {
    setIndexId(categories[0]?.videos[0]?.id);
  }, [categories])


  const copyToClipboard = async (link) => {
    await Clipboard.setStringAsync(link);
  };
  

  // console.log(categories[0].videos}[0].video_link);
  const baseUrl = "https://www.youtube.com/watch?v="

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: baseUrl+info?.video_link
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const CheckList = ({ id }) => {
    const findItem = videoList.filter((item) => item.id === id);
    console.log("id: ", id);
    // console.log("ITEM FOUND ", findItem);
    if(findItem.length > 0) {
      return (
        <Image
          source={images.Check}
          className="w-[24px] h-[24px]"
          resizeMode="contain"
        />
      )
    } else {
      return (
        <Image
          source={images.AddRound}
          className="w-[24px] h-[24px]"
          resizeMode="contain"
        />
      )
    }
  } 

  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: animateValue } } }],
        { useNativeDriver: false }
      )}
    >
      {categories.length !== 0 ? (
        <>
          <View style={{ flex: 1 }}>
            {/* <MobileNav /> */}
            <ImageBackground
              source={{ uri: categories[0]?.videos[0]?.mobile_banner }}
              resizeMode={"cover"}
              style={{
                width: "100%",
                height: 550,
                elevation: -1,
                marginTop: -50,
                position: "relative",
              }}
            >
              <Image
                source={images.BottomShadow}
                style={{
                  position: "absolute",
                  bottom: 0,
                  height: 108,
                  width: "100%",
                }}
              />
            </ImageBackground>
            <View className="w-full items-center justify-center">
              <View className="w-[79%] mt-[-50px] items-center flex-row justify-around mx-[18px] space-x-1">
                <Text
                  style={styles.menuTxt}
                  className="text-[12px] text-[#D6D6D7]"
                >
                  {categories[0]?.videos[0]?.mood[0]}
                </Text>
                <Text
                  style={styles.menuTxt}
                  className="w-1 h-1 rounded-full bg-white"
                ></Text>
                <Text
                  style={styles.menuTxt}
                  className="text-[12px] text-[#D6D6D7]"
                >
                  {categories[0]?.videos[0]?.mood[1]}
                </Text>
                <Text
                  style={styles.menuTxt}
                  className="w-1 h-1 rounded-full bg-white"
                ></Text>
                <Text
                  style={styles.menuTxt}
                  className="text-[12px] text-[#D6D6D7]"
                >
                  {categories[0]?.videos[0]?.genres[0]}
                </Text>
                <Text
                  style={styles.menuTxt}
                  className="w-1 h-1 rounded-full bg-white"
                ></Text>
                <Text
                  style={styles.menuTxt}
                  className="text-[12px] text-[#D6D6D7]"
                >
                  {"Comedy"}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View className="flex-row justify-around mb-[47px] mt-[24px] w-[79%]">
              <TouchableOpacity
                onPress={() => {
                  if(addedToList === false) {
                    if(categories[0]?.videos[0]) {
                      dispatch(setVideoList(categories[0]?.videos[0]));
                      ToastAndroid.show(
                        "Video has been added to List!",
                        ToastAndroid.SHORT
                      );
                    } else {
                      return (
                        ToastAndroid.show(
                          "Please wait for video to load...",
                          ToastAndroid.SHORT
                        )
                      );
                    }
                  } else {
                    if(categories[0]?.videos[0]) {
                      dispatch(setRemoveListItem(categories[0]?.videos[0]));
                        ToastAndroid.show(
                          "Video has been removed from List!",
                          ToastAndroid.SHORT
                        );
                    } else {
                      return (
                        ToastAndroid.show(
                          "Please wait for video to load...",
                          ToastAndroid.SHORT
                        )
                      );
                    }
                  }
                  setAddedToList(!addedToList);
                }}
                className="items-center"
              >
                {/* My List icon */}
                {addedToList === true ? (
                  <Image
                    source={images.Check}
                    className="w-[24px] h-[24px]"
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={images.AddRound}
                    className="w-[24px] h-[24px]"
                    resizeMode="contain"
                  />
                )}
                <Text
                  style={styles.menuTxt}
                  className="text-white text-[12px] pt-[8px]"
                >
                  My List
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>{
                  navigation.navigate("video-elongated", { data: indexId });
                }}
                className="rounded-[4px] justify-center items-center bg-slate-50 w-[108px] h-[42px] flex-row"
              >
                {/* Play Icon */}
                <Image
                  source={images.PlayMain}
                  className="w-[24px] h-[24px]"
                  resizeMode="contain"
                />
                <Text
                  style={styles.menuTxt}
                  className="text-black text-[17px] font-semibold ml-[12px]"
                >
                  Play
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onOpen();
                  setInfo(categories[0]?.videos[0]);
                }}
                className="items-center"
              >
                <Image
                  source={images.InfoMain}
                  className="w-[24px] h-[24px]"
                  resizeMode="contain"
                />
                <Text
                  style={styles.menuTxt}
                  className="text-white text-[12px] pt-[8px]"
                >
                  Info
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : categories.length === 0 ? (
        <View className="animate-pulse w-full justify-center items-center mt-14" style={{ marginTop: 200}}>
            <View className="rounded-md bg-slate-900/60 h-[100px] w-[200px]"></View>
            <View className="w-[300px] h-6 rounded-md bg-slate-900/60 my-4"></View>
            <View className="w-[250px] h-4 rounded-md bg-slate-900/60 mb-12"></View>
        </View>

      ) : null}

      {categories.length !== 0 ? (
        categories && categories?.map((item, index) => (
          <View className="" key={index}>
            <View className="my-[8px] ml-2">
              <Text
                style={{
                  fontFamily: "Stem-Medium",
                }}
                className="text-[17px] text-white"
              >
                {item.name}
              </Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={
                {
                  // paddingBottom: 14
                }
              }
            >
              {item.videos.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setInfo(item);
                    onOpen();
                  }}
                >
                  <Image
                    source={{ uri: item?.mobile_thumbnail }}
                    resizeMode={"contain"}
                    style={{
                      width: 124,
                      height: 176,
                      marginHorizontal: 4,
                      marginLeft: 8,
                      borderRadius: 8,
                    }}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ))
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
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
      )}
      {/* Bottom Sheets */}

      <Center>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content style={{ backgroundColor: colors.darkMode }}>
            <View className="w-full p-5 items-center justify-center">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("video-elongated", { data: info?.id })
                }
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
                      {info?.year}
                    </Text>
                    <Text
                      style={{ fontFamily: "Stem-Medium" }}
                      className="text-[#98999B] text-[11px] mx-1"
                    >
                      {info?.rating}
                    </Text>
                    {/* <Text
                      style={{ fontFamily: "Stem-Medium" }}
                      className="text-[#98999B] text-[11px] mx-1">{info.director}</Text> */}
                  </View>
                  <Text
                    style={{ fontFamily: "Stem-Medium" }}
                    className="leading-4 w-[70%] text-white text-[11px]"
                  >
                    {info?.description}
                  </Text>
                </View>
              </TouchableOpacity>
              <View>
                <View className="w-full py-[12px] flex-row justify-around items-center">
                  <TouchableWithoutFeedback
                    onPress={() =>
                      navigation.navigate("video-elongated", { data: info?.id })
                    }
                  >
                    <View className="justify-center items-center">
                      <Image
                        source={images.PlayRound}
                        className="w-[27px] h-[27px] mb-[8px]"
                        resizeMode="contain"
                      />
                      <Text
                        style={{ fontFamily: "Stem-Medium" }}
                        className="text-white text-[11px"
                      >
                        Play
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      const baseUrl = "https://www.ssyoutube.com/watch?v="
                      copyToClipboard(baseUrl+info.video_link);
                      ToastAndroid.show(
                        "Video link has been copied",
                        ToastAndroid.SHORT
                      );
                    }}
                  >
                    <View className="justify-center items-center opacity-[0.5]">
                      <Image
                        source={images.FileCopy}
                        className="w-[27px] h-[27px] mb-[8px]"
                        resizeMode="contain"
                      />
                      <Text
                        style={{ fontFamily: "Stem-Medium" }}
                        className="text-white text-[11px"
                      >
                        Copy
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      if(bottomList === false) {
                        if(info) {
                          dispatch(setVideoList(info));
                            ToastAndroid.show(
                              "Video has been added to List!",
                            ToastAndroid.SHORT
                          );
                        } else {
                          return (
                            ToastAndroid.show(
                              "Please wait for video to load...",
                            ToastAndroid.SHORT
                            )
                          );
                        }
                      } else {
                        if(info) {
                          dispatch(setRemoveListItem(info));
                            ToastAndroid.show(
                            "Video has been removed from List!",
                            ToastAndroid.SHORT
                          );
                        } else {
                          return (
                            ToastAndroid.show(
                              "Please wait for video to load...",
                            ToastAndroid.SHORT
                            )
                          );
                        }
                      }
                      setBottomList(!bottomList);
                    }}
                  >
                    <View className="justify-center items-center opacity-[0.5]">
                    <CheckList id={info.id} />
                    {console.log("Video ObjectId: ", info)}
                      <Text
                        style={{ fontFamily: "Stem-Medium" }}
                        className="text-white text-[11px"
                      >
                        My List
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableOpacity onPress={() => onShare()} className="justify-center items-center opacity-[0.5]">
                    <Image
                      source={images.ShareRound}
                      className="w-[27px] h-[27px] mb-[8px]"
                      resizeMode="contain"
                    />
                    <Text
                      style={{ fontFamily: "Stem-Medium" }}
                      className="text-white text-[11px"
                    >
                      Share
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  menuTxt: {
    fontFamily: "Stem-Medium",
  },
});

export default AnimatedScroll;
