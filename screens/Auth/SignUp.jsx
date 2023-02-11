// jwt/verify

import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
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
import { useSelector } from "react-redux";
import { images } from "../../assets/images";
import { baseUrl, colors } from "../../components/shared";

// const verifyEndpoint = "https://web-production-c1bd.up.railway.app/auth/jwt/verify/"
// const refreshEndpoint = "https://web-production-c1bd.up.railway.app/auth/jwt/refresh/"

const SignUp = () => {
    const [firstIntBg, setFirstIntBg] = useState("");
    const [secondIntBg, setSecondIntBg] = useState("");
    const [thirdIntBg, setThirdIntBg] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [passValid, setPassValid] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [passwordFocus, setPasswordFocus] = useState("no");
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState("no");
    const [emailFocus, setEmailFocus] = useState("no");
    const [hideTxt, setHideTxt] = useState(true);
    const [responseData, setResponseData] = useState("");
    const [errorResponseData, setErrorResponseData] = useState("");
    const [isLoading, setIsLoading] = useState("false");

    // console.log(emailValid);

    const lightModeEnabled = useSelector((state) => state?.data?.lightModeEnabled);

    const navigation = useNavigation();

    const onSignUp = () => {
        const validMail = isEmail(email);
        const validPass = isPassword(password);

        // console.log(validMail);
        validMail ? setEmailValid(true) : setEmailValid(false);
        validPass ? setPassValid(true) : setPassValid(false);
            const userCredentials = {
                email,
                password,
                re_password: confirmPassword
            }

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
              
            postData(`${baseUrl}auth/users/`, userCredentials)
            .then((data) => {
                data.error && setErrorResponseData(data.error.message);
                // console.log(data);
                    if(!data.error) {
                        setResponseData(data);
                    }
                    
                    if(data) {
                        setIsLoading("false");
                        // console.log("<------------ Data is returned ----------------->");
                    } else {
                        // console.log("What could go wrong?")
                    }

                console.log(data)
                // console.log("<------------ ErrorResponseData ----------------->", errorResponseData);
            }).catch((error) => {
                setIsLoading("false");
                console.warn(error.message);
                setErrorResponseData(error.message);
            });
    }


    const isEmail = (emailAdress) => {
        // validation for mails of any kind
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
      if (emailAdress.match(regex)) 
        return true; 
    
       else 
        return false; 
    }

    const isPassword = (passValue) => {
        // validation that password is not lessthan 8 character and must contain 1 letter, 1 number, and 1 spercial  character
        let regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}/;

        if(passValue.match(regex))
        return true;

        else
        return false;
    }

    responseData && setTimeout(() => {
        navigation.navigate("Login");
    }, 5000)


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

                    {/* Error value */}
                    {errorResponseData && (
                        <View style={{
                            width: "100%",
                            bottom: 15,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Text className="opacity-30" style={{
                                color: "red",
                                textAlign: "center",
                                fontFamily: "Stem-Regular"
                            }}>
                                {errorResponseData}
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
                                Please check your mail to activate your account
                            </Text>
                        </View>
                    )}
                    <TextInput 
                        style={[styles.txtInput, { backgroundColor: firstIntBg ? firstIntBg : "#1a1a1a", marginBottom: !emailValid ? 5 : 16, borderWidth: 0.5, borderStyle: "solid", borderColor: !emailValid ? "red" : emailFocus === "yes" ? "#80D200" : null }]}
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
                    <View style={{ width: "100%", position: "relative" }}>
                        <TextInput
                            style={[styles.txtInput, { 
                                backgroundColor: secondIntBg ? secondIntBg : "#1a1a1a", 
                                marginBottom: 20, 
                                borderWidth: 0.5, 
                                borderStyle: "solid", 
                                borderColor: !passValid ? "red" : passwordFocus === "yes" ? "#80D200" : null 
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
                                    top: 20
                                }}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                    
                    <View style={{ width: "100%", position: "relative" }}>
                        <TextInput 
                            style={[styles.txtInput, { backgroundColor: thirdIntBg ? thirdIntBg : "#1a1a1a", marginBottom: !passValid ? 5 : 40, borderWidth: 0.5, borderStyle: "solid", borderColor: !passValid ? "red" : confirmPasswordFocus === "yes" ? "#80D200" : null }]}
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
                                    top: 20
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
                                textAlign: "center",
                                fontFamily: "Stem-Regular"
                            }}>
                                Not less than 8 char + Atleast 1 letter, 1 number, and 1 special character
                            </Text>
                    </View>
                    )}
                </KeyboardAvoidingView>

                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 40, marginHorizontal: 20 }}>
                {isLoading === "true" ? (
                    <TouchableOpacity
                        style={styles.signInBtn}
                        onPress={() => onSignUp()}
                        disabled={ password !== confirmPassword || !emailValid || !passValid || isLoading === "true" || email === "" || password === "" || confirmPassword === "" }
                    >
                        <ActivityIndicator size={"small"} color="white" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.signInBtn}
                        onPress={() => onSignUp()}
                        disabled={ password !== confirmPassword || !emailValid || !passValid || isLoading === "true" || email === "" || password === "" || confirmPassword === "" }
                    >
                        <Text style={styles.signInTxt}>Sign Up</Text>
                    </TouchableOpacity>
                )}
                </View>

                <View style={{
                    marginTop: 40,
                    flexDirection: "row", 
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <TouchableHighlight disabled onPress={() => {}}>
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
                </View>

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
        color: "#545558",
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