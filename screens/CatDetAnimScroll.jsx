import { useNavigation } from "@react-navigation/native";
import { Actionsheet, Center, useDisclose } from "native-base";
import React, { useEffect, useState } from "react";
import { Animated, Image, ImageBackground, ScrollView, Share, ToastAndroid } from "react-native";
import { TouchableOpacity } from "react-native";
import { StatusBar, TouchableWithoutFeedback } from "react-native";
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { images } from "../assets/images";
import { colors, PRODUCTION_URL } from "../components/shared";
import { setCategoryDetailsPage, setRemoveListItem, setVideoList } from "../Redux/Slice/AppSlice";

const CatDetAnimScroll = ({ animateValue, isLoading, setIsLoading }) => {

  const { isOpen, onOpen, onClose } = useDisclose();

  const [info, setInfo] = useState({});

  const [errorResponseData, setErrorResponseData] = useState("");

  const [bottomList, setBottomList] = useState("");
  
  const [addedToList, setAddedToList] = useState("");

  const accessToken = useSelector((state) => state.data.accessToken);

  const videoList = useSelector((state) => state.data.videoList);

  const navigation = useNavigation();

  const videoId = useSelector((state) => state.data.videoId);

  const categoryDetailsPage = useSelector((state) => state?.data?.categoryDetailsPage);
  // console.log(categoryDetailsPage);  

  const dispatch = useDispatch();

  const truncTxt = (txt) => {
    return txt?.length > 21 ? `${txt.substr(0, 21)}...` : txt;
  };


  useEffect(() => {
    const getData = async (url = "") => {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Token ${accessToken}`,
        }, // body data type must match "Content-Type" header
      });

      return response.json(); // parses JSON response into native JavaScript objects

      // console.log("Happy Coding --->!");
    };

    getData(`${PRODUCTION_URL}api/categories/${videoId}/`)
      .then((data) => {
        // console.log(data);
        if(!data.error) {
          dispatch(setCategoryDetailsPage(data));
          // console.log(data);
          // console.log('videoId',  videoId);
        }

        if (data) {
          setIsLoading(false);
          // console.log("<------------ Data is returned ----------------->");
        } else {
          // console.log("What could go wrong?")
        }

        // console.log("<------------ ErrorResponseData ----------------->", errorResponseData);
      })
      .catch((error) => {
        setIsLoading("false");
        setErrorResponseData(error.message);
      });
  }, [videoId]);

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

  // console.log("categoryDetailsPage: ", categoryDetailsPage);

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
      <StatusBar backgroundColor={"#000000"} />
      {Object.keys(categoryDetailsPage).length !== 0 ? (
        <>
          <View style={{ flex: 1 }}>
            {/* <MobileNav /> */}
            <ImageBackground
              source={{ uri: categoryDetailsPage?.videos[0]?.mobile_banner }}
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
                  {categoryDetailsPage?.videos[0]?.mood[0]}
                </Text>
                <Text
                  style={styles.menuTxt}
                  className="w-1 h-1 rounded-full bg-white"
                ></Text>
                <Text
                  style={styles.menuTxt}
                  className="text-[12px] text-[#D6D6D7]"
                >
                  {categoryDetailsPage?.videos[0]?.mood[1]}
                </Text>
                <Text
                  style={styles.menuTxt}
                  className="w-1 h-1 rounded-full bg-white"
                ></Text>
                <Text
                  style={styles.menuTxt}
                  className="text-[12px] text-[#D6D6D7]"
                >
                  {categoryDetailsPage?.videos[0]?.genres[0]}
                </Text>
                <Text
                  style={styles.menuTxt}
                  className="w-1 h-1 rounded-full bg-white"
                ></Text>
                <Text
                  style={styles.menuTxt}
                  className="text-[12px] text-[#D6D6D7]"
                >
                  {categoryDetailsPage?.videos[0]?.genres[1]}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View className="flex-row justify-around mb-[47px] mt-[24px] w-[79%]">
              <TouchableOpacity
                onPress={() => {
                  if(addedToList === false) {
                    dispatch(setVideoList(categoryDetailsPage?.videos[0]));
                    ToastAndroid.show(
                      "Video has been added to List!",
                      ToastAndroid.SHORT
                    );
                  } else {
                    dispatch(setRemoveListItem(categoryDetailsPage?.videos[0]));
                    ToastAndroid.show(
                      "Video has been removed to List!",
                      ToastAndroid.SHORT
                    );
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
                  navigation.navigate("video-elongated", { data: categoryDetailsPage?.videos[0]?.id });
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
                  setInfo(categoryDetailsPage?.videos[0]);
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
      ) : Object.keys(categoryDetailsPage).length === 0 ? (
        <View className="animate-pulse w-full justify-center items-center mt-14" style={{ marginTop: 200}}>
            <View className="rounded-md bg-slate-900/60 h-[100px] w-[200px]"></View>
            <View className="w-[300px] h-6 rounded-md bg-slate-900/60 my-4"></View>
            <View className="w-[250px] h-4 rounded-md bg-slate-900/60 mb-12"></View>
        </View>

      ) : null}

      {Object.keys(categoryDetailsPage).length !== 0 ? (
        categoryDetailsPage?.videos?.map((item, index) => (
          <View className="" key={index}>
            <View className="my-[8px] ml-2">
              <Text
                style={{
                  fontFamily: "Stem-Medium",
                }}
                className="text-[17px] text-white"
              >
                {item?._category?.name}
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
                    <TouchableOpacity onPress={() => {
                     if(bottomList === false) {
                        dispatch(setVideoList(info));
                          ToastAndroid.show(
                            "Video has been added to List!",
                          ToastAndroid.SHORT
                        );
                     } else {
                        dispatch(setRemoveListItem(info));
                          ToastAndroid.show(
                            "Video has been removed to List!",
                          ToastAndroid.SHORT
                        );
                        setBottomList(!bottomList);
                     }
                    }} className="justify-center items-center opacity-[0.5]">
                      <CheckList id={info.id} />
                      <Text
                        style={{ fontFamily: "Stem-Medium" }}
                        className="text-white text-[11px"
                      >
                        My List
                      </Text>
                    </TouchableOpacity>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? null : 25,
    paddingBottom: 30,
  },
  menuTxt: {
    fontFamily: "Stem-Regular",
  },
});

export default CatDetAnimScroll;