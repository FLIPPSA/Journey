import * as React from "react";
import { Text, StyleSheet, View } from "react-native";

export default function Tab({ active, label }) {
  return (
    <View style={styles.tab}>
      <View
        style={[
          styles.tabContainer,
          active === "On" ? styles.active : styles.inactive,
        ]}
      >
        <Text style={[styles.label, active === "On" && styles.activeLabel]}>
          {label}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#383838",
    width: "100%",
    padding: 20,
    gap: 52,
  },
  tabContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    alignItems: "center",
  },
  inactive: {
    borderColor: "#757575",
  },
  active: {
    borderColor: "#383838",
  },
  label: {
    fontSize: 13,
    fontFamily: "Comfortaa-Regular",
    color: "#757575",
    textAlign: "left",
  },
  activeLabel: {
    fontWeight: "700",
    fontFamily: "Comfortaa-Bold",
    color: "#1e1e1e",
  },
});