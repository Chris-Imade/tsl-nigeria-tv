import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import {
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { images } from "../assets/images";
import { colors, ScreenWidth } from "../components/shared";
import movies from "../firebase/Raw/vid_data.json";

const News = () => {
  const [videoList, setVideoList] = useState([]);

  const [errorResponseData, setErrorResponseData] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  // Videos that are not approved are the coming soon...
  const lightModeEnabled = useSelector(
    (state) => state?.data?.lightModeEnabled
  );
  const accessToken = useSelector((state) => state.data.accessToken);

  const categories = useSelector((state) => state?.data?.categories);

  // console.log(categories);

  const [currentCat, setCurrentCat] = useState(null);
  const [currentIndx, setCurrentIndx] = useState(0);


  let newArr = categories.map(element => element.videos.map((item) => item.category));
  console.log('<----------------------------------New Array---------------------------------->', newArr)
  
  // the goal is to loop through the videos and return the category object 
  // merge category objects in an array
  // filter through the array to remove duplicates 

  const truncTxt = (txt) => {
    return txt?.length > 30 ? `${txt.substr(0, 30)}...` : txt;
  };

  useEffect(() => {
    const getData = async (url = "") => {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Token ${accessToken}`,
        }, // body data type must match "Content-Type" header
      });

      return response.json(); // parses JSON response into native JavaScript objects

      // console.log("Happy Coding --->!");
    };

    getData(
      `https://web-production-de75.up.railway.app/api/categories/${currentIndx}`
    )
      .then((data) => {
        // console.log(data);
        setVideoList(data.videos.filter((item) => item.published === false));

        if (data) {
          setIsLoading(false);
          // console.log("<------------ Data is returned ----------------->");
        } else {
          // console.log("What could go wrong?")
        }

        // console.log("<------------ ErrorResponseData ----------------->", errorResponseData);
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorResponseData(error.message);
        console.log('error: ', error);
      });
  }, [currentIndx]);

  return (
    <SafeAreaView className="flex-1 justify-start bg-black pt-12">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        className="h-fit"
        horizontal
      >
        {/* {categories.map((item, index) => {
          item.videos.map((sub, i) => {
            sub.published === true && (
                <TouchableOpacity
                  key={index}
                  onPress={() => setCurrentIndx(
                    [index]?.id - 1)}
                  style={{
                    backgroundColor:
                    item[index]?.id - 1 === currentIndx ? "#ffffff" : null,
                  }}
                  className="p-[11px] w-[148px] h-[40px] rounded-[30px] mx-[8px] mt-[24px] items-center justify-center"
                >
                  <View className="flex-row items-center">
                    <Image
                      source={images.Pop_corn}
                      className="w-[24px] h-[24px] mr-3"
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        color:
                        item[index]?.id - 1 === currentIndx
                            ? "#000000"
                            : "#ffffff",
                        fontFamily: "Stem-Medium",
                      }}
                      className="text-[14px]"
                    >
                      {item[index]?.name}
                    </Text>
                  </View>
                </TouchableOpacity>
            )
          })
        })} */}
      </ScrollView>
      {/* Page Title */}
      <View
        style={{ marginTop: -160 }}
        className="w-[90%] flex-row items-center mb-6 ml-6"
      >
        <Image
          source={images.Pop_corn}
          className="w-[24px] h-[24px] mr-3"
          resizeMode="contain"
        />
        <Text
          style={{
            color: "#ffffff",
            fontFamily: "Stem-Regular",
          }}
          className="text-[16px]"
        >
          {categories[currentIndx]?.name}
        </Text>
      </View>
      <View className="w-full h-[1px] bg-[#323337] mb-6"></View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={videoList}
        renderItem={({ item }) => (
          <View className="flex-row mb-[16px]">
            <View className="mr-[16px] items-center">
              <Text
                style={{
                  fontFamily: "Stem-Medium",
                }}
                className="text-white text-[11px]"
              >
                FEB
              </Text>
              <Text
                style={{
                  fontFamily: "Stem-Medium",
                }}
                className="text-white text-[31px]"
              >
                14
              </Text>
            </View>
            <View className="mb-[25px]">
              <Image
                source={{ uri: item.mobile_thumbnail }}
                className="h-[188px] rounded-[7px] mx-[16px] mb-[16px]"
                style={{
                  width: ScreenWidth - 81,
                }}
                resizeMode={"contain"}
              />
              <View className="flex-row">
                {/* <Image
                        source={{ uri: item.thumbnail }}
                        className="rounded-[4px] h-[69px] w-[127px]"
                    /> */}
                <View className="">{/* Icons */}</View>
              </View>
              <View className="my-[16px] mr-[36px] ml-4">
                <Text
                  style={{
                    color: lightModeEnabled ? colors?.black : colors?.trueWhite,
                    fontFamily: "Stem-Medium",
                    marginBottom: 8,
                    fontSize: 16,
                  }}
                >
                  Coming Fburary 14
                </Text>
                <Text
                  style={{ fontSize: 14, fontFamily: "Stem-Medium" }}
                  className="text-[#76777A]"
                >
                  {item.title}
                </Text>
                <View
                  style={{
                    width: ScreenWidth - 81,
                  }}
                >
                  <Text
                    style={{ fontSize: 14, fontFamily: "Stem-Medium" }}
                    className="text-[#76777A]"
                  >
                    {item.description}
                  </Text>
                </View>
                <View
                  style={{ width: ScreenWidth - 81 }}
                  className="mt-[16px] items-center flex-row justify-between space-x-1"
                >
                  <Text className="text-[11px] text-white">Suspenseful</Text>
                  <Text className="w-1 h-1 rounded-full bg-white text-[11px]"></Text>
                  <Text className="text-[11px] text-white">Thriller</Text>
                  <Text className="w-1 h-1 rounded-full bg-white text-[11px]"></Text>
                  <Text className="text-[11px] text-white">1970s</Text>
                  <Text className="text-[11px] text-white">
                    {" "}
                    Golden Globe Nominee{" "}
                  </Text>
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
