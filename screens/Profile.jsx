import React from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../components/shared";
import { images } from "../assets/images";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../Redux/Slice/AppSlice";

const Profile = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.black }}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.black,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: Platform.OS == "android" ? 30 : 30,
        }}
      >
        <View className="w-full items-center justify-center">
          <View className="items-center">
            <Image
              source={images.Profile}
              style={{
                width: 113.03,
                height: 114,
                borderRadius: 8,
              }}
            />
            <Text className="text-[13px] text-[#F5F5F5] mt-[12px]">
              Imade Jephthah
            </Text>
          </View>
          <TouchableOpacity className="justify-center  m-[48px] mt-[20px] flex-row items-center">
            <Image
              source={images.Edit}
              resizeMode="contain"
              className="w-[24px] h-[24px] mr-[12px] my-[9px]"
            />
            <Text className="text-[17px] text-white">Manage Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 2, alignItems: "center", width: "100%" }}>
        <View className="w-full px-[16px]">
          {/* Notification */}
          <TouchableHighlight
            onPress={() => navigation.navigate("notification-screen")}
          >
            <View
              style={{
                backgroundColor: "#1A1A1A",
                borderRadius: 8,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
                height: 60,
              }}
            >
              <View className="flex-row items-center justify-between">
                <Image
                  source={images.Notification}
                  resizeMode="contain"
                  className="w-[24px] h-[24px] ml-[18px] mr-[8px]"
                />
                <Text className="text-white text-[13.8px]">Notifications</Text>
              </View>
              <Image
                source={images.ChevronRight}
                resizeMode="contain"
                className="w-[24px] h-[24px] mr-[18px]"
              />
            </View>
          </TouchableHighlight>

          {/* My List */}
          <TouchableHighlight
            onPress={() => navigation.navigate("lists-screen")}
          >
            <View
              style={{
                backgroundColor: "#1A1A1A",
                borderRadius: 8,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
                height: 60,
              }}
            >
              <View className="flex-row items-center justify-between">
                <Image
                  source={images.AddToList}
                  resizeMode="contain"
                  className="w-[24px] ml-[18px] h-[24px] mr-[8px]"
                />
                <Text className="text-white text-[13.8px]">My List</Text>
              </View>
              <Image
                source={images.ChevronRight}
                resizeMode="contain"
                className="w-[24px] h-[24px] mr-[18px]"
              />
            </View>
          </TouchableHighlight>

          {/* Settings */}
          <TouchableHighlight
            onPress={() => navigation.navigate("account-settings")}
          >
            <View
              style={{
                backgroundColor: "#1A1A1A",
                borderRadius: 8,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
                height: 60,
              }}
            >
              <View className="flex-row items-center justify-between">
                <Image
                  source={images.AccountMain}
                  resizeMode="contain"
                  className="ml-[18px] w-[24px] h-[24px] mr-[8px]"
                />
                <Text className="text-white text-[13.8px]">Account</Text>
              </View>
              <Image
                source={images.ChevronRight}
                resizeMode="contain"
                className="w-[24px] h-[24px] mr-[18px]"
              />
            </View>
          </TouchableHighlight>

          {/* Help */}
          {/* <TouchableHighlight>
                        <View style={{
                            backgroundColor: "#1A1A1A",
                            borderRadius: 8,
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 12,
                            height: 60
                        }}>
                            <View className="flex-row items-center justify-between">
                                <Image 
                                    source={images.Help}
                                    resizeMode="contain"
                                    className="ml-[18px] w-[24px] h-[24px] mr-[8px]"
                                />
                                <Text className="text-white text-[13.8px]">Help</Text>
                            </View>
                                <Image 
                                    source={images.ChevronRight}
                                    resizeMode="contain"
                                    className="w-[24px] h-[24px] mr-[18px]"
                                />
                        </View>
                    </TouchableHighlight> */}
        </View>

        {/* Logout */}
        <TouchableOpacity
          onPress={() => dispatch(setAccessToken(null))}
          className="flex-row mt-[73px]"
        >
          <Image
            source={images.Logout}
            resizeMode="contain"
            className="w-[24px] h-[24px]"
          />

          <Text className="text-[17px] text-[#98999B] ml-[12px]">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
