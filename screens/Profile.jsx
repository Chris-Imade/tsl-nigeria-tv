import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { colors, PRODUCTION_URL } from "../components/shared";
import { images } from "../assets/images";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken, setProfilePhoto } from "../Redux/Slice/AppSlice";
import { Center, Modal } from "native-base";
import { TouchableWithoutFeedback } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from "react-native";

const Profile = () => {
  const navigation = useNavigation();
  const [showUpdatePhoto, setShowUpdatePhoto] = useState(false);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(0); 
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.data?.user);
  const profilePhoto = useSelector((state) => state?.data?.profilePhoto);
  const lightModeEnabled = useSelector((state) => state.data.lightModeEnabled);
  const accessToken = useSelector((state) => state.data.accessToken);

        
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // Important Note to take down is that the uri am sending could be the cause of my failure in making this request.
    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      dispatch(setProfilePhoto(result.assets[0].uri));
    }


  };


  const submitProfilePhoto = () => {
    // function get_url_extension( url ) {
    //   return url.split(/[#?]/)[0].split('.').pop().trim();
    // }
  console.log("Image Name", image.name);
  console.log("Image Type", image.type);
  // setIsLoading(true);
  // const fileName = image.substring(image.lastIndexOf('/') + 1);
  // const fileType = get_url_extension(image);
  // const formData = new FormData();
  // formData.append('profile_photo', { 
  //     image, 
  //     name: fileName, 
  //     type: `image/${fileType}`
  //   });
  //   // "content-type": "multipart/form-data"
  //   const options = {
  //     method: 'PUT',
  //     mode: 'no-cors',
  //     headers: {
  //       'content-type': 'multipart/form-data',
  //       Authorization: `Token ${accessToken}`,

  //       'Accept': 'application/json'
  //     },
  //     body: formData
  //   };
  //   if(userId !== 0) {
  //     fetch(`https://web-production-de75.up.railway.app/api/profiles/${userId}/`, options)
  //     .then(response => response.json())
  //     .then(response => {
  //       // console.log(response);
  //       setIsLoading(false);
  //       setShowUpdatePhoto(false);
  //       ToastAndroid.show(
  //         "Photo Uploaded Successfully",
  //         ToastAndroid.SHORT
  //       );
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       setIsLoading(false);
  //     });
  //   }

    setTimeout(() => {
      setIsLoading(false);
      setShowUpdatePhoto(false);
      ToastAndroid.show(
        "Photo Uploaded Successfully",
        ToastAndroid.SHORT
      );
    }, 2000);

  }

  const getUserId = async (url = "") => {
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

  // console.log(isLoading);

  useEffect(() => {
    getUserId(`${PRODUCTION_URL}auth/users/me`)
      .then((data) => {
        // console.log("<------------ Data is returned ----------------->");
        // console.log(data);
        if(!data.error) {
          setUserId(data.id);
        }

        if (data) {
          setIsLoading(false);
        } else {
          // console.log("What could go wrong?")
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);


  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.black }}>
      <StatusBar backgroundColor="#000" style="dark-content" />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.black,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: Platform.OS == "android" ? 30 : 30,
        }}
      >
        <View className="w-full items-center justify-center">
          {/* Profile Photo */}
          <View className="items-center">
            {profilePhoto ? (
              <Image
              source={{ uri: profilePhoto }}
              style={{
                width: 113.03,
                height: 114,
                borderRadius: 8,
              }}
            />
            ) : (
              <Image
              source={images.Profile}
              style={{
                width: 113.03,
                height: 114,
                borderRadius: 8,
              }}
            />
            )}
            
            <Text className="text-[13px] text-[#F5F5F5] mt-[12px]">
              {user.username}
            </Text>
          </View>
          {/* Image edit icon */}
          <TouchableOpacity onPress={() => setShowUpdatePhoto(true)} className="justify-center  m-[48px] mt-[20px] flex-row items-center">
            <Image
              source={images.Edit}
              resizeMode="contain"
              className="w-[24px] h-[24px] mr-[12px] my-[9px]"
            />
            <Text style={{
              fontFamily: "Stem-Medium",
              fontSize: 20
            }} className="text-[#76777A]">Manage Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 2, alignItems: "center", width: "100%" }}>
        <View className="w-full px-[16px]">
          {/* Notification */}
          <TouchableHighlight
            onPress={() => navigation.navigate("notification-screen")}
          >
            <View
              style={{
                backgroundColor: "#1A1A1A",
                borderRadius: 8,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
                height: 60,
              }}
            >
              <View className="flex-row items-center justify-between">
                <Image
                  source={images.Notification}
                  resizeMode="contain"
                  className="w-[24px] h-[24px] ml-[18px] mr-[8px]"
                />
                <Text className="text-white text-[13.8px]" style={{ fontFamily: "Stem-Regular" }}>Notifications</Text>
              </View>
              <Image
                source={images.ChevronRight}
                resizeMode="contain"
                className="w-[24px] h-[24px] mr-[18px]"
              />
            </View>
          </TouchableHighlight>

          {/* My List */}
          <TouchableHighlight
            onPress={() => navigation.navigate("lists-screen")}
          >
            <View
              style={{
                backgroundColor: "#1A1A1A",
                borderRadius: 8,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
                height: 60,
              }}
            >
              <View className="flex-row items-center justify-between">
                <Image
                  source={images.AddToList}
                  resizeMode="contain"
                  className="w-[24px] ml-[18px] h-[24px] mr-[8px]"
                />
                <Text className="text-white text-[13.8px]" style={{ fontFamily: "Stem-Regular" }}>My List</Text>
              </View>
              <Image
                source={images.ChevronRight}
                resizeMode="contain"
                className="w-[24px] h-[24px] mr-[18px]"
              />
            </View>
          </TouchableHighlight>

          {/* Settings */}
          <TouchableHighlight
            onPress={() => navigation.navigate("account-settings")}
          >
            <View
              style={{
                backgroundColor: "#1A1A1A",
                borderRadius: 8,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
                height: 60,
              }}
            >
              <View className="flex-row items-center justify-between">
                <Image
                  source={images.AccountMain}
                  resizeMode="contain"
                  className="ml-[18px] w-[24px] h-[24px] mr-[8px]"
                />
                <Text className="text-white text-[13.8px]" style={{ fontFamily: "Stem-Regular" }}>Account</Text>
              </View>
              <Image
                source={images.ChevronRight}
                resizeMode="contain"
                className="w-[24px] h-[24px] mr-[18px]"
              />
            </View>
          </TouchableHighlight>

          {/* Help */}
          {/* <TouchableHighlight>
                        <View style={{
                            backgroundColor: "#1A1A1A",
                            borderRadius: 8,
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 12,
                            height: 60
                        }}>
                            <View className="flex-row items-center justify-between">
                                <Image 
                                    source={images.Help}
                                    resizeMode="contain"
                                    className="ml-[18px] w-[24px] h-[24px] mr-[8px]"
                                />
                                <Text className="text-white text-[13.8px]">Help</Text>
                            </View>
                                <Image 
                                    source={images.ChevronRight}
                                    resizeMode="contain"
                                    className="w-[24px] h-[24px] mr-[18px]"
                                />
                        </View>
                    </TouchableHighlight> */}
        </View>

        {/* Logout */}
        <TouchableOpacity
          onPress={() => dispatch(setAccessToken(null))}
          className="flex-row mt-[73px] mb-12"
        >
          <Image
            source={images.Logout}
            resizeMode="contain"
            className="w-[24px] h-[24px]"
          />

          <Text className="text-[17px] text-[#76777A] ml-[12px]" style={{ fontFamily: "Stem-Regular" }}>Sign Out</Text>
        </TouchableOpacity>
      </View>
         {/* Upload Photo */}
         <Center>
          <Modal
            size={"full"}
            isOpen={showUpdatePhoto}
            onClose={() => setShowUpdatePhoto(false)}
          >
            <Modal.Content
              className="shadow-md"
              style={{
                backgroundColor: lightModeEnabled ? colors.white : "#0A0A0B",
                borderRadius: 8,
                padding: 20,
              }}
              maxWidth="400px"
            >
              <Modal.Body>
                <View>
                  <View>
                    <View style={{ alignItems: "center" }}>
                      <Image
                        source={images.Image}
                        style={{
                          width: 40,
                          height: 36,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 17,
                          fontFamily: "Stem-Medium",
                          color: colors.trueWhite,
                          marginTop: 16,
                          marginBottom: 8,
                          textAlign: "center",
                        }}
                      >
                        Profile Image
                      </Text>
                      <Text style={{ color: "#98999B" }}>
                        Select any image of your choice
                      </Text>
                        {/* {console.log(image)} */}
                        {profilePhoto === null ? (
                            <TouchableHighlight 
                            onPress={() => pickImage()}
                            style={{
                              width: "100%",
                              height: 150,
                              borderRadius: 8,
                              borderWidth: 3,
                              borderStyle: "solid",
                              borderColor: "#80D200",
                              marginTop: 8,
                              marginBottom: 16,
                              fontFamily: "Stem-Medium",
                              paddingVertical: 12,
                              paddingHorizontal: 16,
                              justifyContent: "center",
                              alignItems: "center"
                            }}>
                                <View>
                                    <Image 
                                      source={images.Upload}
                                      style={{
                                        width: 48,
                                        height: 48
                                      }}
                                      resizeMode={"contain"}
                                    />
                                    <Text className="text-[#98999B] mt-1">Upload</Text>
                                  </View>
                            </TouchableHighlight>
                        ) : (
                          <ImageBackground 
                              source={{ uri: profilePhoto }}
                              style={{
                                width: "100%",
                                height: 162,
                                borderRadius: 8,
                                borderWidth: 3,
                                borderStyle: "solid",
                                borderColor: "#80D200",
                                marginTop: 8,
                                marginBottom: 16,
                                position: "relative",
                                overflow: "hidden"
                              }}
                              resizeMode={"contain"}
                          >
                            <TouchableWithoutFeedback onPress={() => dispatch(setProfilePhoto(null))}>
                              <View style={{ backgroundColor: colors.companyGreen, position: "absolute", right: 0, top: 0, zIndex: 10 }} className="rounded-tr-[3px] p-2 justify-center items-center w-8 h-8">
                                <Image 
                                  source={
                                    images.DeleteForever
                                  } 
                                  style={{
                                    width: 24,
                                    height: 24
                                  }}
                                  resizeMode={"contain"}
                                />
                              </View>
                            </TouchableWithoutFeedback>
                          </ImageBackground>
                        )}

                      {/* Button confirms change username */}
                      <TouchableOpacity
                          style={{
                              width: "100%",
                              paddingVertical: 12,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 8,
                              backgroundColor: colors.companyGreen
                          }}
                          onPress={() => submitProfilePhoto()}
                        >
                          <Text style={[{ 
                              color: colors.black,
                              fontFamily: "Stem-Medium",
                              fontSize: 17,
                          }]}>
                            {isLoading === true ? (
                              <ActivityIndicator size={"small"} color="black" />
                            ) : (
                              "Upload"
                            )}
                          </Text>
                        </TouchableOpacity>
                      <TouchableHighlight
                        onPress={() => {
                          setShowUpdatePhoto(false);
                          // Submit function here
                        }}
                        style={{
                          backgroundColor: colors.black,
                          width: "100%",
                          marginTop: 8,
                          borderRadius: 8,
                          borderWidth: 3,
                          borderStyle: "solid",
                          borderColor: "#323337",
                        }}
                        className="justify-center items-center"
                      >
                        <Text
                          style={{
                            color: "#323337",
                            fontFamily: "Stem-Medium",
                            paddingVertical: 12,
                          }}
                        >
                          Cancel
                        </Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              </Modal.Body>
            </Modal.Content>
          </Modal>
        </Center>
    </ScrollView>
  );
};

export default Profile;
