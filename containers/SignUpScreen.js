import React, { useState } from "react";
import { Text, View, Image } from "react-native";

import SignUpButton from "../components/SignUpButton";
import Logo from "../assets/logo.png";
import CustomTextInput from "../components/CustomTextInput";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

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
          <Text style={{ fontSize: 25 }}>Sign up</Text>
        </View>
        <View>
          <CustomTextInput
            type={email}
            typeString="email"
            setFunction={setEmail}
          />
          <CustomTextInput
            type={username}
            typeString="username"
            setFunction={setUsername}
          />
          <CustomTextInput
            type={description}
            typeString="description"
            setFunction={setDescription}
          />
          <View>
            <CustomTextInput
              type={password}
              typeString="password"
              setFunction={setPassword}
            />
          </View>
          <View>
            <CustomTextInput
              type={passwordConfirm}
              typeString="password confirmation"
              setFunction={setPasswordConfirm}
            />
          </View>
        </View>
        <SignUpButton
          email={email}
          username={username}
          description={description}
          password={password}
          passwordConfirm={passwordConfirm}
          setToken={setToken}
        />
      </View>
    </View>
  );
}
