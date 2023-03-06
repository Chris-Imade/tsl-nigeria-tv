import _ from "lodash";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native";
import {
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../assets/images";
import { colors, ScreenWidth } from "../components/shared";
import { setComingSoon } from "../Redux/Slice/AppSlice";

const News = () => {
  const [errorResponseData, setErrorResponseData] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  // Videos that are not approved are the coming soon...
  const lightModeEnabled = useSelector(
    (state) => state?.data?.lightModeEnabled
  );
  const accessToken = useSelector((state) => state.data.accessToken);

  const categories = useSelector((state) => state?.data?.categories);

  const comingSoon = useSelector((state) => state.data.comingSoon); 

  const dispatch = useDispatch();

  // console.log(categories);
  
    // console.log(joinedCat)
    // does not fetch by id until you click on the tab
    const joinedCat = categories.map((item) => item);

    // console.log(joinedCat);
    
    const uniqueCat = _.uniqBy(joinedCat, item => item.id);
    
    const [currentCat, setCurrentCat] = useState(null);
    const [currentIndx, setCurrentIndx] = useState(uniqueCat[1].id);
    
    console.log(currentIndx);



  // let newArr = categories.map(element => element.videos.map((item) => item.category));
  // console.log('<----------------------------------New Array---------------------------------->', newArr)
  
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
        dispatch(setComingSoon(data.videos.filter((item) => item.published === false)));

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
  console.log(currentIndx)
  return (
    <SafeAreaView className="flex-1 justify-start bg-black pt-12">
      <StatusBar backgroundColor="#000" style="dark-content" />
      
      {/* Page Title */}
      <FlatList
        ListHeaderComponent={() => (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            className="h-fit"
            horizontal
          >
            {uniqueCat.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setCurrentIndx(item?.id)}
                style={{
                  backgroundColor: item.id === currentIndx ? "#ffffff" : null,
                  paddingHorizontal: 20,
                }}
                className="p-[11px] w-fit h-[40px] rounded-[30px] mx-[8px] mt-[24px] items-center justify-center"
              >
                <View className="flex-row items-center">
                  <Image
                    source={images.Pop_corn}
                    className="w-[24px] h-[24px] mr-3"
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: item?.id === currentIndx
                          ? "#000000"
                          : "#ffffff",
                      fontFamily: "Stem-Medium",
                    }}
                    className="text-[14px]"
                  >
                    {item?.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        showsVerticalScrollIndicator={false}
        data={comingSoon}
        renderItem={({ item }) => (
          <View className="">
            <View className="w-full h-[1px] bg-[#323337] my-6"></View>
            <View className="flex-row mb-[16px]">
              <View className="mr-[16px] items-center">
                <Text
                  style={{
                    fontFamily: "Stem-Medium",
                  }}
                  className="text-white text-[11px]"
                >
                  {!item ? "Month" : new Date(item?.release_date).getMonth()}
                </Text>
                <Text
                  style={{
                    fontFamily: "Stem-Medium",
                  }}
                  className="text-white text-[31px]"
                >
                  {!item ? "Day" : new Date(item?.release_date).getDay()}
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
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default News;