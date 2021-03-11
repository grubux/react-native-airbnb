import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import axios from "axios";

import Header from "../components/Header";

const AroundMeScreen = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [coords, setCoords] = useState([]);
  //   [{latitude: 43.2424242, longitude: 2.343453353}, {latitude: 43.2424242, longitude: 2.343453353}, ]

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPermissionLocationAndData = async () => {
      // Demander l'autorisation d'accéder à la localisation
      const { status } = await Location.requestPermissionsAsync();
      let response;
      if (status === "granted") {
        // Récupérer la localisation
        const location = await Location.getCurrentPositionAsync();

        // Stocker les données de localisation
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        // Requête pour récupérer les annonces
        response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
        );
      } else {
        // Requête pour récupérer toutes les annonces
        response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/around`
        );
      }
      const tab = [];
      for (let i = 0; i < response.data.length; i++) {
        tab.push({
          latitude: response.data[i].location[1],
          longitude: response.data[i].location[0],
        });
      }
      setCoords(tab);
      setIsLoading(false);
    };
    getPermissionLocationAndData();
  }, []);

  return isLoading ? (
    <ActivityIndicator
      style={{ justifyContent: "center", flex: 1 }}
      size="large"
      color="blue"
    />
  ) : (
    <View>
      <Header />
      <MapView
        showsUserLocation={true}
        initialRegion={{
          latitude: latitude || 48.856614,
          longitude: longitude || 2.3522219,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        style={styles.map}
      >
        {/* .map sur un tableau de coordonnées */}
        {coords.map((coord, index) => {
          return (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: coord.latitude,
                longitude: coord.longitude,
              }}
            />
          );
        })}
      </MapView>
      <View style={styles.container}>
        <View>
          <Text>Latitude : {latitude}</Text>
          <Text>Longitude : {longitude}</Text>
        </View>
      </View>
    </View>
  );
};
export default AroundMeScreen;

const widthMap = Dimensions.get("window").width;
const heightMap = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "space-between",
  },
  map: {
    height: heightMap - 96,
    width: widthMap,
  },
});
