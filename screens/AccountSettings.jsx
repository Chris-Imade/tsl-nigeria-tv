import { Center, Modal } from "native-base";
import React, { useState } from "react";
import { Platform, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native";
import { ActivityIndicator } from "react-native";
import { ScrollView, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../assets/images";
import { colors } from "../components/shared";
import { setAccessToken } from "../Redux/Slice/AppSlice";

const AccountSettings = () => {
    const [showModal, setShowModal] = useState(false);
    
    const [deleteUser, setDeleteUser] = useState();

    const [signOut, setSignOut] = useState(false);

    const lightModeEnabled = useSelector((state) => state.data.lightModeEnabled);

    const [changePassword, setChangePassword] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [secondIntBg, setSecondIntBg] = useState("");

    const [passwordFocus, setPasswordFocus] = useState("no");

    const [firstBg, setFirstBg] = useState("");

    const [newPasswordFocus, setNewPasswordFocus] = useState("");

    const [passValid, setPassValid] = useState(true);


    const [newPassValid, setNewPassValid] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();


    const isPassword = (passValue) => {
        // validation that password is not lessthan 8 character and must contain 1 letter, 1 number, and 1 spercial  character
        let regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}/;

        if(passValue.match(regex))
        return true;

        else
        return false;
    }

    const submitChangedPassword = () => {
        setIsLoading(true);
        const validPass = isPassword(currentPassword);
        const validNewPass = isPassword(newPassword);

        validPass ? setPassValid(true) : setPassValid(false);
        validNewPass ? setNewPassValid(true) : setNewPassValid(false);

        const userCredentials = {
            currentPassword,
            newPassword
        }

        const updatePassword = () => {
            setIsLoading(false);
        }
        setTimeout(() => {
            updatePassword();
        }, 5000)
    }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: lightModeEnabled ? colors.white : colors.black,
        paddingTop: Platform.OS === "android" ? 50 : 40,
      }}
    >
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            marginBottom: 40,
          }}
        >
          <Image
            source={images.CardMembership}
            style={{
              width: 18,
              height: 18,
            }}
            resizeMode={"contain"}
          />
          <Text
            style={{
              color: lightModeEnabled ? colors.black : colors.trueWhite,
              marginLeft: 8,
            }}
          >
            Member since April 2021
          </Text>
        </View>



        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={{
              color: "#98999B",
              fontFamily: "Stem-Medium",
              fontSize: 15,
              marginBottom: 13,
            }}
          >
            MEMBERSHIP
          </Text>
          <TouchableWithoutFeedback onPress={() => setChangePassword(true)}>
            <View
              className="bg-[#121212]"
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 8,
                position: "relative",
              }}
            >
              <View style={{ padding: 15 }}>
                <Text
                  style={{ fontFamily: "Stem-Medium", fontSize: 16 }}
                  className="text-[#F5F5F5]"
                >
                  Change password
                </Text>
                <Text style={{ color: "#98999B", fontSize: 9 }}>User3452m</Text>
              </View>
              <Image
                source={images.SettingR}
                style={{
                  width: 24,
                  height: 24,
                  position: "absolute",
                  right: 20,
                }}
                resizeMode={"contain"}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={{ marginHorizontal: 20, marginTop: 40 }}>
          <Text
            style={{
              color: "#98999B",
              fontFamily: "Stem-Medium",
              fontSize: 15,
              marginBottom: 13,
            }}
          >
            PRIVACY & SECURITY
          </Text>
          <TouchableWithoutFeedback
            onPress={() => setSignOut(true)}
          >
            <View
              className="bg-[#121212]"
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 8,
                position: "relative",
              }}
            >
              <View style={{ padding: 15 }}>
                <Text
                  style={{ fontFamily: "Stem-Medium", fontSize: 16 }}
                  className="text-[#F5F5F5]"
                >
                  Sign out of device
                </Text>
                <Text style={{ color: "#98999B", fontSize: 9 }}>User3452m</Text>
              </View>
              <Image
                source={images.SettingR}
                style={{
                  width: 24,
                  height: 24,
                  position: "absolute",
                  right: 20,
                }}
                resizeMode={"contain"}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>

        {/* <View style={{ marginHorizontal: 20, marginTop: 40 }}>
          <Text
            style={{
              color: "#98999B",
              fontFamily: "Stem-Medium",
              fontSize: 15,
              marginBottom: 13,
            }}
          >
            SETTINGS
          </Text>
          <TouchableWithoutFeedback>
            <View
              className="bg-[#121212]"
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 8,
                position: "relative",
              }}
            >
              <View style={{ padding: 15 }}>
                <Text
                  style={{ fontFamily: "Stem-Medium", fontSize: 16 }}
                  className="text-[#F5F5F5]"
                >
                  Delete account
                </Text>
                <Text style={{ color: "#98999B", fontSize: 9 }}>User3452m</Text>
              </View>
              <Image
                source={images.SettingR}
                style={{
                  width: 24,
                  height: 24,
                  position: "absolute",
                  right: 20,
                }}
                resizeMode={"contain"}
              />
            </View>
          </TouchableWithoutFeedback>
        </View> */}
      </ScrollView>


    {/* Change password */}
      <Center>
        <Modal size={"full"} isOpen={changePassword} onClose={() => setChangePassword(false)}>
          <Modal.Content className="shadow-md" style={{ backgroundColor: lightModeEnabled ? colors.white : "#0A0A0B", borderRadius: 8, padding: 20 }}  maxWidth="400px">
            <Modal.Body>
              <View>
                <View>
                    <View style={{ alignItems: "center" }}>
                        <Image 
                            source={images.SignOut}
                            style={{
                                width: 40,
                                height: 36
                            }}
                        />
                        <Text style={{ fontSize: 17, fontFamily: "Stem-Medium", color: colors.trueWhite, marginTop: 16, marginBottom: 8, textAlign: "center" }}>Sign Out</Text>
                        <Text style={{ color: "#98999B" }}>Are you sure you want to sign out?</Text>

                        {/*  Current password input */}
                        <TextInput style={{
                            backgroundColor: secondIntBg ? secondIntBg : "#1a1a1a",
                            width: "100%",
                            borderRadius: 8,
                            borderWidth: 3,
                            borderStyle: "solid",
                            borderColor: !passValid ? "red" : passwordFocus === "yes" ? "#80D200" : "#323337",
                            marginTop: 32,
                            marginBottom: 8,
                            color: "#98999B",
                            fontFamily: "Stem-Medium",
                            paddingVertical: 12,
                            paddingHorizontal: 16
                        }}
                            placeholder="Current Password"
                            placeholderTextColor={"#98999B"}
                            selectionColor={"white"}
                            onChangeText={(text) => setCurrentPassword(text)}
                            onBlur={() => {
                                setSecondIntBg(colors.darkMode);
                                setPasswordFocus("no");
                            }}
                            onFocus={() => {
                                setSecondIntBg(colors.firstGradientShade);
                                setPasswordFocus("yes");
                            }}
                            secureTextEntry={true}
                            />

                        <TextInput style={{
                            backgroundColor: firstBg ? firstBg : "#1a1a1a",
                            width: "100%",
                            borderRadius: 8,
                            borderWidth: 3,
                            borderStyle: "solid",
                            borderColor: !newPassValid ? "red" : newPasswordFocus === "yes" ? "#80D200" : "#323337",
                            marginTop: 8,
                            marginBottom: 16,
                            color: "#98999B",
                            fontFamily: "Stem-Medium",
                            paddingVertical: 12,
                            paddingHorizontal: 16
                        }}
                            placeholder="New Password"
                            placeholderTextColor={"#98999B"}
                            selectionColor={"white"}
                            onChangeText={(text) => setNewPassword(text)}
                            onBlur={() => {
                                setFirstBg(colors.darkMode);
                                setNewPasswordFocus("no");
                            }}
                            onFocus={() => {
                                setFirstBg(colors.firstGradientShade);
                                setNewPasswordFocus("yes");
                            }}
                            secureTextEntry={true}
                        />


                        {/* Button confirms Signout */}
                        {isLoading ? (
                            <TouchableHighlight onPress={() => {
                                // setChangePassword(false);
                                submitChangedPassword();
                                // Submit function here
                            }} style={{
                                backgroundColor: colors.companyGreen,
                                width: "100%",
                                borderRadius: 8
                            }} className="justify-center items-center">
                                <Text style={{
                                    color: "#191A1C",
                                    fontFamily: "Stem-Medium",
                                    paddingVertical: 12
                                }}>
                                    <ActivityIndicator size={"small"} color="white" />
                                </Text>
                            </TouchableHighlight>
                        ) : (
                            <TouchableHighlight onPress={() => {
                                // setChangePassword(false);
                                submitChangedPassword();
                                // Submit function here
                            }} style={{
                                backgroundColor: colors.companyGreen,
                                width: "100%",
                                borderRadius: 8
                            }} className="justify-center items-center">
                                <Text style={{
                                    color: "#191A1C",
                                    fontFamily: "Stem-Medium",
                                    paddingVertical: 12
                                }}>Update password</Text>
                            </TouchableHighlight>
                        )}
                        <TouchableHighlight onPress={() => {
                            // setChangePassword(false);
                            setChangePassword(false);
                            // Submit function here
                            }} style={{
                                backgroundColor: colors.black,
                                width: "100%",
                                marginTop: 8,
                                borderRadius: 8,
                                borderWidth: 3,
                                borderStyle: "solid",
                                borderColor: "#323337"
                            }} className="justify-center items-center">
                                <Text style={{
                                color: "#191A1C",
                                fontFamily: "Stem-Medium",
                                paddingVertical: 12
                            }}>Cancel</Text>
                        </TouchableHighlight>
                    </View>
                </View>
              </View>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>


      
      {/* Signout Modal */}
      <Center>
        <Modal isOpen={signOut} onClose={() => setSignOut(false)}>
          <Modal.Content className="shadow-md" style={{ backgroundColor: lightModeEnabled ? colors.white : "#0A0A0B", borderRadius: 8, padding: 20 }}  maxWidth="400px">
            <Modal.Body>
              <View>
                <View>
                    <View style={{ alignItems: "center" }}>
                        <Image 
                            source={images.SignOut}
                            style={{
                                width: 40,
                                height: 36
                            }}
                        />
                        <Text style={{ fontSize: 17, fontFamily: "Stem-Medium", color: colors.trueWhite, marginTop: 16, marginBottom: 8, textAlign: "center" }}>Sign Out</Text>
                        <Text style={{ color: "#98999B" }}>Are you sure you want to sign out?</Text>

                        {/* Button confirms Signout */}
                        <TouchableHighlight onPress={() => dispatch(setAccessToken(null))} style={{
                            backgroundColor: colors.companyGreen,
                            width: "100%",
                            marginTop: 32,
                            borderRadius: 8
                        }} className="justify-center items-center">
                            <Text style={{
                                color: "#191A1C",
                                fontFamily: "Stem-Medium",
                                paddingVertical: 12
                            }}>Confirm</Text>
                        </TouchableHighlight>

                        {/* Button to cancel signout */}
                        <TouchableHighlight onPress={() => setSignOut(false)} style={{
                            backgroundColor: colors.black,
                            width: "100%",
                            marginTop: 8,
                            borderRadius: 8,
                            borderWidth: 3,
                            borderStyle: "solid",
                            borderColor: "#323337"
                        }} className="justify-center items-center">
                            <Text style={{
                                color: "#191A1C",
                                fontFamily: "Stem-Medium",
                                paddingVertical: 12
                            }}>Cancel</Text>
                        </TouchableHighlight>
                    </View>
                </View>
              </View>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>

    </SafeAreaView>
  );
};

export default AccountSettings;
