import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAvoidingView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../components/shared";

const PasswordReset = () => {
  const [firstIntBg, setFirstIntBg] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [emailFocus, setEmailFocus] = useState("no");
  const [errorResponseData, setErrorResponseData] = useState("");
  const [responseData, setResponseData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useSelector((state) => state.data.accessToken);

  const lightModeEnabled = useSelector(
    (state) => state?.data?.lightModeEnabled
  );

  const navigation = useNavigation();

  const onReset = () => {
    const validMail = isEmail(email);

    // console.log(validMail);
    validMail ? setEmailValid(true) : setEmailValid(false);
    const userCredentials = {
      email,
    };

    setIsLoading("true");

    Alert.alert("Check your mail for password reset link");
    setTimeout(() => {
      navigation.navigate("Login");
    }, 5000);

    setIsLoading(true);
    const getData = async (url = "", data) => {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Token ${accessToken}`,
        }, // body data type must match "Content-Type" header
        body: JSON.parse(data),
      });

      return response.json(); // parses JSON response into native JavaScript objects

      // console.log("Happy Coding --->!");
    };

    getData(
      `https://web-production-de75.up.railway.app/users/reset_password/`,
      userCredentials
    )
      .then((data) => {
        // console.log(data);
        if (!data.error) {
          setIsLoading(false);
          navigation.navigate("Login");
          ToastAndroid.show(
            "Video has been added to List!",
            ToastAndroid.SHORT
          );
          // console.log("<------------ Data is returned ----------------->");
        } else {
          // console.log("What could go wrong?")
          setIsLoading(false);
        }

        // console.log("<------------ ErrorResponseData ----------------->", errorResponseData);
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorResponseData(error.message);
      });
  };

  const isEmail = (emailAdress) => {
    // validation for mails of any kind
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailAdress.match(regex)) return true;
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
              Forgot password?
            </Text>
            <Text
              style={{
                color: lightModeEnabled ? colors.black : "#D6D6D7",
                fontFamily: "Stem-Medium",
                fontSize: 15,
                marginTop: 16,
              }}
            >
              Input your email to reset password
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginTop: 40,
            }}
          >
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
              placeholder="username@gmail.com"
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
            <TouchableOpacity style={styles.signInBtn}>
              <ActivityIndicator size={"small"} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.signInBtn}
              onPress={() => onReset()}
              disabled={!emailValid || isLoading === "true" || email === ""}
            >
              <Text style={styles.signInTxt}>Reset</Text>
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

export default PasswordReset;
