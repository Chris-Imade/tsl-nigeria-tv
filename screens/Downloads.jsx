import { 
    Button, 
    Center, 
    HStack, 
    Modal, 
    Radio, 
    Spinner, 
    VStack
} from "native-base";
import React, { useEffect, useState } from "react";
import { Image, Platform, SafeAreaView, ScrollView, Text, TouchableHighlight, TouchableWithoutFeedback } from "react-native";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../assets/images";
import { colors, ScreenWidth } from "../components/shared";
import { 
    setVideoDownloadData, 
    setVideoIdForDownload,
    setDownloadDetails
} from "../Redux/Slice/AppSlice";
import * as FileSystem from 'expo-file-system';

const Downloads = (props) => {
    // Initials
    const { StorageAccessFramework } = FileSystem;
    const [downloadProgress, setDownloadProgress] = React.useState();
    const downloadPath = FileSystem.documentDirectory + (Platform.OS == 'android' ? '' : '');
    console.log("DwnloadPath", downloadPath);

    // Ensure path exists
    const ensureDirAsync = async (dir, intermediates = true) => {
        const props = await FileSystem.getInfoAsync(dir)
        if (props.exist && props.isDirectory) {
            return props;
        }
        let _ = await FileSystem.makeDirectoryAsync(dir, { intermediates })
        return await ensureDirAsync(dir, intermediates)
    }

    // show download progress
    const downloadCallback = downloadProgress => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        setDownloadProgress(progress);
    };

    console.log("DownloadProgress", downloadProgress);
    
    // Initial download for  android/Ios
    const downloadFile = async (fileUrl) => {
        if (Platform.OS == 'android') {
          const dir = ensureDirAsync(downloadPath);
        }
    
        let fileName = fileUrl.split('Reports/')[1];
        //alert(fileName)
        const downloadResumable = FileSystem.createDownloadResumable(
          fileUrl,
          downloadPath + fileName,
          {},
          downloadCallback
        );
    
        try {
          const { uri } = await downloadResumable.downloadAsync();
          if (Platform.OS == 'android')
            saveAndroidFile(uri, fileName)
          else
            saveIosFile(uri);
        } catch (e) {
          console.error('download error:', e);
        }
    }
        // Save android file in publlic directory
        const saveAndroidFile = async (fileUri, fileName = 'File') => {
            try {
            const fileString = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
            
            const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (!permissions.granted) {
                return;
            }

            try {
                await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'application/pdf')
                .then(async (uri) => {
                    await FileSystem.writeAsStringAsync(uri, fileString, { encoding: FileSystem.EncodingType.Base64 });
                    alert('Report Downloaded Successfully')
                })
                .catch((e) => {
                });
            } catch (e) {
                throw new Error(e);
            }

            } catch (err) {
            }
        }
        // save ios file in directory
        const saveIosFile = (fileUri) => {
            // your ios code
            // i use expo share module to save ios file
        }


    

    const [modalVisible, setModalVisible] = React.useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    // const { data } = props?.route?.params;
    const [showModal, setShowModal] = useState(false);
    const [showModal3, setShowModal3] = useState(false);

    
    const dispatch = useDispatch();

    const videoIdForDownload = useSelector((state) => state.data.videoIdForDownload);
    const videoDownloadData = useSelector((state) => state.data.videoDownloadData);
    const lightModeEnabled = useSelector((state) => state.data.lightModeEnabled);
    const downloadDetails = useSelector((state) => state.data.downloadDetails);

    console.log(videoDownloadData);

    const getVideoDownloadURL = (id) => {

        const options = {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'X-RapidAPI-Key': 'c0557c4efamshcd93e3522c4f925p1500b0jsn50f58dc496f0',
                'X-RapidAPI-Host': 'youtube-dl4.p.rapidapi.com'
            }
        };
        
        fetch(`https://youtube-dl4.p.rapidapi.com/fc8c5416b9cfd8fc?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${id}`, options)
            .then(response => response.json())
            .then(response => console.log(downloadFile(response.formats[3].url)))
            .catch(err => console.error(err));

    }

    // useEffect(() => {
    // }, [videoIdForDownload])


    if(!videoDownloadData.length === 0) {
        return (
            <SafeAreaView style={{
                paddingTop: Platform.OS === "android" ? 30 : null, 
                flex: 1, 
                backgroundColor: colors.black,
                // justifyContent: "center",
                alignItems: "center",
            }}>
                <View style={{
                    borderWidth: 2,
                    borderColor: "#545558",
                    borderStyle: "dashed",
                    marginHorizontal: 28,
                    paddingVertical: 23,
                    paddingHorizontal: 19,
                    width: ScreenWidth - 40
                }}>
                <Text style={{
                    width: ScreenWidth - 80,
                    fontFamily: "Stem-Regular",
                    fontSize: 12,
                    lineHeight: 13,
                }} className="text-white">This is where you’ll see the shows and movies we download for you. Check back later to see what you’ve downloaded.</Text>
                </View>
            </SafeAreaView>
        )
    } else {
        return (
            <>
                <SafeAreaView style={{ 
                    paddingTop: Platform.OS === "android" ? 30 : null, 
                    flex: 1,
                    backgroundColor: colors.black,
                    justifyContent: "center",
                    // alignItems: "center"
                }}>
                    {/* <Image 
                        source={""}
                    /> */}

                    <ScrollView 
                    showsVerticalScrollIndicator={false}
                    className="" contentContainerStyle={{ width: ScreenWidth, alignItems: "center" }}>
                        {videoDownloadData?.map((item, index) => (
                            <TouchableHighlight  
                                onPress={() => getVideoDownloadURL("BkL9l7qovsE")}
                                key={index} 
                                className="w-[90%] mb-[21px]"
                                >
                                <View style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    justifyContent: "center"
                                }} className="px-12">
                                    <Image 
                                        source={{ uri: item?.data?.image }}
                                        style={{
                                            width: 96,
                                            height: 72,
                                            borderRadius: 4
                                        }}
                                        resizeMode={"cover"}
                                    />
                                    <View className="w-[100%] ml-[12px]">
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                            <Text style={{ fontFamily: "Stem-Medium", fontSize: 13, color: "#F5F5F5" }}>Omo Ghetto</Text>
                                            <Image 
                                                source={images.More}
                                                style={{
                                                    width: 24,
                                                    height: 24
                                                }}
                                            />
                                        </View>
                                        <View className="">
                                            <Text style={{ color: "#545558", fontFamily: "Stem-Regular", fontSize: 8 }}>300mb/600mb</Text>
                                            <View style={{}} className="w-full h-[3px] bg-[#1E1E1E] first-letter:rounded-[2px] mt-[4px]"></View>
                                            <Text style={{ color: colors.companyGreen, fontSize: 9, fontFamily: "Stem-Regular" }}>Connecting...</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        ))}
                    </ScrollView>
                </SafeAreaView>
            </>
        )
    }
}

export default Downloads;