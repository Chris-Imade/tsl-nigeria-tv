import React from "react";
import { Text, View, Button } from "react-native";

const Test = () => {
    return (
        <View className="flex-1 justify-center items-center"> 
            <Text>
                Testing oauth2 login with google
            </Text>

            <Button className="mt-5" title="Login"/>
        </View>
    )
}

export default Test;