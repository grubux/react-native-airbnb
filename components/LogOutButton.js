import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogOutButton = ({ setToken }) => {
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("Id");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
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
        onPress={() => {
          removeData();
          setToken(null);
        }}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LogOutButton;
