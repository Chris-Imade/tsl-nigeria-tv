import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { images } from "../assets/images";
import { colors, ScreenWidth } from "../components/shared";
import movies from "../firebase/Raw/vid_data.json";

const Notification = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const truncTxt = (txt) => {
    return txt.length > 23 ? `${txt.substr(0, 23)}...` : txt;
  };

  const searchNotification = useSelector(
    (state) => state.data.searchNotification
  );

  return (
    <SafeAreaView className="flex-1 bg-black pt-5 justify-center items-center">
      {searchNotification && (
        <View className="flex-row w-full mx-[20px] items-center">
          <Image
            source={images.SearchSmall}
            resizeMode="contain"
            className="w-[24px] h-[24px] ml-3"
          />
          <TextInput
            placeholder="Search from your list..."
            placeholderTextColor={colors.white}
            className="mx-[10px] py-3 text-white"
            onChangeText={(text) => setSearchQuery(text)}
            style={{
              fontFamily: "Stem-Regular",
            }}
          />
        </View>
      )}
      <View
          style={{
            borderWidth: 2,
            borderColor: "#545558",
            borderStyle: "dashed",
            marginHorizontal: 28,
            paddingVertical: 23,
            paddingHorizontal: 19,
            width: ScreenWidth - 40,
          }}
        >
          <Text
            style={{
              width: ScreenWidth - 80,
              fontFamily: "Stem-Regular",
              fontSize: 12,
              lineHeight: 13,
            }}
            className="text-white"
          >
            You have no notifications right now. 
            come back later.
          </Text>
        </View>
    </SafeAreaView>
  );
};

export default Notification;
