import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { colors, typography, sizes } from "../../utils/design";

export default function Button({
  variant = "primary",
  state = "default",
  size = "medium",
  label = "Button",
  leftIcon = null,
  rightIcon = null,
}) {
  const buttonStyles = [
    styles.buttonBase,
    styles[`${variant}Button`],
    state === "active" && styles[`${variant}ButtonActive`],
    size === "small" && styles.smallButton,
  ];

  const textStyles = [
    styles.textBase,
    styles[`${variant}Text`],
    state === "active" && styles[`${variant}TextActive`],
  ];

  return (
    <TouchableOpacity style={buttonStyles}>
      {leftIcon && <Image source={leftIcon} style={styles.icon} />}
      <Text style={textStyles}>{label}</Text>
      {rightIcon && <Image source={rightIcon} style={styles.icon} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: sizes.space[12],
    borderRadius: sizes.radius[8],
    borderWidth: sizes.stroke[1],
  },
  textBase: {
    fontFamily: typography.styles.body.fontFamily(),
    fontSize: typography.styles.body.sizes.base(),
    fontWeight: typography.styles.body.fontWeights.bold(),
    textAlign: "center",
  },
  icon: {
    width: 16,
    height: 16,
    marginHorizontal: 4,
  },
  // Variants
  primaryButton: {
    backgroundColor: colors.background.brand.default(),
    borderColor: colors.border.brand.default(),
  },
  primaryButtonActive: {
    backgroundColor: colors.background.brand.active(),
    borderColor: colors.border.brand.default(),
  },
  primaryText: {
    color: colors.text.default.inverse(),
  },
  primaryTextActive: {
    color: colors.text.default.inverse(),
  },

  secondaryButton: {
    backgroundColor: colors.background.brand.tertiary(),
    borderColor: colors.border.brand.secondary(),
  },
  secondaryButtonActive: {
    backgroundColor: colors.background.brand.tertiary(),
    borderColor: colors.border.brand.secondary(),
  },
  secondaryText: {
    color: colors.text.brand.default(),
  },
  secondaryTextActive: {
    color: colors.text.default.default(),
  },

  neutralButton: {},

  neutralButtonActive: {
    borderColor: colors.border.default.tertiary(),
    borderWidth: sizes.stroke[1],
  },
  neutralText: {
    color: colors.text.default.default(),
  },
  neutralTextActive: {
    color: colors.text.default.inverse(),
  },

  tertiaryButton: {},

  tertiaryButtonActive: {
    borderColor: colors.border.brand.secondary(),
    borderWidth: sizes.stroke[1]
  },
  tertiaryText: {
    color: colors.text.brand.default(),
  },
  tertiaryTextActive: {
    color: colors.text.brand.default(),
  },

  // Sizes
  smallButton: {
    padding: sizes.space[8],
  },
});
