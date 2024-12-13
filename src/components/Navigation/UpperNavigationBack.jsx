import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function UpperNavigationBack({
  type = "back", // "back" or "message"
  showHeading = true,
  heading = "Heading",
  showNext = false,
  showBack = true,
  showIcon = false,
}) {
  return (
    <View style={styles.upperNavigationBack}>
      {type === "message" && (
        <View style={[styles.typeContainer, styles.typeLayout]}>
          {showBack && (
            <View style={[styles.button, styles.buttonFlexBox]}>
              <Image
                style={styles.iconLayout}
                resizeMode="cover"
                source={require("./assets/ArrowLeft.png")} // Replace with your actual image path
              />
              <Text style={[styles.buttonText, styles.buttonTypo]}>Back</Text>
            </View>
          )}
          {showIcon && (
            <Image
              style={[styles.editIcon, styles.iconPosition]}
              resizeMode="cover"
              source={require("./assets/Edit.png")} // Replace with your actual image path
            />
          )}
          {showHeading && (
            <Text style={styles.headingText}>{heading}</Text>
          )}
        </View>
      )}
      {type === "back" && (
        <View style={[styles.typeContainer, styles.typeLayout]}>
          {showBack && (
            <View style={[styles.button, styles.buttonFlexBox]}>
              <Image
                style={styles.iconLayout}
                resizeMode="cover"
                source={require("./assets/ArrowLeft.png")} // Replace with your actual image path
              />
              <Text style={[styles.buttonText, styles.buttonTypo]}>Back</Text>
            </View>
          )}
          {showHeading && (
            <Text style={styles.headingText}>{heading}</Text>
          )}
          {showNext && (
            <View style={[styles.nextButton, styles.buttonFlexBox]}>
              <Text style={[styles.nextText, styles.buttonTypo]}>Next</Text>
              <Image
                style={styles.nextIcon}
                resizeMode="cover"
                source={require("./assets/ArrowRight.png")} // Replace with your actual image path
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  typeLayout: {
    height: 64,
    width: "100%",
    backgroundColor: "#fff",
  },
  buttonFlexBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    overflow: "hidden",
  },
  buttonTypo: {
    fontSize: 14,
    fontFamily: "Comfortaa-Bold",
    fontWeight: "700",
    textAlign: "left",
  },
  iconLayout: {
    width: 24,
    height: 24,
  },
  buttonText: {
    color: "#1e1e1e",
  },
  button: {
    position: "absolute",
    left: 0,
    padding: 12,
  },
  editIcon: {
    width: 24,
    height: 24,
    position: "absolute",
    right: 12,
  },
  headingText: {
    position: "absolute",
    top: 20,
    left: "50%",
    marginLeft: -36,
    fontSize: 16,
    fontFamily: "Comfortaa-Bold",
    fontWeight: "700",
    textAlign: "center",
    color: "#1e1e1e",
  },
  nextButton: {
    position: "absolute",
    right: 8,
    backgroundColor: "#c57e1b",
    borderColor: "#af731e",
    borderWidth: 1,
    padding: 8,
  },
  nextText: {
    color: "#f5f5f5",
  },
  nextIcon: {
    width: 16,
    height: 16,
  },
  upperNavigationBack: {
    width: "100%",
    borderRadius: 8,
    borderStyle: "dashed",
    borderColor: "#9747ff",
    borderWidth: 1,
    overflow: "hidden",
  },
});