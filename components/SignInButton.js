import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ErrorText from "./ErrorText";
import axios from "axios";

export default function SignInButton({ email, password, setToken }) {
  const navigation = useNavigation();
  const [redErrorMessage, setRedErrorMessage] = useState("");
  const [requestSent, setRequestSent] = useState(false);

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
          onPress={async () => {
            if (email && password) {
              //
              try {
                setRequestSent(true);
                const res = await axios.post(
                  "https://express-airbnb-api.herokuapp.com/user/log_in",
                  { email: email, password: password }
                );
                const userToken = res.data.token;
                setToken(userToken);
                const storeData = async (id) => {
                  try {
                    await AsyncStorage.setItem("Id", id);
                  } catch (error) {
                    console.log(error.message);
                  }
                };
                storeData(res.data.id);
                console.log(res.data);
                setRequestSent(false);
              } catch (error) {
                setRequestSent(false);
                console.log(error.message);
                setRedErrorMessage(
                  "The combination E-mail address / password doesn't match"
                );
              }
            } else {
              setRequestSent(false);
              setRedErrorMessage("Please complete all fields");
            }
          }}
        >
          <Text>Sign in</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        <Text style={{ color: "grey" }}>No account ? Register</Text>
      </TouchableOpacity>
    </View>
  );
}
