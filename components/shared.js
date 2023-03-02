import { Dimensions, Share } from "react-native";

export const colors = {
    black: "#000000",
    firstGradientShade: "rgba(0,0,0,0.47)",
    white:  "#FCFCFF",
    trueWhite: "#FFFFFF",
    darkBlue: "#232330",
    xxxlightBlue: "#F2F4FF",
    xxlightBlue: "#98A7F5",
    xlightBlue: "#546DEF",
    blue: "#3250EC",
    xxxdarkBlue: "#0A102F",
    xxdarkBlue: "#111B4F",
    xdarkBlue: "#21359D",
    grayMedium: "#323337",
    darkMode: "#1E1E1E",
    companyGreen: "#80D200"
}

export const sizes = {
    small: 4,
    horizontalNavMargin: 16
}

export const baseUrl = "https://web-production-de75.up.railway.app/";

export const ScreenHeight = Dimensions.get("screen").height;
export const ScreenWidth = Dimensions.get("screen").width;
export const WindowHeight = Dimensions.get("window").height;



const baseUrl = "https://www.youtube.com/watch?v="
export const onShare = async () => {
    try {
      const result = await Share.share({
        message: baseUrl+info?.video_link
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };