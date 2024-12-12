import * as React from "react";
import { Text, StyleSheet, Image, View } from "react-native";

export default function InputField({
  state = "default", // Default, Active, Error, Error-Active
  valueType = "default", // Default, Placeholder
  inline = false,
  value = "Value",
  hasLabel = true,
  label = "Label:",
  hasDescription = false,
  description = "Description",
  hasError = false,
  error = "Error",
  leftIcon = null, // Pass image source for left icon
  rightIcon = null, // Pass image source for right icon
}) {
  const borderColor =
    state === "error" || hasError
      ? "#900b09"
      : state === "active" || state === "error-active"
      ? "#af731e"
      : "#757575";

  return (
    <View style={styles.inputField}>
      {hasLabel && <Text style={[styles.label, styles.labelTypo]}>{label}</Text>}
      {hasDescription && (
        <Text style={[styles.description, styles.descriptionTypo]}>
          {description}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: borderColor,
            flexDirection: inline ? "row" : "column",
          },
        ]}
      >
        {leftIcon && (
          <Image style={styles.icon} resizeMode="cover" source={leftIcon} />
        )}
        <Text style={[styles.value, styles.valueTypo]}>
          {valueType === "placeholder" ? "" : value}
        </Text>
        {rightIcon && (
          <Image style={styles.icon} resizeMode="cover" source={rightIcon} />
        )}
      </View>
      {hasError && (
        <Text style={[styles.error, styles.errorText]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  labelTypo: {
    textAlign: "left",
    fontFamily: "Comfortaa-Regular",
    fontSize: 13,
    color: "#757575",
  },
  descriptionTypo: {
    fontFamily: "Comfortaa-Light",
    fontWeight: "300",
    fontSize: 12,
    textAlign: "left",
    color: "#757575",
    alignSelf: "stretch",
  },
  inputContainer: {
    minWidth: 220,
    gap: 8,
    padding: 12,
    borderStyle: "solid",
    backgroundColor: "#fff",
    alignItems: "center",
    alignSelf: "stretch",
    overflow: "hidden",
    borderRadius: 8,
    borderWidth: 1,
  },
  valueTypo: {
    color: "#1e1e1e",
    fontSize: 14,
    fontFamily: "Comfortaa-Light",
    fontWeight: "300",
    textAlign: "left",
    flex: 1,
  },
  icon: {
    width: 20,
    height: 20,
    overflow: "hidden",
  },
  errorText: {
    color: "#900b09",
    fontSize: 12,
    marginTop: 4,
    textAlign: "left",
  },
  inputField: {
    borderStyle: "dashed",
    borderColor: "#303030",
    width: "100%",
    paddingHorizontal: 21,
    paddingVertical: 24,
    gap: 24,
    overflow: "hidden",
    borderWidth: 2,
    borderRadius: 8,
  },
});