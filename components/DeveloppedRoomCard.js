import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { SwiperFlatList } from "react-native-swiper-flatlist";

import Stars from "./Stars";

const DeveloppedRoomCard = ({ data }) => {
  const [toggledText, setToggledText] = useState(false);

  const navigation = useNavigation();

  console.log(data.photos);

  const colors = ["tomato", "thistle", "skyblue", "teal"];

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.testContainer}>
          <Text>test</Text>
          <SwiperFlatList
            removeClippedSubviews={false}
            autoplay
            autoplayDelay={2}
            autoplayLoop
            index={2}
            showPagination
            data={colors}
            renderItem={({ item }) => (
              <View style={[styles.testChild, { backgroundColor: item }]}>
                <Text style={styles.testText}>haha</Text>
              </View>
            )}
          />
        </View>
        {/* <View styles={styles.testContainer}>
          <SwiperFlatList
          //   autoplay
          //   autoplayDelay={2}
          //   autoplayLoop
          index={2}
          showPagination
          data={data.photos}
          renderItem={({ item }) => (
              <View style={[styles.testChild, { backgroundColor: item }]}>
              <ImageBackground
              source={{ uri: item.url }}
              style={styles.image}
              >
              <View style={styles.priceView}>
              <Text style={styles.price}>{data.price} €</Text>
              </View>
              </ImageBackground>
              </View>
              )}
              />
            </View> */}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: 5,
          marginTop: 5,
        }}
      >
        <View>
          <Text
            numberOfLines={1}
            style={{ fontSize: 20, width: 295, marginTop: 15 }}
          >
            {data.title}
          </Text>
          <View
            style={{ flexDirection: "row", marginTop: 10, marginBottom: 10 }}
          >
            <Stars ratingValue={data.ratingValue} />
            <Text style={{ marginLeft: 5, color: "lightgrey" }}>
              {data.reviews} reviews
            </Text>
          </View>
        </View>

        <Image
          source={{ uri: data.user.account.photo.url }}
          style={styles.userPhoto}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            setToggledText(!toggledText);
          }}
        >
          <Text
            multiline0
            numberOfLines={toggledText ? 0 : 3}
            style={{ textAlign: "justify" }}
          >
            {data.description}
          </Text>
          <View style={{ width: 100, flexDirection: "row" }}>
            <Text style={{ color: "grey" }}>
              {toggledText ? "Show less" : "Show more"}
            </Text>
            <AntDesign
              style={{
                marginLeft: toggledText ? 8 : 8,
                marginTop: 2,
              }}
              name={toggledText ? "up" : "down"}
              size={toggledText ? 18 : 17}
              color="grey"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default DeveloppedRoomCard;

const styles = StyleSheet.create({
  wrapper: {
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 300,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
  },
  priceView: {
    height: 45,
    width: 90,
    bottom: 10,
    opacity: 0.6,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  price: { color: "white" },
  userPhoto: { height: 85, width: 85, borderRadius: 43 },
  testContainer: { flex: 1, backgroundColor: "red" },
  testChild: {
    width: 300,
    justifyContent: "center",
    backgroundColor: "yellow",
  },
  testText: { fontSize: 30, textAlign: "center", color: "blue" },
});
