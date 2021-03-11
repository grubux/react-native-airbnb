import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
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

  return isLoading ? (
    <ActivityIndicator
      style={{ justifyContent: "center", flex: 1 }}
      size="large"
      color="blue"
    />
  ) : (
    // // <ActivityIndicator
    // //   style={{ justifyContent: "center", flex: 1 }}
    // //   size="large"
    // //   color="blue"
    // // />

    // <View style={styles.animationContainer}>
    //   <LottieView
    //     // ref={(animation) => {
    //     //   this.animation = animation;
    //     // }}
    //     // style={{
    //       width: 400,
    //       height: 400,
    //       backgroundColor: "#eee",
    //     }}
    //     source={require("../assets/lottieView.json")}
    //     // OR find more Lottie files @ https://lottiefiles.com/featured
    //     // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
    //   />
    //   <View style={styles.buttonContainer}>
    //     <Button
    //       title="Restart Animation"
    //       // onPress={this.resetAnimation}
    //     />
    //   </View>
    // </View>

    <View style={{ flex: 1 }}>
      <Header />
      {/* Une FlatList est une ScrollView */}
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
