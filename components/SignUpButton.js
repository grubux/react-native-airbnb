import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ErrorText from "./ErrorText";
import axios from "axios";

export default function SignUpButton({
  email,
  username,
  description,
  password,
  passwordConfirm,
  setToken,
}) {
  const navigation = useNavigation();
  const [redErrorMessage, setRedErrorMessage] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  const storeData = async (id) => {
    try {
      await AsyncStorage.setItem("Id", id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePressSignup = async () => {
    try {
      if (email && username && description && password && passwordConfirm) {
        if (password === passwordConfirm) {
          setRequestSent(true);
          const res = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email,
              username,
              description,
              password,
            }
          );

          setToken(res.data.token);
          storeData(res.data.id);
          alert("You are now signed up and connected to your account.");
        } else {
          setRedErrorMessage("The passwords must match.");
        }
      } else {
        setRedErrorMessage("Please fill all fields.");
      }
    } catch (error) {
      const errorResponse = error.res.data.error;
      console.log(errorResponse);
      console.log(error.message);
      if (errorResponse === "This email already has an account.") {
        setRedErrorMessage("This email is already taken.");
        setRequestSent(false);
      }
      if (errorResponse === "This username already has an account.") {
        setRedErrorMessage("This username is already taken.");
        setRequestSent(false);
      } else {
        alert("Network error");
        setRequestSent(false);
      }
    }
  };

  return (
    <View
      style={{
        alignItems: "center",
        marginBottom: 40,
      }}
    >
      <ErrorText errorMessage={redErrorMessage} />
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          disabled={requestSent ? true : false}
          style={{
            borderColor: "red",
            borderBottomStyle: "solid",
            borderWidth: 1,
            borderRadius: 20,
            width: 150,
            height: 40,
            marginTop: 10,
            marginBottom: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handlePressSignup}
        >
          <Text>Sign up</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      >
        <Text style={{ color: "grey" }}>Already have an account ? Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}
