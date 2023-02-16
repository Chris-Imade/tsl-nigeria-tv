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
import { colors } from "../components/shared";
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
    <SafeAreaView className="flex-1 bg-black pt-5">
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
      <ScrollView>
        {movies
          ? movies.map((item, index) => (
              <View key={index} className="mx-[20px] flex-row">
                <Image
                  source={{ uri: item.image }}
                  className="h-[75px] w-[127px] rounded-[4px] mr-[16px] mb-[20px]"
                  resizeMode="cover"
                />
                <View>
                  <View className="flex-row items-center">
                    <Image
                      source={images.BellIcon}
                      style={{
                        width: 24,
                        height: 24,
                        margin: 4,
                      }}
                      resizeMode={"contain"}
                    />
                    <Text
                      style={{
                        fontFamily: "Stem-Medium",
                        fontSize: 16,
                        marginBottom: 4,
                      }}
                      className="text-[#fff]"
                    >
                      Reminder: New Arrival
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: "Stem-Medium",
                      fontSize: 16,
                      marginBottom: 4,
                    }}
                    className="text-[#fff]"
                  >
                    {truncTxt(item.title)}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Stem-Medium",
                      fontSize: 16,
                      marginBottom: 4,
                    }}
                    className="text-[#fff]"
                  >
                    2:30pm
                  </Text>
                </View>
              </View>
            ))
          : movies.map((item, index) => (
              <View key={index} className="mx-[20px] flex-row">
                <View className="bg-slate-900/60 h-[69px] w-[127px] rounded-[4px] mr-[16px] mb-[20px]"></View>
                <View>
                  <View className="bg-slate-900/60 w-48 h-4 mb-2"></View>
                  <View className="bg-slate-900/60 w-32 h-4"></View>
                </View>
              </View>
            ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;
