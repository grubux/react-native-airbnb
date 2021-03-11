import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function CustomTextInput({
  typeString,
  type,
  setFunction,
  savedInput,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      style={[
        {
          borderBottomWidth: 1,
          borderBottomColor: "red",
          borderBottomStyle: "solid",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 15,
        },
        typeString === "description"
          ? styles.descriptionView
          : typeString === "saved-description"
          ? styles.descriptionView
          : null,
      ]}
    >
      <TextInput
        multiline={
          typeString === "description" || typeString === "saved-description"
            ? true
            : false
        }
        numberOfLines={
          typeString === "description" || typeString === "saved-description"
            ? 5
            : 1
        }
        style={[
          typeString === "password" || typeString === "password confirmation"
            ? { width: "94%" }
            : { width: "100%" },
          typeString === "description" || typeString === "saved-description"
            ? styles.descriptionTextInput
            : typeString === "saved-description"
            ? styles.descriptionTextInput
            : null,
        ]}
        placeholder={
          typeString === "email"
            ? "email"
            : typeString === "saved-email"
            ? savedInput
            : typeString === "password"
            ? "password"
            : typeString === "username"
            ? "username"
            : typeString === "saved-username"
            ? savedInput
            : typeString === "password confirmation"
            ? "password confirmation"
            : typeString === "description"
            ? "Tell more about yourself"
            : typeString === "saved-description"
            ? savedInput
            : "other"
        }
        secureTextEntry={
          typeString === "password" || typeString === "password confirmation"
            ? showPassword
              ? false
              : true
            : false
        }
        onChangeText={(text) => {
          setFunction(text);
        }}
        value={type}
      />
      {typeString === "password" || typeString === "password confirmation" ? (
        <Feather
          onPress={() => setShowPassword(!showPassword)}
          name={showPassword ? "eye-off" : "eye"}
          size={20}
          color="black"
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  descriptionView: {
    borderWidth: 1,
    borderColor: "red",
    borderStyle: "solid",
    marginBottom: 30,
    marginTop: 27,
  },
  descriptionTextInput: {
    textAlignVertical: "top",
    padding: 9,
  },
});
