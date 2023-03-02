```
  |This screen is simply the screen where all information about a particular video is displayed in a more elaborate manner

```
import { useNavigation } from "@react-navigation/native";
import { Skeleton } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, TouchableOpacity } from "react-native";
import { TouchableHighlight } from "react-native";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
  ToastAndroid
} from "react-native";
import WebView from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../assets/images";
import { baseUrl, colors, onShare, ScreenHeight, ScreenWidth } from "../components/shared";
import { setVideoList } from "../Redux/Slice/AppSlice";
import * as Clipboard from 'expo-clipboard';
import { StatusBar } from "react-native";
import { Share } from "react-native";
import { ViewsCount } from "../components";

const VideoEnlongated = (props) => {
  const [errorResponseData, setErrorResponseData] = useState("");
  const [responseData, setResponseData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { data } = props.route.params;
  const [localData, setLocalData] = useState();
  const [showDetailedMenu, setShowDetailedMenu] = useState(false);
  const [id, setId] = useState(data);
  const [copiedText, setCopiedText] = React.useState('');
  const [showVideo, setShowVideo] = useState(false);
  // console.log(localData);

  
  const lightModeEnabled = useSelector((state) => state.data.lightModeEnabled);
  const accessToken = useSelector((state) => state.data.accessToken);

  const navigation = useNavigation();

  const embedURI = `https://www.youtube.com/embed/${localData?.video_link}`;

  const dispatch = useDispatch();

  const copyToClipboard = async (link) => {
    await Clipboard.setStringAsync(link);
  };
  
  
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
    getData(`${baseUrl}api/videos/${id}`)
    .then((data) => {
      // console.log(data);
      if(!data.error) {
        setLocalData(data);
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
        setIsLoading(false);
        setErrorResponseData(error.message);
      });
  }, [data, id]);
  
  
  setTimeout(() => {
    if(localData) {
      setShowVideo(true);
    }
  }, 5000)


// console.log(localData.video_link);

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: lightModeEnabled ? colors.white : colors.black,
        }}
      >
        <SafeAreaView>
        <StatusBar backgroundColor="#000" style="dark-content" />
          <View className="h-[220px]">
            {showVideo ? (
              <WebView
                allowsFullscreenVideo={true}
                javaScriptEnabled={true}
                allowsBackForwardNavigationGestures
                mediaPlaybackRequiresUserAction={
                  Platform.OS !== "android" || Platform.Version >= 17
                    ? false
                    : undefined
                }
                scrollEnabled={false}
                source={{ uri: embedURI }}
                style={{
                  width: ScreenWidth,
                  height: "100%",
                }}
              />
            ) : (
              <View className="bg-slate-900/60" style={{
                width: ScreenWidth,
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <ActivityIndicator size={"large"} color={"white"} />
            </View>
            )}
            
          </View>
          <View style={{ marginLeft: 20, marginTop: 8, marginBottom: 12 }}>
            <Text
              style={{
                fontFamily: "Stem-Medium",
                fontSize: 25,
                color: lightModeEnabled ? colors.black : colors.trueWhite,
              }}
            >
              {localData?.title}
            </Text>
          </View>
          <View>
            <View
              style={{ flexDirection: "row", marginLeft: 20, marginBottom: 8, alignItems: "center" }}
            >
              <Text
              className="text-white"
                style={{
                  // color: lightModeEnabled ? colors.black : colors.white,
                  fontSize: 11,
                  fontFamily: "Stem-Medium",
                  marginRight: 12,
                  // justifyContent: ""
                }}
              >
               {!localData ? "Year" : new Date(localData?.date_uploaded).getFullYear()}
              </Text>
              <Text
                style={{
                  color: lightModeEnabled ? colors.black : colors.white,
                  fontSize: 11,
                  fontFamily: "Stem-Medium",
                  marginRight: 12,
                }}
              >
                {!localData ? "Day" : new Date(localData?.date_uploaded).getDay() + "th"}
              </Text>
              <Text
                style={{
                  color: lightModeEnabled ? colors.black : colors.white,
                  fontSize: 11,
                  fontFamily: "Stem-Medium",
                }}
              >
                {localData?.rating}
              </Text>
              {/* Views Automatic and Manual Views rendered here */}
              {localData?.has_manual_views === true ? (
                <Text style={{
                  color: colors.white,
                  fontFamily: "Stem-Regular",
                  marginLeft: 12,
                }}>{localData?.manual_views} views</Text>
              ) : (
                <ViewsCount videoId={localData?.video_link} />
              )}
            </View>
            <View className="justify-center items-center">
             
              <TouchableWithoutFeedback onPress={() => {
                  const baseUrl = "https://www.ssyoutube.com/watch?v="
                  copyToClipboard(baseUrl+localData?.video_link);
                  ToastAndroid.show(
                    "Video link has been copied",
                    ToastAndroid.SHORT
                  );
                }}>
                <View
                  style={{
                    width: "95%",
                    // paddingVertical: 13,
                    borderRadius: 12,
                    borderWidth: 1.5,
                    borderStyle: "solid",
                    borderColor: colors.grayMedium,
                    height: 50,
                    marginTop: 16,
                  }}
                  className="flex-row justify-center items-center bg-[#191A1C]"
                >
                  <Image
                    source={images.FileCopy}
                    style={{
                      width: 14,
                      height: 14,
                      marginRight: 8,
                    }}
                    resizeMode={"contain"}
                  />
                  <Text
                    style={{
                      color: "#F5F5F5",
                      fontFamily: "Stem-Medium",
                      fontSize: 13,
                    }}
                  >
                    Copy
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View
              className="leading-[16px]"
              style={{ marginHorizontal: 20, marginTop: 20 }}
            >
              <Text
                style={{
                  fontFamily: "Stem-Regular",
                  fontSize: 13,
                  color: lightModeEnabled ? colors.black : colors.white,
                }}
              >
                {localData?.description}
              </Text>
              <TouchableWithoutFeedback
                onPress={() => setShowDetailedMenu(true)}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexWrap: "wrap"
                  }}
                >
                  <Text
                    style={{
                      color: lightModeEnabled ? colors.black : colors.white,
                    }}
                  >
                    Staring:{" "}
                  </Text>
                  {localData?.actors?.map((item, index) => (
                    <Text
                      style={{
                        marginHorizontal: 2,
                        color: lightModeEnabled ? colors.black : colors.white,
                      }}
                      key={index}
                    >
                      {item.name},
                    </Text>
                  ))}
                  <Text
                    style={{
                      color: lightModeEnabled ? colors.black : colors.white,
                    }}
                  >
                    ...more
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
              onPress={() => navigation.navigate("director-profile", { data: localData?.director?.id })}>
                <Text
                  style={{
                    fontFamily: "Stem-Medium",
                    fontSize: 16,
                    color: lightModeEnabled ? colors.black : colors.white,
                  }}
                >
                  Director: <Text>{localData?.director?.name}</Text>
                </Text>
              </TouchableWithoutFeedback>
            </View>
            <View
              className="mt-8"
              style={{
                width: ScreenWidth,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 264,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setVideoList(localData));
                    ToastAndroid.show(
                      "Video has been added to List!",
                      ToastAndroid.SHORT
                    );
                  }}
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Image
                    source={images.AddToList}
                    style={{ width: 24, height: 24 }}
                    resizeMode={"contain"}
                  />
                  <Text
                    style={{
                      fontSize: 9,
                      fontFamily: "Stem-Medium",
                      color: colors.white,
                    }}
                  >
                    My List
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    ToastAndroid.show(
                      "This feature is under development",
                      ToastAndroid.SHORT
                    );
                  }}
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Image
                    source={images.Star}
                    style={{ width: 24, height: 24 }}
                    resizeMode={"contain"}
                  />
                  <Text
                    style={{
                      fontSize: 9,
                      fontFamily: "Stem-Medium",
                      color: colors.white,
                    }}
                  >
                    Rate
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onShare()}
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Image
                    source={images.Share}
                    style={{ width: 24, height: 24 }}
                    resizeMode={"contain"}
                  />
                  <Text
                    style={{
                      fontSize: 9,
                      fontFamily: "Stem-Medium",
                      color: colors.white,
                    }}
                  >
                    Share
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <>
              <View style={{ marginTop: 64 }}>
                <View
                  style={{
                    width: ScreenWidth,
                    backgroundColor: "#1E1E1E",
                    height: 3,
                  }}
                ></View>
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 15,
                    fontFamily: "Stem-Medium",
                    paddingVertical: 12,
                    borderStyle: "solid",
                    borderTopWidth: 5,
                    color: colors.trueWhite,
                    borderTopColor: colors.companyGreen,
                    width: 125,
                  }}
                >
                  MORE LIKE THIS
                </Text>
              </View>
              <View>
                <ScrollView className="w-full">
                  <View className="flex-wrap justify-start flex-row mx-[16px] w-full">
                    {localData?.more_like_this?.map((item, index) => (
                      <TouchableHighlight
                        onPress={() => setId(item.id)}
                        key={index}
                      >
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
            </>
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
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: lightModeEnabled ? colors?.black : colors?.white,
              marginTop: 100,
              fontFamily: "Stem-Medium",
              fontSize: 21,
            }}
          >
            Actors
          </Text>
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            {localData.actors.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate("actors-profile", { data: item.id });
                }}
                className="mt-[33px]"
              >
                <Text
                  style={{
                    color: lightModeEnabled ? colors?.black : "#98999B",
                    fontFamily: "Stem-Medium",
                    fontSize: 16,
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View className="absolute" style={{ top: ScreenHeight - 300 }}>
            <TouchableHighlight
              className="flex justify-center items-center bg-white h-14 w-14 rounded-full"
              onPress={() => setShowDetailedMenu(false)}
            >
              <Image
                source={images.MainClose}
                style={{
                  width: 20,
                  height: 20,
                }}
                resizeMode={"contain"}
              />
            </TouchableHighlight>
          </View>
        </View>
      )}
    </>
  );
};

export default VideoEnlongated;
