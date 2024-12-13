import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { colors, typography, sizes } from "../../utils/design";

export default function FriendBlock({
  showButton = true,
  showIcon = true,
  showNotificationBubble = false,
  name = "Jenni So",
  onMessagePress,
  onMorePress,
  avatarUri,
  notificationUri,
  messageIconUri,
  moreIconUri,
}) {
  return (
    <View style={styles.container}>
      {showNotificationBubble && (
        <Image source={{ uri: notificationUri }} style={styles.notificationBubble} />
      )}
      <View style={styles.avatarBlock}>
        <Image
          source={{ uri: avatarUri }}
          style={[styles.avatar, { width: sizes.icon.medium, height: sizes.icon.medium }]}
        />
        <Text style={styles.name}>{name}</Text>
      </View>
      {showButton && (
        <TouchableOpacity style={styles.button} onPress={onMessagePress}>
          <Text style={styles.buttonText}>Message</Text>
          {showIcon && <Image source={{ uri: messageIconUri }} style={styles.icon} />}
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={onMorePress}>
        <Image source={{ uri: moreIconUri }} style={styles.moreIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: sizes.space[8],
    gap: sizes.space[8],
    width: "100%",
  },
  notificationBubble: {
    width: sizes.icon.xxxSmall,
    height: sizes.icon.xxxSmall,
    borderRadius: sizes.radius.circle,
    backgroundColor: colors.background.brand.default(),
    display: "flex",
  },
  avatarBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: sizes.space[8],
    flex: 1,
  },
  avatar: {
    borderRadius: sizes.radius.circle,
    // backgroundColor: colors.primitives.gray[200],
  },
  name: {
    fontFamily: typography.styles.heading.fontFamily(),
    fontSize: typography.styles.heading.sizes.base(),
    fontWeight: typography.styles.heading.fontWeight(),
    color: colors.text.default.default(),
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.brand.default(),
    borderRadius: sizes.radius[8],
    paddingVertical: sizes.space[8],
    paddingHorizontal: sizes.space[12],
    gap: sizes.space[8],
  },
  buttonText: {
    fontFamily: typography.styles.body.fontFamily(),
    fontSize: typography.styles.body.sizes.base(),
    fontWeight: typography.styles.body.fontWeights.bold(),
    color: colors.text.default.inverse(),
  },
  icon: {
    width: sizes.icon.small,
    height: sizes.icon.small,
  },
  moreIcon: {
    width: sizes.icon.small,
    height: sizes.icon.small,
  },
});
