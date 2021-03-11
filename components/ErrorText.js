import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function ErrorText({ errorMessage }) {
  return (
    <View>
      <Text
        style={[
          errorMessage === "Changes saved !"
            ? styles.greenMessage
            : styles.redMessage,

          { textAlign: "center", fontSize: 12 },
        ]}
      >
        {errorMessage}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  greenMessage: {
    color: "#4aed41",
  },
  redMessage: {
    color: "red",
  },
});
("Picture uploaded !");
("Changes saved !");
