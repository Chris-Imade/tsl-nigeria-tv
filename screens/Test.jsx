import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import { Text, View, Button } from "react-native";

const Test = () => {
    return (
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
    )
}

export default Test;