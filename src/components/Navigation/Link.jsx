import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Link({ 
  variant = "Neutral", 
  state = "Default", 
  size = "Medium", 
  label = "Link", 
  hasIconStart = false, 
  iconStart = "Star.png", 
  hasIconEnd = false, 
  iconEnd = "X.png" 
}) {
  const getTextColor = () => {
    if (variant === "Brand") return "#82581c";
    return "#1e1e1e";
  };

  const getTextSize = () => {
    if (size === "Small") return styles.linkSmall;
    return styles.linkMedium;
  };

  const getTextStyle = () => ({
    color: getTextColor(),
    ...getTextSize(),
  });

  return (
    <View style={[styles.linkContainer, styles.linkFlexBox]}>
      {hasIconStart && <Image style={styles.icon} resizeMode="cover" source={iconStart} />}
      <Text style={[styles.linkText, getTextStyle(), state === "Active" && styles.activeText]}>
        {label}
      </Text>
      {hasIconEnd && <Image style={styles.icon} resizeMode="cover" source={iconEnd} />}
    </View>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    flexWrap: "wrap",
    width: "100%",
    borderRadius: 8,
    borderStyle: "dashed",
    borderColor: "#af731e",
    borderWidth: 2,
    padding: 10,
    alignContent: "flex-start",
  },
  linkFlexBox: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
  },
  linkText: {
    fontFamily: "Comfortaa-Bold",
    fontWeight: "700",
    textDecorationLine: "underline",
    textAlign: "left",
  },
  linkMedium: {
    fontSize: 14,
  },
  linkSmall: {
    fontSize: 12,
  },
  activeText: {
    textDecorationStyle: "solid",
  },
  icon: {
    width: 16,
    height: 16,
    display: "flex",
  },
});