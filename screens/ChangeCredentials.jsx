import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "react-native";
import {
  Image,
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { images } from "../assets/images";
import { colors } from "../components/shared";

const ChangeCredentials = () => {
  const [errorResponseData, setErrorResponseData] = useState("");
  const [responseData, setResponseData] = useState("");
  const [firstIntBg, setFirstIntBg] = useState("");
  const [secondIntBg, setSecondIntBg] = useState("");
  const [thirdIntBg, setThirdIntBg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passValid, setPassValid] = useState(true);
  const [passwordFocus, setPasswordFocus] = useState("no");
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState("no");
  const [emailFocus, setEmailFocus] = useState("no");
  const [hideTxt, setHideTxt] = useState(true);
  const [isLoading, setIsLoading] = useState("false");

  const lightModeEnabled = useSelector(
    (state) => state?.data?.lightModeEnabled
  );

  const onLogin = () => {
    const validMail = isEmail(email);
    const validPass = isPassword(password);

    // console.log(validMail);
    validMail ? setEmailValid(true) : setEmailValid(false);
    validPass ? setPassValid(true) : setPassValid(false);
    const userCredentials = {
      email,
      password,
      re_password: confirmPassword,
    };

    setIsLoading("true");
  };

  const isEmail = (emailAdress) => {
    // validation for mails of any kind
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailAdress.match(regex)) return true;
    else return false;
  };

  const isPassword = (passValue) => {
    // validation that password is not lessthan 8 character and must contain 1 letter, 1 number, and 1 spercial  character
    let regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}/;

    if (passValue.match(regex)) return true;
    else return false;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: lightModeEnabled ? colors.white : colors.black,
      }}
    >
      <View>
        <StatusBar backgroundColor="#000" style="dark-content" />
        <KeyboardAvoidingView
          style={{
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <View style={{ marginTop: 64 }}>
            <Text
              style={{
                color: lightModeEnabled ? colors.black : "#D6D6D7",
                fontFamily: "Stem-Medium",
                fontSize: 20,
              }}
            >
              Login with your new password
            </Text>
            <Text
              style={{
                color: lightModeEnabled ? colors.black : "#D6D6D7",
                fontFamily: "Stem-Medium",
                fontSize: 15,
                marginTop: 16,
              }}
            >
              Change your password and login
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            {/* Error value */}
            {errorResponseData && (
              <View
                style={{
                  width: "100%",
                  bottom: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  className="opacity-30"
                  style={{
                    color: "red",
                    textAlign: "center",
                    fontFamily: "Stem-Regular",
                  }}
                >
                  {errorResponseData}
                </Text>
              </View>
            )}

            {/* Response value */}
            {responseData && (
              <View
                style={{
                  width: "100%",
                  bottom: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#80D200",
                    textAlign: "center",
                    fontFamily: "Stem-Regular",
                  }}
                >
                  Please check your mail to activate your account
                </Text>
              </View>
            )}

            <View style={{ width: "100%", position: "relative" }}>
              <TextInput
                style={[
                  styles.txtInput,
                  {
                    backgroundColor: secondIntBg ? secondIntBg : "#1a1a1a",
                    marginBottom: 20,
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
              <TouchableWithoutFeedback onPress={() => setHideTxt(!hideTxt)}>
                <Image
                  source={images.EyeClose}
                  style={{
                    width: 24,
                    height: 24,
                    position: "absolute",
                    right: 20,
                    top: 20,
                  }}
                />
              </TouchableWithoutFeedback>
            </View>

            <View style={{ width: "100%", position: "relative" }}>
              <TextInput
                style={[
                  styles.txtInput,
                  {
                    backgroundColor: thirdIntBg ? thirdIntBg : "#1a1a1a",
                    marginBottom: !passValid ? 5 : 16,
                    borderWidth: 0.5,
                    borderStyle: "solid",
                    borderColor: !passValid
                      ? "red"
                      : confirmPasswordFocus === "yes"
                      ? "#80D200"
                      : null,
                  },
                ]}
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
                    top: 20,
                  }}
                />
              </TouchableWithoutFeedback>
            </View>
            {/* Password Error Toast */}
            {!passValid && (
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  paddingVertical: 1,
                }}
              >
                <Text
                  className="text-red-600 opacity-30"
                  style={{
                    textAlign: "center",
                    fontFamily: "Stem-Regular",
                  }}
                >
                  Not less than 8 char + Atleast 1 letter, 1 number, and 1
                  special character
                </Text>
              </View>
            )}
            <TextInput
              style={[
                styles.txtInput,
                {
                  backgroundColor: firstIntBg ? firstIntBg : "#1a1a1a",
                  marginBottom: !emailValid ? 5 : 40,
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
            {/* Error Toast */}
            {!emailValid && (
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginBottom: !emailValid ? 5 : 0,
                }}
              >
                <Text
                  className="text-red-600 opacity-30"
                  style={{
                    fontFamily: "Stem-Regular",
                    textAlign: "center",
                  }}
                >
                  Invalid email! please enter a valid email
                </Text>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
            marginHorizontal: 20,
          }}
        >
          {isLoading === "true" ? (
            <TouchableOpacity
              style={styles.signInBtn}
              onPress={() => onLogin()}
              disabled={
                password !== confirmPassword ||
                !emailValid ||
                !passValid ||
                isLoading === "true" ||
                email === "" ||
                password === "" ||
                confirmPassword === ""
              }
            >
              <ActivityIndicator size={"small"} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.signInBtn}
              onPress={() => onLogin()}
              disabled={
                password !== confirmPassword ||
                !emailValid ||
                !passValid ||
                isLoading === "true" ||
                email === "" ||
                password === "" ||
                confirmPassword === ""
              }
            >
              <Text style={styles.signInTxt}>Login</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 87,
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
    color: colors.black,
    fontSize: 17,
  },
  signInBtn: {
    width: "100%",
    paddingVertical: 17,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: colors.companyGreen,
  },
});

export default ChangeCredentials;
