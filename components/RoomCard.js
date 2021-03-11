import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Stars from "./Stars";

const RoomCard = ({ data }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("Room", { roomId: data._id })}
      >
        <ImageBackground
          source={{ uri: data.photos[0].url }}
          style={styles.image}
        >
          <View style={styles.priceView}>
            <Text style={styles.price}>{data.price} €</Text>
          </View>
        </ImageBackground>
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
      </TouchableOpacity>
    </View>
  );
};
export default RoomCard;

const styles = StyleSheet.create({
  wrapper: {
    marginRight: 15,
    marginLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    marginBottom: 5,

    marginTop: 5,
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
});
