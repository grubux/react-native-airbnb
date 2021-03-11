import React, { useState } from "react";
import { Text, View, Image } from "react-native";

import SignInButton from "../components/SignInButton";

import Logo from "../assets/logo.png";
import CustomTextInput from "../components/CustomTextInput";

export default function SignInScreen({ setToken, setProfileData }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          marginLeft: 20,
          marginRight: 20,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <Image
            source={Logo}
            style={{
              width: 110,
              height: 118,
              resizeMode: "contain",
            }}
          />
          <Text style={{ fontSize: 25 }}>Sign in</Text>
        </View>
        <View style={{ marginBottom: 60 }}>
          <CustomTextInput
            type={email}
            setFunction={setEmail}
            typeString="email"
          />
          <CustomTextInput
            type={password}
            setFunction={setPassword}
            typeString="password"
          />
        </View>

        <SignInButton
          email={email}
          password={password}
          setToken={setToken}
          setProfileData={setProfileData}
        />
      </View>
    </View>
  );
}
