import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
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
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../assets/images";
import {
  baseUrl,
  colors,
  PRODUCTION_URL,
  ScreenHeight,
  ScreenWidth,
} from "../../components/shared";
import {
  setAccessToken, setPasswordResetToken,
  // setRefreshToken
} from "../../Redux/Slice/AppSlice";
import { Center, Modal, useDisclose } from "native-base";

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclose();

  const [firstIntBg, setFirstIntBg] = useState("");

  const [secondIntBg, setSecondIntBg] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [emailValid, setEmailValid] = useState(true);

  const [passValid, setPassValid] = useState(true);

  const [emailFocus, setEmailFocus] = useState("no");

  const [passwordFocus, setPasswordFocus] = useState("no");

  const [hideTxt, setHideTxt] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [error, setError] = useState("");

  const [generalError, setGeneralError] = useState("");

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const accessToken = useSelector((state) => state.data.accessToken);
  // console.log(accessToken);


  
  
  useEffect(() => {
    NetInfo.fetch().then(state => {
      !state.isConnected ? onOpen() : null
    });
  }, [])

  const loginAlready = () => {
    const userCredentials = {
      email,
      password,
    };

    const validMail = isEmail(email);
    const validPass = isPassword(password);

    validMail ? setEmailValid(true) : setEmailValid(false);
    validPass ? setPassValid(true) : setPassValid(false);

    setIsLoading(true);

    const postData = async (url = "", data) => {
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
    
    postData(
      `${PRODUCTION_URL}auth/token/login/`,
      userCredentials
    )
      .then((data) => {
        // console.log(data);

        dispatch(setAccessToken(data.auth_token));
        dispatch(setPasswordResetToken(data.auth_token));

        if (!data.error) {
            // console.log("Hey! there's no error", data);
            if(data.status_code === 201) {
              setSuccessMessage(data.detail);
              setIsLoading(false);
            }
        }
        if (data.error) {
            // console.log("OOPS! I see some errors", data);
            // setError(data?.error?.details?.email[0]);
            
            if(data.status_code !== 201) {
              setSuccessMessage(data.detail);
              setIsLoading(false);
            }
        }

        if(data.error) {
          setError(data.error.details.non_field_errors[0] + "\n" + "Check your email & password")
        }

        
        if (data) {
          setIsLoading(false);
          console.log(data);
        }

        // console.log("<------------ ErrorResponseData ----------------->", errorResponseData);
      })
      .catch((error) => {
        setIsLoading(false);
        // console.log("Hey there's an error here!", error);
        // const { non_field_errors } = error.error.details;
        // console.log(JSON.parse(non_field_errors));
      });
  };

  const isEmail = (emailAdress) => {
    let regex = "";
    // let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailAdress.length !== 0 || null) return true;
    else return false;
  };

  const isPassword = (passValue) => {

    if (passValue.length >= 4) return true;
    else return false;
  };

  // console.log(validMail);
  // !validMail && setEmailValid(false);
  // !validPass && setPassValid(false);

  const lightModeEnabled = useSelector(
    (state) => state?.data?.lightModeEnabled
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
      <View style={{ width: "100%", justifyContent: "center" }}>
        <KeyboardAvoidingView
          style={{ width: "100%",  alignItems: "center", justifyContent: "center", paddingHorizontal: 20 }}
        >
          <Image
            source={images.TvLogo}
            resizeMode={"contain"}
            style={{
              width: 152,
              height: 86,
              paddingBottom: 20,
            }}
          />

          <Text
            style={{
              fontFamily: "Stem-Medium",
              color: "#D6D6D7",
              fontSize: 17,
              marginBottom: 38,
            }}
          >
            Sign in
          </Text>

          <TextInput
            style={[
              styles.txtInput,
              {
                backgroundColor: firstIntBg ? firstIntBg : "#1a1a1a",
                marginBottom: !emailValid ? 10 : 16,
                borderWidth: 0.5,
                borderStyle: "solid",
                borderColor: !emailValid
                  ? "red"
                  : emailFocus === "yes"
                  ? "#80D200"
                  : null,
              },
            ]}
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

          <View style={{ width: "100%", position: "relative", justifyContent: "center" }}>
            <TextInput
              style={[
                styles.txtInput,
                {
                  backgroundColor: secondIntBg ? secondIntBg : "#1a1a1a",
                  marginBottom: !passValid ? 5 : 20,
                  borderWidth: 0.5,
                  borderStyle: "solid",
                  borderColor: !passValid
                    ? "red"
                    : passwordFocus === "yes"
                    ? "#80D200"
                    : null,
                },
              ]}
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
                    top: 23,
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
                    top: 20,
                  }}
                />
              </TouchableWithoutFeedback>
            )}
          </View>
          {/* Password Error Toast */}
          {!passValid && (
            <View
              style={{
                width: "100%",
                paddingVertical: 1,
              }}
            >
              <Text
                className="opacity-30"
                style={{
                  color: "red",
                  fontFamily: "Stem-Regular",
                }}
              >
                Not less than 4 characters
              </Text>
            </View>
          )}
          {error && (
                <View style={{
                    width: "100%",
                    bottom: 15,
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                }}>
                    <Text className="opacity-30 text-red-600" style={{
                        fontFamily: "Stem-Regular"
                    }}>
                        {error}
                    </Text>
                </View>
          )}
        </KeyboardAvoidingView>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
            marginHorizontal: 20,
          }}
        >
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
            disabled={ !emailValid || !passValid || isLoading === true || email === "" || password === "" }
            onPress={() => {
              loginAlready();
            //   dispatch(setAccessToken(accessToken))
            }}
          >
            <Text style={[styles.signInTxt, { color: password.length > 4 ? colors.black : "#D6D6D7" }]}>
              {isLoading === true ? (
                <ActivityIndicator size={"small"} color="white" />
              ) : (
                "Sign In"
              )}
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View
          style={{
            marginTop: 40,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableHighlight disabled onPress={() => {}}>
            <View className="items-center">
              <Image
                source={images.GoogleIcon}
                style={{
                  width: 70,
                  height: 70,
                }}
              />
              <Text
                style={{
                  color: "#545558",
                  fontFamily: "Stem-SemiLight",
                }}
              >
                Google
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight disabled onPress={() => {}}>
            <View className="items-center">
              <Image
                source={images.FaceBookIcon}
                style={{
                  width: 70,
                  height: 70,
                }}
              />
              <Text
                style={{
                  color: "#545558",
                  fontFamily: "Stem-SemiLight",
                }}
              >
                Facebook
              </Text>
            </View>
          </TouchableHighlight>
        </View> */}

        <View style={[{ width: "100%", marginTop: 40 }, styles.bottomActions]}>
          <TouchableOpacity
            onPress={() => navigation.navigate("password-reset")}
          >
            <Text style={styles.needHelp}>Forgot password?</Text>
          </TouchableOpacity>
          <View className="flex-row">
            <Text
              style={styles.signUp}
              onPress={() => navigation.navigate("Welcome")}
            >
              New to TSL TV?{" "}
            </Text>
            <TouchableHighlight onPress={() => navigation.navigate("SignUp")}>
              <Text
                style={{
                  color: "#98999B",
                  fontFamily: "Stem-Regular",
                  marginLeft: 10,
                }}
              >
                Sign Up now.
              </Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
    // paddingBottom: 30
  },
  txtInput: {
    width: "100%",
    paddingVertical: 20,
    borderRadius: 12,
    paddingLeft: 20,
    fontSize: 15,
    outlineWidth: 0,
    color: "#ffffff",
    fontFamily: "Stem-Medium",
  },
  signInTxt: {
    fontFamily: "Stem-Medium",
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
    height: 65,
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
    alignItems: "center",
  },
});

export default Login;
