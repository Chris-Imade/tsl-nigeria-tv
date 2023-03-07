import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "react-native";
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
import { getNotificationInbox, getPushDataObject } from 'native-notify';

const Notification = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  let pushDataObject = getPushDataObject();

  const truncTxt = (txt) => {
    return txt.length > 23 ? `${txt.substr(0, 23)}...` : txt;
  };

  const searchNotification = useSelector((state) => state.data.searchNotification);


  useEffect(() => {
    const pullData = async () => {
      let notifications = await getNotificationInbox(6402, 's5Kll6DDHMPWMOiXEe4IdZ');
      console.log("notifications: ", notifications);
      setData(notifications);
    }
    pullData();
  }, []);

  useEffect(() => {
    console.log(pushDataObject);
}, [pushDataObject]);

  return (
    <SafeAreaView className="flex-1 bg-black pt-5 justify-center items-center">
      <StatusBar backgroundColor="#000" style="dark-content" />
      {data.length !== 0 || Object.keys(pushDataObject).length !== 0 ? (
        <View style={{
          display: "flex",
          marginHorizontal: 20,
        }}>
          {/* Notification data should go here */}
          <Image 
            source={{ uri: pushDataObject?.image }}
            resizeMode={"contain"}
            style={{
              width: 100,
              height: 69,
              borderRadius: 50 / 100
            }}
          />
          <View style={{
            marginLeft: 10,
            width: ScreenWidth - 150
          }}>
            <Text style={{ fontFamily: "Stem-Regular", fontSize: 16 }}>{data?.title}</Text>
            <Text style={{ fontFamily: "Stem-Regular", fontSize: 16 }}>{data?.message}</Text>
            <Text style={{ fontFamily: "Stem-Regular", fontSize: 16 }}>{pushDataObject?.desc}</Text>
          </View>
        </View>
      ) : (
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
              fontSize: 15,
              lineHeight: 22,
            }}
            className="text-white"
          >
            You have no notifications right now. 
            come back later.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Notification;
