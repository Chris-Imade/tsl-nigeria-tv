// jwt/verify

import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { 
    KeyboardAvoidingView, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    View, 
    Text, 
    Image, 
    ScrollView,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ActivityIndicator
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../assets/images";
import { baseUrl, colors } from "../../components/shared";
import NetInfo from "@react-native-community/netinfo";
import { Center, Modal, useDisclose } from "native-base";
import * as Google from 'expo-auth-session/providers/google';
import { setAccessToken, setGoogleAuth, setProfilePhoto } from "../../Redux/Slice/AppSlice";


// const verifyEndpoint = "https://web-production-c1bd.up.railway.app/auth/jwt/verify/"
// const refreshEndpoint = "https://web-production-c1bd.up.railway.app/auth/jwt/refresh/"

const SignUp = () => {
    const { isOpen, onOpen, onClose } = useDisclose();
    const [firstIntBg, setFirstIntBg] = useState("");
    const [secondIntBg, setSecondIntBg] = useState("");
    const [thirdIntBg, setThirdIntBg] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [passValid, setPassValid] = useState(true);
    const [passwordFocus, setPasswordFocus] = useState("no");
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState("no");
    const [emailFocus, setEmailFocus] = useState("no");
    const [hideTxt, setHideTxt] = useState(true);
    const [responseData, setResponseData] = useState("");
    const [errorResponseData, setErrorResponseData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [usernameBg, setUsernameBg] = useState("");
    const [usernameFocus, setUsernameFocus] = useState("no");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userCreated, setUserCreated] = useState(false);

    // Google authentication
    const [userInfo, setUserInfo] = useState();
    const [auth, setAuth] = useState();
    const [requireRefresh, setRequireRefresh] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "437420737045-mat72m2tbd7t08j32rfq5944kdusepv4.apps.googleusercontent.com",
        iosClientId: "437420737045-9hibdld6lirhfs62fjm8ugcie82dfo2p.apps.googleusercontent.com",
        expoClientId: "437420737045-shk7q876jc3k27aa04vnva06kmqce09e.apps.googleusercontent.com",
      });

    
    // console.log(emailValid);
    const dispatch = useDispatch();

    const lightModeEnabled = useSelector((state) => state?.data?.lightModeEnabled);
    const googleAuth = useSelector((state) => state?.data?.googleAuth);

    const navigation = useNavigation();

    const onSignUp = () => {
        const validMail = isEmail(email);
        const validPass = isPassword(password);

        // console.log(validMail);
        validMail ? setEmailValid(true) : setEmailValid(false);
        validPass ? setPassValid(true) : setPassValid(false);
            const userCredentials = {
                username,
                email,
                password,
                password2: confirmPassword,
            }

            setIsLoading(true);

            const postData = async(url = '', data) => {
                // Default options are marked with *
                const response = await fetch(url, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'no-cors',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'
                    },
                    body: JSON.stringify(data) // body data type must match "Content-Type" header
                  });
                  
                
                return response.json(); // parses JSON response into native JavaScript objects
              }
              
            postData(`${baseUrl}api/user/`, userCredentials)
            .then((data) => {
                if(!data.error) {
                    setResponseData(data);
                    navigation.navigate("Login");
                    console.log(data);
                }
                    console.log(data);
                    
                    if(data) {
                        setIsLoading(false);
                        console.log("<------------ Data is returned ----------------->");
                    } else {
                        console.log("What could go wrong?")
                    }
                    
                }).catch((error) => {
                    setIsLoading(false);
                    setErrorResponseData(error.message);
                });
            }
            console.log("<------------ ErrorResponseData ----------------->", errorResponseData);
            
    responseData && navigation.navigate("Login");


    const isEmail = (emailAdress) => {
        // validation for mails of any kind
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
      if (emailAdress.match(regex)) 
        return true; 
    
       else 
        return false;
    }

    const isPassword = (passValue) => {

        if (passValue.length >= 4) return true;
        else return false;
    };



    // Everything google sign in
    useEffect(() => {
        // console.log(response);
        if (response?.type === "success") {
          setAuth(response.authentication);
            // console.log("Response: ", response);
            // dispatch(setGoogleAuth(response.authentication));
        }
    }, [response]);

    useEffect(() => {
        const getPersistedAuth = async () => {
          if (googleAuth != null) {
            setAuth(googleAuth);
            // console.log(googleAuth);
    
            setRequireRefresh(!AuthSession.TokenResponse.isTokenFresh({
              expiresIn: googleAuth.expiresIn,
              issuedAt: googleAuth.issuedAt
            }));
          }
        };
        getPersistedAuth();
        const getUser = async() => {
            if(auth) {
                let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
                    headers: { Authorization: `Bearer ${auth?.accessToken}` }
                });
            
                userInfoResponse?.json().then(data => {
                    setUserInfo(data);
                    dispatch(setProfilePhoto(data?.picture));
                      setUsername(data?.name);
                      setEmail(data?.email);
                      setPassword(data?.id+"TSL_Dynamic-user");
                      setConfirmPassword(data?.id+"TSL_Dynamic-user");
                    console.log(data);
                });
            }
        }
        getUser();
    }, []);

    const getClientId = () => {
        if (Platform.OS === "ios") {
          return "437420737045-9hibdld6lirhfs62fjm8ugcie82dfo2p.apps.googleusercontent.com";
        } else if (Platform.OS === "android") {
          return "437420737045-mat72m2tbd7t08j32rfq5944kdusepv4.apps.googleusercontent.com";
        } else {
          console.log("Invalid platform - not handled");
        }
      }

      const refreshToken = async () => {
        const clientId = getClientId();
        console.log(auth);
        const tokenResult = await AuthSession.refreshAsync({
          clientId: clientId,
          refreshToken: auth.refreshToken
        }, {
          tokenEndpoint: "https://www.googleapis.com/oauth2/v4/token"
        });
    
        tokenResult.refreshToken = auth.refreshToken;
    
        setAuth(tokenResult);
        await AsyncStorage.setItem("auth", JSON.stringify(tokenResult));
        setRequireRefresh(false);
      };

      if (requireRefresh) {
        console.log("Requires Refresh");
      }

      const signInWithGoogle = async() => {
        setIsLoading(true);
            switch (userCreated) {
                case userCreated === false:
                    const postData = async(url = '', data) => {
                        // Default options are marked with *
                        const response = await fetch(url, {
                            method: 'POST', // *GET, POST, PUT, DELETE, etc.
                            mode: 'no-cors',
                            headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                            },
                            body: JSON.stringify(data) // body data type must match "Content-Type" header
                        });
                        
                        
                        return response.json(); // parses JSON response into native JavaScript objects
                    }
                    
                    postData(`https://web-production-de75.up.railway.app/api/user/`, { username, email, password, password2: confirmPassword })
                    .then((data) => {
                        if(!data.error) {
                            setResponseData(data);
                            setUserCreated(true);
                            console.log(data);
                        }
                            console.log(data);
                            
                            if(data) {
                                setIsLoading(false);
                                console.log("<------------ Data is returned ----------------->");
                            } else {
                                console.log("What could go wrong?")
                            }
                            
                        }).catch((error) => {
                            setIsLoading(false);
                            setErrorResponseData(error.message);
                        });
                    break;
                case userCreated === true:
                    const login = async (url = "", data) => {
                        // Default options are marked with *
                        const response = await fetch(url, {
                          method: "POST", // *GET, POST, PUT, DELETE, etc.
                          mode: "no-cors",
                          headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                          },
                          body: JSON.stringify(data), // body data type must match "Content-Type" header
                        });
                  
                        return response.json(); // parses JSON response into native JavaScript objects
                      };
            
                      login(
                        `https://web-production-de75.up.railway.app/auth/token/login/`,
                        { email, password }
                      )
                      .then((data) => {
                            console.log(data);
                    
                            dispatch(setAccessToken(data.auth_token));
                            if (!data.error) {
                            console.log("Hey! there's no error", data);
                            }
                    
                            console.log("Am getting something!");
                            
                            if (data) {
                            setIsLoading(false);
                            console.log("<------------ Data is returned ----------------->");
                            } else {
                            console.log("What could go wrong?")
                            
                            }
                    
                            // console.log("<------------ ErrorResponseData ----------------->", errorResponseData);
                        })
                        .catch((error) => {
                            setIsLoading(false);
                            console.log("Hey there's an error here!", error);
                      });
                default:
                    break;
            }
    }
      

    useEffect(() => {
        NetInfo.fetch().then(state => {
          !state.isConnected ? onOpen() : null
        });
    }, [])

    return (
        <ScrollView 
        showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}>
            <View style={{ width: "100%", justifyContent: "center", flex: 2 }}>
                <KeyboardAvoidingView style={{ width: "100%",  alignItems: "center", justifyContent: "center", paddingHorizontal: 20 }}>

                    <Image 
                        source={images.TvLogo}
                        resizeMode={"contain"}
                        style={{
                            width: 152,
                            height: 86,
                            marginTop: 68,
                            marginBottom: 20
                        }}
                    />

                    <Text style={{
                        fontFamily: "Stem-Medium",
                        color: "#D6D6D7",
                        fontSize: 17,
                        marginBottom: 38
                    }}>
                        Sign up
                    </Text>

                    <TextInput 
                        style={[styles.txtInput, { color: "white", backgroundColor: firstIntBg ? usernameBg : "#1a1a1a", marginBottom: !emailValid || usernameError ? 10 : 16, borderWidth: 0.5, borderStyle: "solid", borderColor: usernameFocus === "yes" ? "#80D200" : null }]}
                        placeholder="Username"
                        placeholderTextColor={"#545558"}
                        onBlur={() => {
                            setUsernameBg(colors.darkMode);
                            setUsernameFocus("no");
                        }}
                        onFocus={() => {
                            setUsernameBg(colors.firstGradientShade);
                            setUsernameFocus("yes");
                        }}
                        onChangeText={(text) => setUsername(text)}
                        keyboardType={"email-address"}
                        selectionColor={"white"}
                    />                    
                    <TextInput 
                        style={[styles.txtInput, { color: "white", backgroundColor: firstIntBg ? firstIntBg : "#1a1a1a", marginBottom: !emailValid || emailError ? 10 : 16, borderWidth: 0.5, borderStyle: "solid", borderColor: !emailValid ? "red" : emailFocus === "yes" ? "#80D200" : null }]}
                        placeholder="Enter your email"
                        placeholderTextColor={"#545558"}
                        onBlur={() => {
                            setFirstIntBg(colors.darkMode);
                            setEmailFocus("no");
                        }}
                        onFocus={() => {
                            setFirstIntBg(colors.firstGradientShade);
                            setEmailFocus("yes");
                        }}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType={"email-address"}
                        selectionColor={"white"}
                    />
                    {/* Error Toast */}
                    {!emailValid && (
                        <View style={{
                            width: "100%",
                            justifyContent: "center",
                            marginBottom: !emailValid ? 5 : 0,
                        }}>
                            <Text className="text-red-600 opacity-30" style={{
                                fontFamily: "Stem-Regular",
                                textAlign: "center"
                            }}>
                                Invalid email! please enter a valid email
                            </Text>
                        </View>
                    )}
                    {/* Error value */}
                    {emailError && (
                        <View style={{
                            width: "100%",
                            bottom: 15,
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            marginTop: 10
                        }}>
                            <Text className="opacity-30" style={{
                                color: "red",
                                fontFamily: "Stem-Regular"
                            }}>
                                {emailError}
                            </Text>
                        </View>
                    )}
                    
                    {/* Response value */}
                    {responseData && (
                        <View style={{
                            width: "100%",
                            bottom: 15,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Text style={{
                                color: "#80D200",
                                textAlign: "center",
                                fontFamily: "Stem-Regular"
                            }}>
                                Kindly check your mail to activate your account😊
                            </Text>
                        </View>
                    )}
                    <View style={{ width: "100%", position: "relative" }}>
                        <TextInput
                            style={[styles.txtInput, { 
                                backgroundColor: secondIntBg ? secondIntBg : "#1a1a1a", 
                                marginBottom: 20, 
                                borderWidth: 0.5, 
                                borderStyle: "solid", 
                                borderColor: !passValid ? "red" : passwordFocus === "yes" ? "#80D200" : null,
                                color: "white"
                            }]}
                            placeholder="Password"
                            placeholderTextColor={"#545558"}
                            onBlur={() => {
                                setSecondIntBg(colors.darkMode);
                                setPasswordFocus("no");
                            }}
                            onFocus={() => {
                                setSecondIntBg(colors.firstGradientShade);
                                setPasswordFocus("yes");
                            }}
                            secureTextEntry={hideTxt}
                            onChangeText={(text) => setPassword(text)}
                            selectionColor={"white"}
                        />
                        <TouchableWithoutFeedback onPress={() => setHideTxt(!hideTxt)}>
                            <Image 
                                source={images.EyeClose}
                                style={{
                                    width: 24,
                                    height: 24,
                                    position: "absolute",
                                    right: 20,
                                    top: 23
                                }}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                    
                    <View style={{ width: "100%", position: "relative" }}>
                        <TextInput 
                            style={[styles.txtInput, { color: "white", backgroundColor: thirdIntBg ? thirdIntBg : "#1a1a1a", marginBottom: !passValid || passwordError ? 15 : 40, borderWidth: 0.5, borderStyle: "solid", borderColor: !passValid ? "red" : confirmPasswordFocus === "yes" ? "#80D200" : null }]}
                            placeholder="Confirm Password"
                            placeholderTextColor={"#545558"}
                            onBlur={() => {
                                setThirdIntBg(colors.darkMode);
                                setConfirmPasswordFocus("no");
                            }}
                            onFocus={() => {
                                setThirdIntBg(colors.firstGradientShade);
                                setConfirmPasswordFocus("yes");
                            }}
                            secureTextEntry={hideTxt}
                            onChangeText={(text) => setConfirmPassword(text)}
                            selectionColor={"white"}
                        />
                        <TouchableWithoutFeedback onPress={() => setHideTxt(!hideTxt)}>
                            <Image 
                                source={images.EyeClose}
                                style={{
                                    width: 24,
                                    height: 24,
                                    position: "absolute",
                                    right: 20,
                                    top: 23
                                }}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                    {/* Password Error Toast */}
                    {!passValid && (
                        <View style={{
                                width: "100%",
                                justifyContent: "center",
                                paddingVertical: 1,
                        }}>
                            <Text className="text-red-600 opacity-30" style={{
                                fontFamily: "Stem-Regular"
                            }}>
                                Not less than 8 char + Atleast 1 letter, 1 number, and 1 special character
                            </Text>
                    </View>
                    )}
                    
                    {/* Password network errors */}
                    {passwordError && (
                        <View style={{
                            width: "100%",
                            bottom: 15,
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                        }}>
                            <Text className="text-red-600 opacity-30" style={{
                                fontFamily: "Stem-Regular"
                            }}>
                                {passwordError}
                            </Text>
                        </View>
                    )}
                </KeyboardAvoidingView>

                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 40, marginHorizontal: 20 }}>
                {isLoading === true ? (
                    <TouchableOpacity
                        style={{
                            width: "100%",
                            paddingVertical: 17,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 12,
                            borderWidth: password.length > 4 ? null : 1.5,
                            borderStyle: password.length > 4 ? null : "solid",
                            borderColor: password.length > 4 ? null : colors.grayMedium,
                            height: 65,
                            backgroundColor: password.length > 4 ? colors.companyGreen : null
                        }}
                    >
                        <ActivityIndicator size={"small"} color="black" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={{
                            width: "100%",
                            paddingVertical: 17,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 12,
                            borderWidth: confirmPassword.length > 4 ? null : 1.5,
                            borderStyle: confirmPassword.length > 4 ? null : "solid",
                            borderColor: confirmPassword.length > 4 ? null : colors.grayMedium,
                            height: 65,
                            backgroundColor: confirmPassword.length > 4 ? colors.companyGreen : null
                        }}
                        onPress={() => {
                            onSignUp();
                            setPasswordError("");
                            setEmailError("");
                        }}
                        disabled={ password !== confirmPassword || !emailValid || !passValid || isLoading === true || email === "" || password === "" || confirmPassword === "" }
                    >
                        <Text style={[styles.signInTxt, { color: confirmPassword.length > 4 ? colors.black : "#D6D6D7" }]}>Sign Up</Text>
                    </TouchableOpacity>
                )}
                </View>

                {/* <View style={{
                    marginTop: 40,
                    flexDirection: "row", 
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <TouchableHighlight onPress={() => {
                        promptAsync({ useProxy: true, showInRecents: true });
                        userInfo && signInWithGoogle();
                    }}>
                        <View className='items-center'>
                            <Image 
                                source={images.GoogleIcon}
                                style={{
                                    width: 70,
                                    height: 70
                                }}
                            />
                            <Text style={{
                                color: "#545558",
                                fontFamily: "Stem-SemiLight",
                            }}>Google</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight disabled onPress={() => {}}>
                        <View className='items-center'>
                            <Image 
                                source={images.FaceBookIcon}
                                style={{
                                    width: 70,
                                    height: 70
                                }}
                            />
                            <Text style={{
                                color: "#545558",
                                fontFamily: "Stem-SemiLight",
                            }}>Facebook</Text>
                        </View>
                    </TouchableHighlight>
                </View> */}

                <View style={[{ width: "100%", marginTop: 40 }, styles.bottomActions]}>
                    <TouchableOpacity onPress={() => {}}><Text style={styles.needHelp}>Need help?</Text></TouchableOpacity>
                    <View className="flex-row">
                        <Text style={styles.signUp}>Already have an account? </Text>
                        <TouchableHighlight onPress={() => navigation.navigate("Login")}>
                            <Text style={{ color: "#98999B", fontFamily: "Stem-Regular", marginLeft: 10 }}>Sign In now.</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>

            {/* Signout Modal */}
            <Center>
                <Modal isOpen={isOpen} onClose={onClose}>
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
                            source={images.NoNetwork}
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
                            No Network
                            </Text>
                            <Text style={{ color: "#98999B", textAlign: "center" }}>
                            We cannot detect a network connection on this device. Please check your device settings.
                            </Text>

                            {/* Button to cancel signout */}
                            <TouchableHighlight
                            onPress={() => onClose()}
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
                                color: "#191A1C",
                                fontFamily: "Stem-Medium",
                                paddingVertical: 12,
                                }}
                            >
                                Ok
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
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: colors.black,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 87
    },
    txtInput: {
        width: "100%",
        paddingVertical: 20,
        borderRadius: 12,
        paddingLeft: 20,
        fontSize: 15,
        outlineWidth: 0,
        fontFamily: "Stem-SemiLight",
    },
    signInTxt: {
        fontFamily: "Stem-Medium",
        color: "#D6D6D7",
        fontSize: 17,
    },
    signInBtn: {
        width: "100%",
        paddingVertical: 17,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        borderWidth: 1.5, 
        borderStyle: "solid", 
        borderColor: colors.grayMedium
    },
    needHelp: {
        marginBottom: 20,
        color: "#545558",
        fontFamily: "Stem-SemiLight",
    },
    signUp: {
        color: "#545558",
        fontFamily: "Stem-Regular",
    },
    bottomActions: {
        justifyContent: "center",
        alignItems: "center"
    }
})

export default SignUp;