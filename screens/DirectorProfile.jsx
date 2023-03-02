import { useNavigation } from "@react-navigation/native";
import { Actionsheet, Center, useDisclose, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, TouchableHighlight, TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { StatusBar } from "react-native";
import { ScrollView } from "react-native";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { images } from "../assets/images";
import { baseUrl, colors, onShare, ScreenWidth } from "../components/shared";

const DirectorProfile = (props) => {
  const { data } = props?.route?.params;

  const [directorProfile, setDirectorProfile] = useState();
  const accessToken = useSelector((state) => state.data.accessToken);
  const lightModeEnabled = useSelector((state) => state.data.lightModeEnabled);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [errorResponseData, setErrorResponseData] = useState("");
  const [responseData, setResponseData] = useState("");
  const [isLoading, setIsLoading] = useState();
  const [info, setInfo] = useState();

  const navigation = useNavigation();

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

  useEffect(() => {
    getData(`${baseUrl}api/directors/${data}`)
      .then((data) => {
        // console.log(data);
        setDirectorProfile(data);

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
  }, [data]);

  const truncTxt = (txt) => {
    return txt?.length > 21 ? `${txt.substr(0, 21)}...` : txt;
  };

  return (
    <>
        <ScrollView
          contentContainerStyle={{
            paddingTop: 50,
            flex: 1,
            backgroundColor: lightModeEnabled ? colors.white : colors.black,
          }}
        >
        <StatusBar backgroundColor="#000" style="dark-content" />
          {directorProfile ? (
            <>
              <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
              <View className="items-center text-center mr-[16px]">
                <Image
                  source={{ uri: directorProfile.image }}
                  style={{
                    width: 156,
                    height: 173,
                  }}
                  resizeMode={"cover"}
                />
                <View className="mt-[8px]">
                  <Text
                    style={{
                      fontFamily: "Stem-Medium",
                      fontSize: 16,
                      color: lightModeEnabled ? colors.black : colors.white,
                    }}
                  >
                    {directorProfile.name}
                  </Text>
                </View>
              </View>
              <View style={{
                width: ScreenWidth - 196
              }}>
                <Text
                  style={{
                    fontFamily: "Stem-Medium",
                    color: "#545558",
                    fontSize: 11,
                  }}
                >
                  About
                </Text>
                <Text
                  style={{
                    color: lightModeEnabled ? colors.black : colors.white,
                    flexWrap: 'wrap'
                  }}
                >
                  {directorProfile.bio}
                </Text>
              </View>
            </View>

            <View className="mt-[32px] mb-12">
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Stem-Medium",
                  color: "#F5F5F5",
                  marginHorizontal: 20,
                  marginBottom: 15,
                }}
              >
                Feature TVShows
              </Text>
              <View className="flex-wrap justify-start flex-row mx-[16px] w-full">
                {directorProfile?._videos?.map((item, index) => (
                  <>
                    <TouchableHighlight
                      onPress={() => {
                        onOpen();
                        setInfo(item);
                      }}
                      key={index}
                    >
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
            </>
          ) : (
            <View className="justify-center items-center flex-1">
              <ActivityIndicator size={"large"} color={"white"} />
            </View>
          )}
        </ScrollView>
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
                      dispatch(setVideoList(info));
                      ToastAndroid.show(
                        "Video has been added to List!",
                        ToastAndroid.SHORT
                      );
                    }}
                  >
                    <TouchableOpacity onPress={() => {
                      dispatch(setVideoList(categories[0]?.videos[0]));
                        ToastAndroid.show(
                          "Video has been added to List!",
                        ToastAndroid.SHORT
                      );
                    }} className="justify-center items-center opacity-[0.5]">
                      <Image
                        source={images.AddRound}
                        className="w-[27px] h-[27px] mb-[8px]"
                        resizeMode="contain"
                      />
                      <Text
                        style={{ fontFamily: "Stem-Medium" }}
                        className="text-white text-[11px"
                      >
                        Playlist
                      </Text>
                    </TouchableOpacity>
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
    </>
  );
};

export default DirectorProfile;
