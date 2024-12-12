import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { colors, typography, sizes } from "../../utils/design";

export default function AvatarGroup({ avatars, spacing = "overlap", showOverflow = true, number }) {
  const overlapSpacing = spacing === "overlap" ? -sizes.space[8] : sizes.space[8];

  return (
    <View style={[styles.avatarGroup, { gap: overlapSpacing }]}>
      {avatars.map((avatar, index) => (
        <View
          key={index}
          style={[
            styles.avatarContainer,
            {
              marginLeft: index === 0 ? 0 : overlapSpacing,
              zIndex: avatars.length - index,
            },
          ]}
        >
          {avatar.type === "image" ? (
            <Image
              source={{ uri: avatar.imageUri }}
              style={[
                styles.avatar,
                {
                  width: sizes.icon.medium,
                  height: sizes.icon.medium,
                  borderRadius: sizes.radius.circle,
                },
              ]}
            />
          ) : (
            <View
              style={[
                styles.initialContainer,
                {
                  width: sizes.icon.medium,
                  height: sizes.icon.medium,
                  borderRadius: sizes.radius.circle,
                  backgroundColor: colors.primitives.brand[700],
                },
              ]}
            >
              <Text style={styles.initialText}>{avatar.initials}</Text>
            </View>
          )}
        </View>
      ))}
      {showOverflow && number && (
        <View style={[styles.overflowContainer, { marginLeft: overlapSpacing }]}>
          <Text style={styles.overflowText}>{number}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatarGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    overflow: "hidden",
  },
  avatar: {
    resizeMode: "cover",
  },
  initialContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  initialText: {
    fontFamily: typography.primitives.family,
    fontSize: typography.primitives.scale[14],
    fontWeight: typography.primitives.weight.bold,
    color: colors.primitives.white[100],
    textAlign: "center",
  },
  overflowContainer: {
    width: sizes.icon.medium,
    height: sizes.icon.medium,
    borderRadius: sizes.radius.circle,
    backgroundColor: colors.primitives.brand[500],
    alignItems: "center",
    justifyContent: "center",
  },
  overflowText: {
    fontFamily: typography.primitives.family,
    fontSize: typography.primitives.scale[12],
    fontWeight: typography.primitives.weight.bold,
    color: colors.primitives.white[100],
    textAlign: "center",
  },
});
