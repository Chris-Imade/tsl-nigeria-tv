import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, SafeAreaViewBase, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../assets/images";
import { ScreenHeight, colors } from "../components/shared";
import { updateSearchQuery } from '../Redux/Slice/AppSlice';


const truncTxt = (txt) => {
    return txt.length > 30 ? `${txt.substr(0, 30)}...` : txt
}

const Search = () => {

    const [videoList, setVideoList] = useState([]);

    const [errorResponseData, setErrorResponseData] = useState("");

    const [isLoading, setIsLoading] = useState(true);

    const navigation = useNavigation();
    const searchQuery = useSelector((state) => state.data.searchQuery);
    const dispatch = useDispatch();
    // const movies = useSelector((state) => state.data.movies);
    // console.log(searchQuery);
    const lightModeEnabled = useSelector((state) => state?.data?.lightModeEnabled);

    const filteredList = videoList?.filter((item) => {
        return Object.values(item).join('').toLowerCase()?.includes(searchQuery?.toLowerCase());
    })

    // console.log(filteredList)

    useEffect(() => {
        
        const getData = async(url = '') => {
            // Default options are marked with *
            const response = await fetch(url, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: 'Token 818fbb131c82e940cb22b8b348dc430af391d4d7'
                }// body data type must match "Content-Type" header
                });
                
                
            return response.json(); // parses JSON response into native JavaScript objects
        
            // console.log("Happy Coding --->!");
        }

        getData(`https://web-production-93c3.up.railway.app/api/videos`)
        .then((data) => {
            // console.log(data);
            setVideoList(data);
                
                if(data) {
                    setIsLoading(false);
                    // console.log("<------------ Data is returned ----------------->");
                } else {
                    // console.log("What could go wrong?")
                }

            // console.log("<------------ ErrorResponseData ----------------->", errorResponseData);
        }).catch((error) => {
            setIsLoading(false);
            setErrorResponseData(error.message);
        });
    }, [])

    return (
        <SafeAreaView style={[styles.container, { 
            backgroundColor: lightModeEnabled ? colors?.white : colors?.black,
            paddingTop: Platform.OS === "android" ? 10 : 10
        }]}>
            <KeyboardAvoidingView style={{
                    width: "100%",
                    height: 50,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexDirection: "row",
                    backgroundColor: lightModeEnabled ? colors?.white : "#323337",
                }}>
                    <Image 
                        source={images.SearchSmall}
                        style={{
                            width: 24,
                            height: 24,
                            marginVertical: 16,
                            marginHorizontal: 24
                        }}
                        resizeMode={"contain"}
                    />
                    <TextInput 
                        placeholder='Start typing to search videos'
                        placeholderTextColor={lightModeEnabled ? colors?.darkGray : "#D6D6D7"}
                        style={{
                            width: "70%",
                            outlineWidth: 0,
                            fontSize: 14,
                            fontFamily: "Stem-Regular",

                            color: lightModeEnabled ? colors?.black : colors.white
                        }}
                        onChangeText={(text) => dispatch(updateSearchQuery(text))}
                    />
                </KeyboardAvoidingView>
            <ScrollView
            showsVerticalScrollIndicator={false}
            style={[{ flex: 1, backgroundColor: lightModeEnabled ? colors?.white : colors?.black }]}>
                <Text style={[styles.topTxt, { 
                    color: lightModeEnabled ? colors?.black : colors?.white,
                    fontSize: 18,
                    fontFamily: "Stem-Medium"
                }]}>Top Searches</Text>
                {filteredList?.map((item, index) => (
                    <TouchableHighlight
                    key={index}
                    onPress={() => navigation.navigate("video-screen", { data: item.video_link })}
                    >
                        <View 
                        style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingRight: 7,
                        backgroundColor: lightModeEnabled ? colors.lightGray : "#221F1F",
                        marginVertical: 1
                    }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image
                                    source={{
                                        uri: item.mobile_thumbnail
                                    }}
                                    style={{
                                        width: 124,
                                        height: 59
                                    }}
                                    resizeMode={"cover"}
                                />

                                <Text style={{
                                    fontSize: 14,
                                    color: colors.white,
                                    marginLeft: 20,
                                    fontWeight: "900",
                                    fontFamily: "Stem-Regular",
                                }}>{truncTxt(item?.title)}</Text>
                            </View>

                            <Image 
                                source={images.PlaySmall}
                                resizeMode={"contain"}
                                style={{
                                    width: 24,
                                    height: 24,
                                    marginRight: 15
                                }}
                            />
                        </View>
                    </TouchableHighlight>
                ))}
            </ScrollView>
        </SafeAreaView>
   )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingBottom: 200,
        height: ScreenHeight
    },
    topTxt: {
        fontSize: 17,
        marginHorizontal: 24,
        marginVertical: 19
    }
}); 

export default Search;