import React, { useEffect, useState, useRef } from "react";
import { useRoute } from "@react-navigation/core";
import { Text, View, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import LottieView from "lottie-react-native";

import DeveloppedRoomCard from "../components/DeveloppedRoomCard";

export default function RoomScreen() {
  const { params } = useRoute();
  const [data, setData] = useState({});

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //Loader
  const homeAnimation = useRef();
  const playAnimation = () => {
    homeAnimation.current.play(2, 18);
  };
  const pressAnimation = () => {
    homeAnimation.current.play(0, 1);
  };
  //Loader

  const askPermission = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status === "granted") {
      // S'il autorise, récupérer sa latitude et sa longitude
      const location = await Location.getCurrentPositionAsync();
      // console.log(location);
      // Stocker ses données dans un state
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    } else {
      // gérer le cas où le user refuse*
      console.log("The user did not authorized location informations fetching");
    }
  };
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${params.roomId}`
      );
      JSON.stringify(res.data);
      setData(res.data);
      JSON.stringify(data);
      console.log("data for RoomScreen");
      console.log(data);
      console.log(data.location[0]);
    } catch (error) {
      console.log("Request error");
    }
  };
  useEffect(() => {
    try {
      const doUseEffect = async () => {
        await askPermission();
        await fetchData();
        setIsLoading(false);
      };
      doUseEffect();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
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
          backgroundColor: "white",
        }}
        ref={homeAnimation}
        // OR find more Lottie files @ https://lottiefiles.com/featured
        // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
      />
    </View>
  ) : (
    <View style={{ alignItems: "center" }}>
      <DeveloppedRoomCard data={data} />
      <MapView
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          // on pourrait vouloir centrer la carte sur le user
          latitude: data.location[1],
          longitude: data.location[0],
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        style={styles.map}
      >
        <MapView.Marker
          coordinate={{
            latitude: data.location[1],
            longitude: data.location[0],
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 361,
    width: "100%",
  },
  animationContainer: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
