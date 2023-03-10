import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAvoidingView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { colors, PRODUCTION_URL } from "../components/shared";

const PasswordReset = () => {
  const [firstIntBg, setFirstIntBg] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [emailFocus, setEmailFocus] = useState("no");
  const [errorResponseData, setErrorResponseData] = useState("");
  const [responseData, setResponseData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const passwordResetToken = useSelector((state) => state.data.passwordResetToken);

  const lightModeEnabled = useSelector(
    (state) => state?.data?.lightModeEnabled
  );

  const navigation = useNavigation();

  // console.log("Access Token", passwordResetToken);

const onReset = () => {

  const isEmail = (emailAdress) => {
    if (emailAdress.length > 0) return true;
    else return false;
  }

  const validMail = isEmail(email);

  validMail ? setEmailValid(true) : setEmailValid(false);

  setIsLoading(true);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${passwordResetToken}`
    },
    body: JSON.stringify({ email: email })
  };
  
  fetch(`${PRODUCTION_URL}auth/users/reset_password/`, options)
    .then(response => {
      response.json();
      setIsLoading(false);
      Alert.alert("Please check your mail for a reset link...");
    })
    .then(response => console.log(response))
    .catch(err => {
      console.error(err);
      setIsLoading(false);
    });
  

}

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: lightModeEnabled ? colors.white : colors.black,
      }}
    >
      <StatusBar backgroundColor="#000" style="dark-content" />
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
          {isLoading === true ? (
            <TouchableOpacity style={styles.signInBtn}>
              <ActivityIndicator size={"small"} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.signInBtn}
              onPress={() => onReset()}
              disabled={!emailValid || isLoading === true || email === ""}
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
    color: "#ffffff",
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
