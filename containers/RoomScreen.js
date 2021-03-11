import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/core";
import { Text, View, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

import DeveloppedRoomCard from "../components/DeveloppedRoomCard";

export default function RoomScreen() {
  const { params } = useRoute();
  const [data, setData] = useState({});

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${params.roomId}`
      );
      JSON.stringify(res.data);
      setData(res.data);
      JSON.stringify(data);
      console.log("data for RoomScreen");
      console.log(data);
      console.log(data.location[0]);
    };
    fetchData();

    // Demander l'autorisation d'accéder à la localisation du user
    // const askPermission = async () => {
    //   const { status } = await Location.requestPermissionsAsync();
    //   if (status === "granted") {
    //     // S'il autorise, récupérer sa latitude et sa longitude
    //     const location = await Location.getCurrentPositionAsync();
    //     // console.log(location);
    //     // Stocker ses données dans un state
    //     setLatitude(location.coords.latitude);
    //     setLongitude(location.coords.longitude);
    //     setIsLoading(false);
    //   } else {
    //     // gérer le cas où le user refuse
    //   }
    // };

    // askPermission();
  }, []);
  return isLoading ? (
    <Text>En cours de chargement...</Text>
  ) : (
    <View>
      <DeveloppedRoomCard data={data} />
      {/* <MapView
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
      </MapView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 361,
    width: "100%",
  },
});
