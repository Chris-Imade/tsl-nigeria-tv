import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import {
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { images } from "../assets/images";
import { colors, ScreenWidth } from "../components/shared";
import categories from "../firebase/Raw/mata.json";
import movies from "../firebase/Raw/vid_data.json";

const News = () => {
  const [currentCat, setCurrentCat] = useState(categories[0].category[0].catTitle);

  // Videos that are not approved are the coming soon...
  const lightModeEnabled = useSelector((state) => state?.data?.lightModeEnabled);

  const truncTxt = (txt) => {
    return txt?.length > 30 ? `${txt.substr(0, 30)}...` : txt;
  };

  return (
    <SafeAreaView className="flex-1 bg-black pt-12">
      <ScrollView 
      showsHorizontalScrollIndicator={false}
      horizontal>
        {categories[0].category.map((item, index) => (
          <TouchableOpacity
            onPress={() => setCurrentCat(item.catTitle)}
            key={index}
            style={{
              backgroundColor: currentCat === item.catTitle ? "#ffffff" : null,
            }}
            className="group p-[11px] w-[148px] h-[40px] rounded-[30px] mx-[8px] my-[24px] items-center justify-center"
          >
            <View className="flex-row items-center">
              <Image
                source={images.Pop_corn}
                className="w-[24px] h-[24px] mr-3"
                resizeMode="contain"
              />
              <Text
                style={{
                  color: currentCat === item.catTitle ? null : "#ffffff",
                  fontFamily: "Stem-Medium"
                }}
                className="text-[14px]"
              >
                {item.catTitle}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Page Title */}
      <View className="flex-row items-center my-6 ml-6">
        <Image
          source={images.Pop_corn}
          className="w-[24px] h-[24px] mr-3"
          resizeMode="contain"
        />
        <Text
          style={{ 
            color: "#ffffff",
            fontFamily: "Stem-Regular"
          }}
          className="text-[16px]"
        >
          {currentCat}
        </Text>
      </View>
      <View className="w-full h-[1px] bg-[#323337] mb-6"></View>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <View className="flex-row mb-[16px]">
            <View className="mr-[16px] items-center">
              <Text style={{
                fontFamily: "Stem-Medium"
              }} className="text-white text-[11px]">FEB</Text>
              <Text style={{
                fontFamily: "Stem-Medium"
              }} className="text-white text-[31px]">14</Text>
            </View>
            <View className="mb-[25px]">
              <Image
                source={{ uri: item.image }}
                className="h-[188px] rounded-[7px] mx-[16px] mb-[16px]"
                style={{
                    width: ScreenWidth - 81
                }}
              />
              <View className="flex-row">
                {/* <Image
                      source={{ uri: item.thumbnail }}
                      className="rounded-[4px] h-[69px] w-[127px]"
                  /> */}
                <View className="">{/* Icons */}</View>
              </View>
              <View className="my-[16px] mr-[36px] ml-4">
                <Text style={{
                  color: lightModeEnabled ? colors?.black : colors?.trueWhite,
                  fontFamily: "Stem-Medium",
                  marginBottom: 8,
                  fontSize: 16
                }}>Coming Fburary 14</Text>
                <Text style={{ fontSize: 14, fontFamily: "Stem-Medium" }} className="text-[#76777A]">{item.title}</Text>
                <View style={{
                  width: ScreenWidth - 81
                }}>
                  <Text style={{ fontSize: 14, fontFamily: "Stem-Medium" }} className="text-[#76777A]">
                    {item.description}
                  </Text>
                </View>
                <View style={{ width: ScreenWidth - 81 }} className="mt-[16px] items-center flex-row justify-between space-x-1">
                  <Text className="text-[11px] text-white">Suspenseful</Text>
                  <Text className="w-1 h-1 rounded-full bg-white text-[11px]"></Text>
                  <Text className="text-[11px] text-white">Thriller</Text>
                  <Text className="w-1 h-1 rounded-full bg-white text-[11px]"></Text>
                  <Text className="text-[11px] text-white">1970s</Text>
                  <Text className="text-[11px] text-white"> Golden Globe Nominee </Text>
                </View>
              </View>
            </View>
            <View className="my-[12px] bg-[#191A1C] w-full h-[2px]"></View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default News;
