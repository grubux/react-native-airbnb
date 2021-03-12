import React from "react";
import { View, Image } from "react-native";
import Logo from "../assets/logo.png";

export default function HeaderRoomScreen() {
  return (
    <View
      style={{
        justifyContent: "center",
        marginLeft: 109,
        marginRight: 20,
        padding: 5,
      }}
    >
      <Image
        style={{
          width: 40,
          height: 40,
          resizeMode: "contain",
        }}
        source={Logo}
      />
    </View>
  );
}
