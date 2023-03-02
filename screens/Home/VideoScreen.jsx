import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import { colors } from "../../components/shared";
import { WebView } from "react-native-webview";
import { useDispatch } from "react-redux";

const VideoScreen = (props) => {
  const { data } = props.route.params;

  const playerRef = useRef();

  const dispatch = useDispatch();

  // const baseUrl = "https://www.youtube.com/watch?v=EyqI0B4C0D4"
  const embedURI = `https://www.youtube.com/embed/${data}`;

  return (
    <View
      className="flex-1 absolute top-0 right-0 left-0 z-50"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <WebView
        allowsFullscreenVideo={true}
        javaScriptEnabled={true}
        // userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
        scrollEnabled={false}
        source={{ uri: embedURI }}
        style={{
          width: "100%",
          height: Dimensions.get("window").height > 300 ? 300 : "100%",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
});

export default VideoScreen;

{
  /* <View className="flex-[1.1] py-5">
                <ScrollView>
                    {movies.map((item, index) => (
                        <View key={index} className="mx-[20px] flex-row">
                            <View className="bg-slate-900/60 h-[69px] w-[127px] rounded-[4px] mr-[16px] mb-[20px]"></View>
                            <View>
                                <View className="bg-slate-900/60 w-48 h-4 mb-2"></View>
                                <View className="bg-slate-900/60 w-32 h-4"></View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View> */
}
{
  /* </ScrollView> */
}
