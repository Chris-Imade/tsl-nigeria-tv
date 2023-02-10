import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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
import { colors, ScreenHeight, ScreenWidth } from "../../components/shared";
import { 
    setAccessToken, 
    setRefreshToken 
} from "../../Redux/Slice/AppSlice";

const Login = () => {

    const [firstIntBg, setFirstIntBg] = useState("");
    const [secondIntBg, setSecondIntBg] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [passValid, setPassValid] = useState(true);
    const [emailFocus, setEmailFocus] = useState("no");
    const [passwordFocus, setPasswordFocus] = useState("no");
    const [hideTxt, setHideTxt] = useState(true);
    const [responseData, setResponseData] = useState("");
    const [errorResponseData, setErrorResponseData] = useState("");
    const [isLoading, setIsLoading] = useState("false");

    const dispatch = useDispatch();

    const navigation = useNavigation();

    
    
    const loginAlready = () => {

        const userCredentials = {
            email,
            password
        } 
        
        const validMail = isEmail(email);
        const validPass = isPassword(password);

        // console.log(validMail);
        validMail ? setEmailValid(true) : setEmailValid(false);
        validPass ? setPassValid(true) : setPassValid(false);

        setIsLoading("true");


        const postData = async(url = '', data) => {
            // Default options are marked with *
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
              });
              
              
            return response.json(); // parses JSON response into native JavaScript objects
          }
          
            postData("https://web-production-c1bd.up.railway.app/auth/token/login/", userCredentials)
            .then((data) => {
                data.error && setErrorResponseData(data.error.message);
                console.log(data);
                    if(!data.error) {
                        setResponseData(data);
                    }
                    
                    if(data) {
                        setIsLoading("false");
                        console.log("<------------ Data is returned ----------------->");
                    } else {
                        console.log("What could go wrong?")
                    }

                console.log(data)
                console.log("<------------ ErrorResponseData ----------------->", errorResponseData);
            });

        }

        



    const isEmail = (emailAdress) => {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
      if (emailAdress.match(regex)) 
        return true; 
    
       else 
        return false; 
    }
    
    const isPassword = (passValue) => {
        let regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}/;

        if(passValue.match(regex))
        return true;

        else
        return false;
    }

    // console.log(validMail);
    // !validMail && setEmailValid(false);
    // !validPass && setPassValid(false);

    
    const lightModeEnabled = useSelector((state) => state?.data?.lightModeEnabled);

    return (
        <ScrollView 
            contentContainerStyle={styles.container}>
            <View style={{ width: "100%", justifyContent: "center", flex: 1 }}>
                <KeyboardAvoidingView style={{ width: "100%",  alignItems: "center", justifyContent: "center", paddingHorizontal: 20 }}>
                    <Image 
                        source={images.TvLogo}
                        resizeMode={"contain"}
                        style={{
                            width: 152,
                            height: 86,
                            marginBottom: 20
                        }}
                    />

                    <Text style={{
                        fontFamily: "Stem-Medium",
                        color: "#D6D6D7",
                        fontSize: 17,
                        marginBottom: 38
                    }}>Sign in</Text>

                    {/* Error value */}
                    {errorResponseData && (
                        <View style={{
                            width: "100%",
                            bottom: 30,
                            justifyContent: "center",
                            alignItems: "center",
                            paddingVertical: 1,
                        }}>
                            <Text style={{
                                color: "red",
                                textAlign: "center",
                                fontFamily: "Stem-Regular"
                            }}>{errorResponseData}</Text>
                        </View>
                    )}

                    <TextInput 
                        style={[
                            styles.txtInput, 
                            { 
                                backgroundColor: firstIntBg ? firstIntBg : "#1a1a1a", 
                                marginBottom: 16, 
                                borderWidth: 0.5, 
                                borderStyle: "solid", 
                                borderColor: !emailValid ? "red" : emailFocus === "yes" ? "#80D200" : null 
                            }]}
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
                    <View style={{ width: "100%", position: "relative" }}>
                        <TextInput
                            style={[styles.txtInput, { backgroundColor: secondIntBg ? secondIntBg : "#1a1a1a", marginBottom: 20, borderWidth: 0.5, borderStyle: "solid", borderColor: !passValid ? "red" : passwordFocus === "yes" ? "#80D200" : null }]}
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
                        {hideTxt ? (
                            <TouchableWithoutFeedback onPress={() => setHideTxt(!hideTxt)}>
                                <Image 
                                    source={images.EyeClose}
                                    style={{
                                        width: 24,
                                        height: 24,
                                        position: "absolute",
                                        right: 20,
                                        top: 20
                                    }}
                                />
                            </TouchableWithoutFeedback>
                        ) : (
                            <TouchableWithoutFeedback onPress={() => setHideTxt(!hideTxt)}>
                                <Image 
                                    source={images.EyeOpened}
                                    style={{
                                        width: 24,
                                        height: 24,
                                        position: "absolute",
                                        right: 20,
                                        top: 20
                                    }}
                                />
                            </TouchableWithoutFeedback>
                        )}
                    </View>
                </KeyboardAvoidingView>

                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 40, marginHorizontal: 20 }}>
                    <TouchableOpacity
                        style={styles.signInBtn}
                        disabled={isLoading === "true"}
                        onPress={() => {
                            loginAlready();
                        }}
                    >
                        <Text style={styles.signInTxt}>{isLoading === "true" ? (<ActivityIndicator size={"small"} color="white" />) :"Sign In"}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    marginTop: 40,
                    flexDirection: "row", 
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <TouchableHighlight onPress={() => {}}>
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
                    <TouchableHighlight onPress={() => {}}>
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
                </View>

                <View style={[{ width: "100%", marginTop: 40 }, styles.bottomActions]}>
                    <TouchableOpacity onPress={() => {}}><Text style={styles.needHelp}>Need help?</Text></TouchableOpacity>
                    <View className="flex-row">
                        <Text style={styles.signUp} onPress={() => navigation.navigate("Welcome")}>New to TSL TV? </Text>
                        <TouchableHighlight onPress={() => navigation.navigate("SignUp")}>
                            <Text style={{ color: "#98999B", fontFamily: "Stem-Regular", marginLeft: 10 }}>Sign Up now.</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>

            {/* Email Error Toast */}
            {!emailValid && (
                <View style={{
                    position: "absolute",
                    backgroundColor: "red",
                    width: "100%",
                    bottom: 0,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 1
                }}>
                    <Text style={{
                        color: colors.white,
                        fontFamily: "Stem-Regular"
                    }}>Invalid email! please enter a valid email</Text>
                </View>
            )}

            {/* Password Error Toast */}
            {!passValid && (
                <View style={{
                    position: "absolute",
                    backgroundColor: "red",
                    width: "100%",
                    bottom: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 1
                }}>
                    <Text style={{
                        color: colors.white,
                        textAlign: "center",
                        fontFamily: "Stem-Regular"
                    }}>Not less than 8 char + Atleast 1 letter, 1 number, and 1 special character</Text>
            </View>
            )}

            {/* Show error logging in spinnerr */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        justifyContent: "center",
        alignItems: "center"
    },
    txtInput: {
        width: "100%",
        paddingVertical: 20,
        borderRadius: 12,
        paddingLeft: 20,
        fontSize: 15,
        outlineWidth: 0,
        color: "#545558",
        fontFamily: "Stem-Medium",
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
        borderColor: colors.grayMedium,
        height: 65
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

export default Login;