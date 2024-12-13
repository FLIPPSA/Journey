import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors, typography, sizes } from "../../utils/design";
import Feather from "@expo/vector-icons/Feather";

export default function NotificationBanner({
  icon = "Check circle.png",
  heading = "Like a Post Completed!",
  linkText = "See Dailies",
  onClose,
}) {
  return (
    <View style={styles.notificationBanner}>
      {/* Icon and Heading */}
      <View style={styles.iconTextContainer}>
        <Feather
          name="check-circle"
          size={24}
          color={colors.icon.success.secondary()}
        />{" "}
        <Text style={styles.heading}>{heading}</Text>
      </View>

      {/* Link */}
      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>{linkText}</Text>
        <Feather
          name="arrow-right"
          size={16}
          color={colors.icon.brand.default()}
        />
      </View>

      {/* Close Button */}
      <Feather
        name="x"
        size={24}
        color={colors.icon.default.default()}
        onPress={onClose}
        style={styles.closeIcon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  notificationBanner: {
    shadowColor: colors.background.default.secondary(), // Shadow with opacity
    shadowOffset: { width: 0, height: sizes.space[1] },
    shadowOpacity: 1,
    shadowRadius: sizes.space[4],
    elevation: sizes.space[4],
    backgroundColor: colors.background.default.default(),
    width: "100%",
    padding: sizes.space[16],
    alignItems: "center",
    gap: sizes.space[8],
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: sizes.space[8],
  },
  heading: {
    fontSize: typography.styles.heading.sizes.base(),
    fontFamily: typography.styles.heading.fontFamily(),
    fontWeight: typography.styles.heading.fontWeight(),
    color: colors.text.default.default(),
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    fontSize: typography.styles.body.sizes.base(),
    fontFamily: typography.styles.body.fontFamily(),
    fontWeight: typography.styles.body.fontWeights.bold(),
    color: colors.text.brand.default(),
    marginRight: sizes.space[4],
  },
  closeIcon: {
    position: "absolute",
    top: sizes.space[8],
    right: sizes.space[8],
  },
});
