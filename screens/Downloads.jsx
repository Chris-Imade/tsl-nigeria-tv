import {
  Button,
  Center,
  HStack,
  Modal,
  Radio,
  Spinner,
  VStack,
} from "native-base";
import React, {useRef, useState } from "react";
import {
  Animated,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../assets/images";
import { colors, ScreenWidth } from "../components/shared";
import {
  setVideoDownloadData,
  setVideoIdForDownload,
  setDownloadDetails,
} from "../Redux/Slice/AppSlice";
import * as FileSystem from "expo-file-system";

const Downloads = (props) => {
  // Initials

  const [mvProgress, setMvProgress] = useState();
  const [ruminant, setRuminant] = useState();
  const [complete, setComplete] = useState(null);


  const { StorageAccessFramework } = FileSystem;
  const [downloadProgress, setDownloadProgress] = React.useState();
  const downloadPath = FileSystem.documentDirectory + (Platform.OS == "android" ? "tslmedia" : "tslmedia"+"/");
  // console.log("DwnloadPath", downloadPath);

  // Ensure path exists
  const ensureDirAsync = async (dir, intermediates = true) => {
    const props = await FileSystem.getInfoAsync(dir);
    if (props.exist && props.isDirectory) {
      return props;
    }
    let _ = await FileSystem.makeDirectoryAsync(dir, { intermediates });
    return await ensureDirAsync(dir, intermediates);
  };

  // show download progress
  const downloadCallback = (downloadProgress) => {
    const progress = downloadProgress?.totalBytesWritten / downloadProgress?.totalBytesExpectedToWrite;
    setMvProgress(progress * 1e+6);
    setRuminant(downloadProgress?.totalBytesExpectedToWrite);
  };
  // downloadCallback()
  // console.log("DownloadProgress: ", downloadProgress);

  // Initial download for  android/Ios
  const downloadFile = async (fileUrl) => {
    if (Platform.OS == "android") {
      const dir = ensureDirAsync(downloadPath);
    }

    let fileName = fileUrl.split("Tsl-Shows/")[1];
    //alert(fileName)
    const downloadResumable = FileSystem.createDownloadResumable(
      fileUrl,
      downloadPath + fileName,
      {},
      downloadCallback
    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
      if (Platform.OS == "android") saveAndroidFile(uri, fileName);
      else saveIosFile(uri);
    } catch (e) {
      console.error("download error:", e);
    }
  };
  // Save android file in publlic directory
  const saveAndroidFile = async (fileUri, fileName = "File") => {
    try {
      const fileString = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const permissions =
        await StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        return;
      }

      try {
        await StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          fileName,
          "video/mp4"
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, fileString, {
              encoding: FileSystem.EncodingType.Base64,
            });
            setComplete("Download completed");
            alert("We are glad to know you enjoyed the Show...😉");
          })
          .catch((e) => {});
      } catch (e) {
        throw new Error(e);
      }
    } catch (err) {}
  };
  // save ios file in directory
  const saveIosFile = (fileUri) => {
    // your ios code
    // i use expo share module to save ios file
  };

  const [modalVisible, setModalVisible] = React.useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  // const { data } = props?.route?.params;
  const [showModal, setShowModal] = useState(false);
  const [showModal3, setShowModal3] = useState(false);

  const dispatch = useDispatch();

  const videoIdForDownload = useSelector(
    (state) => state.data.videoIdForDownload
  );
  const videoDownloadData = useSelector((state) => state.data.videoDownloadData);
  const lightModeEnabled = useSelector((state) => state.data.lightModeEnabled);
  const downloadDetails = useSelector((state) => state.data.downloadDetails);

  // console.log("Video Download Data: " + videoDownloadData);

  // const getVideoDownloadURL = (id) => {
  //   const options = {
  //     method: "GET",
  //     mode: "no-cors",
  //     headers: {
  //       "X-RapidAPI-Key": "c0557c4efamshcd93e3522c4f925p1500b0jsn50f58dc496f0",
  //       "X-RapidAPI-Host": "youtube-dl4.p.rapidapi.com",
  //     },
  //   };

  //   fetch(
  //     `https://youtube-dl4.p.rapidapi.com/fc8c5416b9cfd8fc?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${id}`,
  //     options
  //   )
  //     .then((response) => response.json())
  //     .then((response) => console.log(response))
  //     .catch((err) => console.error(err));
  // };

  // useEffect(() => {
  // }, [videoIdForDownload])

  if (!videoDownloadData.length === 0) {
    return (
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? 30 : null,
          flex: 1,
          backgroundColor: colors.black,
          // justifyContent: "center",
          alignItems: "center",
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
            This is where you’ll see the shows and movies we download for you.
            Check back later to see what you’ve downloaded.
          </Text>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <>
        <SafeAreaView
          style={{
            paddingTop: Platform.OS === "android" ? 30 : null,
            flex: 1,
            backgroundColor: colors.black,
            justifyContent: "center",
          }}
        >

          <ScrollView
            showsVerticalScrollIndicator={false}
            className=""
            contentContainerStyle={{ width: ScreenWidth, alignItems: "center" }}
          >
            {videoDownloadData?.map((item, index) => (
              <TouchableOpacity
                onPress={() => downloadFile("https://rr4---sn-aigzrn7d.googlevideo.com/videoplayback?expire=1676580849&ei=kUPuY9rKAoHONsCKqTg&ip=198.181.163.49&id=o-APB-gou7fhmj3EeNZ4AqPrGLI5HxJynwbR_KVF0HhxqT&itag=22&source=youtube&requiressl=yes&spc=H3gIhrjAbgaqS_aBXuyBBbnKs7QOuWs&vprv=1&mime=video%2Fmp4&ns=qJVNA0jxt6Lmx6i6lorFGPAL&cnr=14&ratebypass=yes&dur=596.520&lmt=1673490877734859&fexp=24007246&c=WEB&txp=5432434&n=p9CIrzM3_tvl5A&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAOAzE2mlN0po3ytg7Yt9Cr4kDgadQjHNQp7TVnDlMeOoAiAejDuF1NpfsZdObOFnANB8Z4Nw2c8ONm-P41vPdFCn3A%3D%3D&title=Funny%20CGI%203D%20Animated%20Short%20Film%20**%20BIG%20BUCK%20BUNNY%20**%20Cute%20Animation%20Kids%20Cartoon%20by%20Blender&rm=sn-p5qe777s&req_id=3508136abb7ca3ee&ipbypass=yes&redirect_counter=2&cm2rm=sn-huoob-5c8e7l&cms_redirect=yes&cmsv=e&mh=KO&mip=102.91.49.144&mm=29&mn=sn-aigzrn7d&ms=rdu&mt=1676559203&mv=m&mvi=4&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhAO_lcNK4YJhhbisXXJsJUGMLAignrSc_hKpzYKp_a5SQAiAWlggIQ6u-KLqd0COBwO-07Qb2IIQt0tq3rJ1jaW8hWQ%3D%3D")}
                key={index}
                className="w-[90%] mb-[21px]"
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                  className="px-12"
                >
                  {/* {console.log(item)} */}
                  <Image
                    source={{ uri: item?.mobile_thumbnail }}
                    style={{
                      width: 96,
                      height: 72,
                      borderRadius: 4,
                    }}
                    resizeMode={"cover"}
                  />
                  <View className="w-[100%] ml-[12px]">
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Stem-Medium",
                          fontSize: 13,
                          color: "#F5F5F5",
                        }}
                      >
                        {item.title}
                      </Text>
                      <Image
                        source={images.More}
                        style={{
                          width: 24,
                          height: 24,
                        }}
                      />
                    </View>
                    <View className="">
                      <Text
                        style={{
                          color: "#545558",
                          fontFamily: "Stem-Regular",
                          fontSize: 8,
                        }}
                      >
                        {mvProgress+"mb"}/{ruminant+"mb"}
                      </Text>
                      <View
                        style={{}}
                        className="w-full h-[3px] bg-[#1E1E1E] first-letter:rounded-[2px] mt-[4px]"
                      >
                        {mvProgress && (
                          <Animated.View style={{
                            width: "50%",
                            backgroundColor: colors.companyGreen,
                            height: 3
                          }}></Animated.View>
                        )}
                      </View>
                      <Text
                        style={{
                          color: colors.companyGreen,
                          fontSize: 9,
                          fontFamily: "Stem-Regular",
                        }}
                      >
                        {mvProgress ? "Downloading..." : complete ? complete : "Connecting..."}
                        
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

export default Downloads;
