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
import ytdl from "react-native-ytdl" 

const Downloads = (props) => {

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


    console.log(downloadDetails);

    const getValidDownloadInfo = async(id) => {
        const youtubeURL = `http://www.youtube.com/watch?v=${videoIdForDownload}`;
        dispatch(setVideoIdForDownload(id));
        setLoadingModal(true);
        try {
            const urls = await ytdl(youtubeURL, { filter: format => format.container === 'mp4' });
            console.log(urls);
            setLoadingModal(false);
            setModalVisible(false);
            setShowModal(true);
            // dispatch(setDownloadDetails(response));
        } catch (error) {
            setLoadingModal(false);
            setModalVisible(true);
        }
    }
    


    // useEffect(() => {
    // }, [videoIdForDownload])


    if(videoDownloadData.length === 0) {
        return (
            <SafeAreaView style={{
                paddingTop: Platform.OS === "android" ? 30 : null, 
                flex: 1, 
                backgroundColor: colors.black,
                justifyContent: "center",
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
                                onPress={() => getValidDownloadInfo("BkL9l7qovsE")}
                                key={index} 
                                className="flex flex-row items-center bg-slate-800 w-[90%] p-3 rounded-md min-h-[50px] my-2">
                                <View className="flex-row justify-between flex-1 pr-3">
                                    <Image 
                                        source={{ uri: item?.data?.image }}
                                        style={{
                                            width: 50,
                                            height: 50,
                                            flex: 1
                                        }}
                                        resizeMode={"contain"}
                                    />
                                    <View className="flex-[3] flex-row items-center justify-between min-w-[60%]">
                                        <View className="max-w-[90%] pl-3">
                                            <Text 
                                                style={{
                                                    fontFamily: "Stem-Medium",
                                                    fontWeight: "500",
                                                    fontSize: 16,
                                                    lineHeight: 24
                                                }}
                                                className="text-white">{item?.data?.title}</Text>
                                                {/* <Text className="text-white leading-5">{item?.data?.description}</Text> */}
                                        </View> 
                                        <Image 
                                            source={images.DownloadFilled}
                                            style={{
                                                width: 24,
                                                height: 24,
                                                // marginLeft: 20
                                            }}
                                            resizeMode={"contain"}
                                        />
                                    </View>
                                </View>
                            </TouchableHighlight>
                        ))}
                    </ScrollView>
                </SafeAreaView>
                <Modal style={{
                        backgroundColor: "#00000062"
                    }} isOpen={modalVisible} onClose={setModalVisible} size={"xs"}>
                    <Modal.Content style={{
                        backgroundColor: lightModeEnabled ? colors.white : colors.darkMode
                    }} maxH="212">
                        <Modal.CloseButton />
                            <Modal.Header style={{
                                backgroundColor: lightModeEnabled ? colors.white : colors.darkMode,
                            }}>
                                <Text style={{ 
                                    color: lightModeEnabled ? colors.black : colors.white,
                                    fontFamily: "Stem-Medium"
                                }}>Return Policy</Text></Modal.Header>
                            <Modal.Body>
                                <>
                                <Text style={{
                                    color: lightModeEnabled ? colors.black : colors.white,
                                    fontFamily: "Stem-Medium"
                                }}>
                                {`Connection failed\nPlease connect to the internet and try again🙂🌎`}
                                </Text>
                                </>
                            </Modal.Body>
                            <Modal.Footer style={{
                                backgroundColor: lightModeEnabled ? colors.white : colors.darkMode
                            }}>
                                <Button.Group space={2}>
                                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                setModalVisible(false);
                                }}>
                                    <Text style={{
                                        color: lightModeEnabled ? colors.black : colors.white,
                                        fontFamily: "Stem-Medium"
                                    }}>Close</Text>
                                </Button>
                                </Button.Group>
                            </Modal.Footer>
                        </Modal.Content>
                </Modal>

                <Modal style={{
                        backgroundColor: "#00000062"
                    }} isOpen={loadingModal} onClose={setLoadingModal} size={"xs"}>
                    <Modal.Content style={{
                        backgroundColor: lightModeEnabled ? colors.white : colors.darkMode
                    }} maxH="212">
                            <Modal.CloseButton />
                            <Modal.Body>
                                <Spinner size={"lg"} accessibilityLabel="Loading download links" />
                            </Modal.Body>
                        </Modal.Content>
                </Modal>

                <Center>
                        <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
                            <Modal.Content maxWidth="350">
                            <Modal.CloseButton />
                            <Modal.Header>DownLoad Video</Modal.Header>
                            <Modal.Body>
                                <View className="w-full">
                                    <Text className="text-black">Video: {"Movie Title"}</Text>
                                    <Text>Duration: {`${"2:04"}`}</Text>
                                </View>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button flex="1" onPress={() => {
                                setShowModal3(true);
                            }}>
                                Select video quality
                                </Button>
                            </Modal.Footer>
                            </Modal.Content>
                        </Modal>

                        <Modal isOpen={showModal3} size="lg" onClose={() => setShowModal3(false)}>
                            <Modal.Content maxWidth="350">
                            <Modal.CloseButton />
                            <Modal.Header>Video Qualities</Modal.Header>
                            <Modal.Body>
                                <Radio.Group name="payment" size="sm">
                                <VStack space={3}>
                                    <Radio alignItems="flex-start" _text={{
                                        mt: "-1",
                                        ml: "2",
                                        fontSize: "sm"
                                }} value="payment1">
                                        {"Video Link"}
                                    </Radio>
                                    <Radio alignItems="flex-start" _text={{
                                    mt: "-1",
                                    ml: "2",
                                    fontSize: "sm"
                                }} value="payment2">
                                    Credit/ Debit/ ATM Card
                                    </Radio>
                                    <Radio alignItems="flex-start" _text={{
                                    mt: "-1",
                                    ml: "2",
                                    fontSize: "sm"
                                }} value="payment3">
                                    UPI
                                    </Radio>
                                </VStack>
                                </Radio.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button flex="1" onPress={() => {
                                setShowModal(false);
                                setShowModal3(false);
                            }}>
                                Download
                                </Button>
                            </Modal.Footer>
                            </Modal.Content>
                        </Modal>
                    </Center>
            </>
        )
    }
}

export default Downloads;