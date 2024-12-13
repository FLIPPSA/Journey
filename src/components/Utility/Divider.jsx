import * as React from "react";
import { View, StyleSheet } from "react-native";

export default function DividerSet({ vertical = false }) {
  return (
    <View style={[styles.divider, vertical ? styles.vertical : styles.horizontal]} />
  );
};

const styles = StyleSheet.create({
  divider: {
    backgroundColor: "#d9d9d9",
  },
  horizontal: {
    height: 1,
    width: "100%",
  },
  vertical: {
    height: "100%",
    width: 1,
  },
});