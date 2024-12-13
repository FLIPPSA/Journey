import * as React from "react";
import { StyleSheet, View } from "react-native";

export default function Drag({ color = "#757575" }) {
  return (
    <View style={[styles.drag]}>
      <View style={[styles.dragBar, { backgroundColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  dragBar: {
    position: "absolute",
    height: "100%",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 8,
    width: "100%",
  },
  drag: {
    flex: 1,
    height: 4,
  },
});