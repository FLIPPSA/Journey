import * as React from "react";
import { Text, StyleSheet, View } from "react-native";

export default function Chip({ active = false, text = "Chip" }) {
  return (
    <View
      style={[
        styles.chipContainer,
        active ? styles.activeChip : styles.inactiveChip,
      ]}
    >
      <Text style={[styles.chipText, active ? styles.activeText : styles.inactiveText]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 9999,
    overflow: "hidden",
  },
  inactiveChip: {
    borderWidth: 1,
    borderColor: "#383838",
    backgroundColor: "#fff",
  },
  activeChip: {
    backgroundColor: "#444",
  },
  chipText: {
    fontSize: 14,
    fontFamily: "Comfortaa-Bold",
    fontWeight: "700",
    textAlign: "center",
  },
  inactiveText: {
    color: "#1e1e1e",
  },
  activeText: {
    color: "#f5f5f5",
  },
});