import React from "react";
import { StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Stars = ({ ratingValue }) => {
  const tab = [];
  for (let i = 1; i <= 5; i++) {
    if (i < ratingValue) {
      tab.push(
        <FontAwesome
          style={{ marginRight: 4 }}
          key={`star-${i}`}
          name="star"
          size={17}
          color="gold"
        />
      );
    } else {
      tab.push(
        <FontAwesome
          style={{ marginRight: 4 }}
          key={`star-${i}`}
          name="star"
          size={17}
          color="lightgrey"
        />
      );
    }
  }

  return <View style={styles.container}>{tab}</View>;
};
export default Stars;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
