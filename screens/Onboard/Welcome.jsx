import {
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../assets/images";
import { useSelector } from "react-redux";
import { colors } from "../../components/shared";
import { StatusBar } from "react-native";

const { width, height } = Dimensions.get("screen");

const DATA = [
  {
    id: 1,
    image: images.OnboardOne,
    writeUp: "Unlimited Shows, Lifestyle and Drama",
    slimWriteUp:
      "Enjoy captivating and engaging content that will keep you in your sit.",
  },
  {
    id: 2,
    image: images.OnboardTwo,
    writeUp: "Gossips",
    slimWriteUp: "Catch hot and spicy gist as they drop.",
  },
  {
    id: 3,
    image: images.OnboardThree,
    writeUp: "Create Your Own Content",
    slimWriteUp: "Be an active content creator on Tsl Tv",
  },
];

const Indicator = ({ scrollX }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const measurement = scrollX.interpolate({
          inputRange,
          outputRange: [8, 20, 8],
          extrapolate: "clamp",
        });

        const bg = scrollX.interpolate({
          inputRange,
          outputRange: ["#323337", "#D6D6D7", "#323337"],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              width: measurement,
              height: 8,
              backgroundColor: bg,
              borderRadius: 100 / 2,
              margin: 5,
            }}
          ></Animated.View>
        );
      })}
    </View>
  );
};

const Welcome = () => {
  const navigation = useNavigation();

  const lightModeEnabled = useSelector(
    (state) => state?.data?.lightModeEnabled
  );

  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1, backgroundColor: colors.black }}>
      <StatusBar />
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        horizontal
        scrollEventThrottle={35}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item }) => (
          <Image
            source={item.image}
            resizeMode={"contain"}
            style={{
              width: width,
              height: height,
            }}
          />
        )}
      />

      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{
            backgroundColor: "#80D200",
            marginHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 8,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color: colors.black,
              textAlign: "center",
              fontFamily: "Stem-Medium",
              fontSize: 20,
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
        <Indicator scrollX={scrollX} />
      </View>
    </View>
  );
};

export default Welcome;
