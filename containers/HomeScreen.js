import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";
import axios from "axios";
import LottieView from "lottie-react-native";

import Header from "../components/Header";
import RoomCard from "../components/RoomCard";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms"
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const homeAnimation = useRef();
  const playAnimation = () => {
    homeAnimation.current.play(2, 18);
  };
  const pressAnimation = () => {
    homeAnimation.current.play(0, 1);
  };

  return isLoading ? (
    <View style={styles.animationContainer}>
      <LottieView
        source={require("../assets/lottieView.json")}
        loop={true}
        autoPlay={true}
        progress={0}
        style={{
          width: 400,
          height: 400,
          backgroundColor: "#white",
        }}
        ref={homeAnimation}
        // OR find more Lottie files @ https://lottiefiles.com/featured
        // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
      />
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <Header isClickableHeader={false} />
      {/* Une FlatList est une ScrollView */}
      {/* <TouchableOpacity onPress={() => {navigation.navigate("Test")}}>
        <Text>lol</Text>
      </TouchableOpacity> */}
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return <RoomCard data={item} />;
        }}
        keyExtractor={(item) => {
          return item._id;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
