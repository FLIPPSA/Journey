import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors, typography, sizes } from "../../utils/design";

export default function UserChat({
  myMessage = false,
  avatar = "https://t4.ftcdn.net/jpg/06/10/19/43/360_F_610194339_3CtGOkv4wIiAyybcib4IrFX0nnc83Bv6.jpg",
  message = "Message here",
  timestamp = "OCT 31 - 9:30AM",
}) {
  return (
    <View style={styles.userChat}>
      {!myMessage ? (
        <View style={[styles.myMessageno, styles.myMessagenoFlexBox]}>
          <Image style={styles.avatarIcon} resizeMode="cover" source={{uri: avatar}} />
          <View style={[styles.chat, styles.chatFlexBox]}>
            <View style={styles.oct31930amParent}>
              <Text style={[styles.oct31, styles.oct31FlexBox]}>
                {timestamp}
              </Text>
              <Text style={[styles.messageHere, styles.oct31FlexBox]}>
                {message}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={[styles.myMessageyes, styles.myMessagenoFlexBox]}>
          <View style={[styles.chat1, styles.chatFlexBox]}>
            <View style={styles.oct31930amParent}>
              <Text style={[styles.oct31, styles.oct31FlexBox]}>
                {timestamp}
              </Text>
              <Text style={[styles.messageHere, styles.oct31FlexBox]}>
                {message}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  myMessagenoFlexBox: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  chatFlexBox: {
    padding: sizes.space[12],
    alignItems: "center",
    borderRadius: sizes.radius[8],
    flexDirection: "row",
  },
  oct31FlexBox: {
    textAlign: "left",
    color: colors.text.default.inverse(),
    alignSelf: "stretch",
  },
  avatarIcon: {
    borderRadius: sizes.radius.circle,
    width: sizes.icon.small,
    height: sizes.icon.small,
    overflow: "hidden",
  },
  oct31: {
    fontSize: typography.styles.subheading.sizes.small(),
    fontWeight: typography.styles.body.fontWeights.regular(),
    fontFamily: typography.styles.body.fontFamily(),
  },
  messageHere: {
    fontSize: typography.styles.body.sizes.base(),
    fontWeight: typography.styles.body.fontWeights.bold(),
    fontFamily: typography.styles.body.fontFamily(),
  },
  oct31930amParent: {
    width: sizes.space[222], // Adjust to match the pixel size
    gap: sizes.space[4],
  },
  chat: {
    backgroundColor: colors.background.default.tertiary(),
    maxWidth: sizes.space[240],
  },
  myMessageno: {
    gap: sizes.space[4],
  },
  chat1: {
    backgroundColor: colors.background.brand.default(),
    maxWidth: sizes.space[280],
  },
  myMessageyes: {
    justifyContent: "flex-end",
  },
  userChat: {
    borderRadius: sizes.radius[5],
    borderStyle: "dashed",
    borderColor: colors.border.brand.default(),
    borderWidth: sizes.stroke[1],
    width: "100%",
    padding: sizes.space[20],
    gap: sizes.space[20],
    overflow: "hidden",
  },
});
