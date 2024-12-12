import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function ProfileNavigation({
  showBack = true,
  backLabel = "Back",
  showProfile = true,
  profileName = "Jenni So",
  profileImage = require("./assets/Avatar.png"), // Replace with actual profile image path
  showMenu = true,
}) {
  return (
    <View style={[styles.profileNavigation, styles.iconButtonFlexBox]}>
      {/* Back Button */}
      {showBack && (
        <View style={[styles.button, styles.buttonFlexBox]}>
          <Image
            style={styles.arrowLeftIcon}
            resizeMode="cover"
            source={require("./assets/ArrowLeft.png")} // Replace with actual back arrow image path
          />
          <Text style={[styles.buttonText, styles.nameTypo]}>{backLabel}</Text>
        </View>
      )}

      {/* Profile Section */}
      {showProfile && (
        <View style={styles.avatarBlockContainer}>
          <View style={styles.profileInfo}>
            <Image
              style={[styles.avatarIcon, styles.iconLayout]}
              resizeMode="cover"
              source={profileImage}
            />
            <View style={styles.info}>
              <Text style={[styles.name, styles.nameTypo]}>{profileName}</Text>
            </View>
          </View>

          {/* Menu Icon */}
          {showMenu && (
            <View style={[styles.iconButton, styles.iconLayout]}>
              <Image
                style={styles.menuIcon}
                resizeMode="cover"
                source={require("./assets/Menu.png")} // Replace with actual menu image path
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconButtonFlexBox: {
    padding: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonFlexBox: {
    gap: 8,
    alignItems: "center",
    flexDirection: "row",
  },
  nameTypo: {
    textAlign: "left",
    color: "#1e1e1e",
    fontFamily: "Comfortaa-Bold",
    fontWeight: "700",
  },
  iconLayout: {
    height: 40,
    width: 40,
    overflow: "hidden",
  },
  arrowLeftIcon: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  buttonText: {
    fontSize: 14,
  },
  button: {
    borderRadius: 8,
    padding: 12,
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarIcon: {
    borderRadius: 9999,
  },
  name: {
    alignSelf: "stretch",
    fontSize: 16,
  },
  info: {
    width: 84,
  },
  iconButton: {
    borderRadius: 32,
    justifyContent: "center",
    padding: 8,
    alignItems: "center",
    flexDirection: "row",
  },
  avatarBlockContainer: {
    gap: 4,
    alignItems: "center",
    flexDirection: "row",
  },
  profileNavigation: {
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    maxWidth: 744,
    overflow: "hidden",
  },
  menuIcon: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
});