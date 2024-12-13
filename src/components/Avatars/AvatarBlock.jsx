import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { colors, typography, sizes } from "../../utils/design";

export default function AvatarBlock({
  layout = "horizontal",
  showDescription = true,
  description = "Description",
  name = "Name",
  showCheckIcon = false,
  showXIcon = false,
  icon = "Check",
  avatarUri,
}) {
  const isHorizontal = layout === "horizontal";

  return (
    <View style={[styles.container, isHorizontal ? styles.horizontalLayout : styles.centeredLayout]}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: avatarUri }}
          style={[
            styles.avatar,
            {
              width: isHorizontal ? sizes.icon.medium : sizes.icon.large,
              height: isHorizontal ? sizes.icon.medium : sizes.icon.large,
            },
          ]}
        />
        {showCheckIcon && (
          <Image
            source={{ uri: icon }}
            style={[styles.checkIcon, { display: showCheckIcon ? "flex" : "none" }]}
          />
        )}
        {showXIcon && (
          <Image
            source={{ uri: "xIcon" }}
            style={[styles.xIcon, { display: showXIcon ? "flex" : "none" }]}
          />
        )}
      </View>
      <View style={[styles.infoContainer, !isHorizontal && styles.centeredText]}>
        <Text style={styles.name}>{name}</Text>
        {showDescription && <Text style={styles.description}>{description}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: sizes.space[16],
    gap: sizes.space[16],
  },
  horizontalLayout: {
    flexDirection: "row",
    alignItems: "center",
  },
  centeredLayout: {
    flexDirection: "column",
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    borderRadius: sizes.radius.circle,
    // backgroundColor: colors.primitives.gray[200],
  },
  checkIcon: {
    position: "absolute",
    bottom: -sizes.space[4],
    right: -sizes.space[4],
    width: sizes.icon.xxSmall,
    height: sizes.icon.xxSmall,
  },
  xIcon: {
    position: "absolute",
    top: sizes.space[2],
    right: sizes.space[2],
    width: sizes.icon.xxSmall,
    height: sizes.icon.xxSmall,
  },
  infoContainer: {
    gap: sizes.space[4],
  },
  centeredText: {
    alignItems: "center",
  },
  name: {
    fontFamily: typography.styles.heading.fontFamily(),
    fontSize: typography.styles.heading.sizes.base(),
    fontWeight: typography.styles.heading.fontWeight(),
    color: colors.text.default.default(),
  },
  description: {
    fontFamily: typography.styles.subheading.fontFamily(),
    fontSize: typography.styles.subheading.sizes.base(),
    fontWeight: typography.styles.subheading.fontWeight(),
    color: colors.text.default.secondary(),
  },
});
