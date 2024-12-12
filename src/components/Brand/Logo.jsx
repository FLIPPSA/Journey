import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Logo({ showText = true }) {
  return (
    <View style={[styles.logo, styles.logoLayout]}>
      <Image
        style={[styles.logoSymbolIcon, styles.logoLayout]}
        resizeMode="cover"
        source={require("../../../assets/LogoSymbol.png")}
      />
      {showText && (
        <Text style={styles.wordmark}>Journey</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  logoLayout: {
    height: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  logoSymbolIcon: {
    width: 32,
    height: 32,
  },
  wordmark: {
    fontFamily: "Comfortaa-Bold",
    fontSize: 20,
    marginLeft: 8,
    color: "#1e1e1e",
  },
});