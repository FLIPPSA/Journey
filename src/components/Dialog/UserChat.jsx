import * as React from "react";
import {Image, StyleSheet, Text, View} from "react-native";

export default function UserChat({myMessage, avatar, message, timestamp}) {
  return (
    <View style={styles.userChat}>
      {!myMessage ? (
        <View style={[styles.myMessageno, styles.myMessagenoFlexBox]}>
          <Image style={styles.avatarIcon} resizeMode="cover" source={avatar} />
          <View style={[styles.chat, styles.chatFlexBox]}>
            <View style={styles.oct31930amParent}>
              <Text style={[styles.oct31, styles.oct31FlexBox]}>{timestamp}</Text>
              <Text style={[styles.messageHere, styles.oct31FlexBox]}>{message}</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={[styles.myMessageyes, styles.myMessagenoFlexBox]}>
          <View style={[styles.chat1, styles.chatFlexBox]}>
            <View style={styles.oct31930amParent}>
              <Text style={[styles.oct31, styles.oct31FlexBox]}>{timestamp}</Text>
              <Text style={[styles.messageHere, styles.oct31FlexBox]}>{message}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  myMessagenoFlexBox: {
    flexDirection: "row",
    alignSelf: "stretch"
  },
  chatFlexBox: {
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row"
  },
  oct31FlexBox: {
    textAlign: "left",
    color: "#f5f5f5",
    alignSelf: "stretch"
  },
  avatarIcon: {
    borderRadius: 9999,
    width: 32,
    height: 32,
    overflow: "hidden"
  },
  oct31: {
    fontSize: 12,
    fontWeight: "300",
    fontFamily: "Comfortaa-Light"
  },
  messageHere: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Comfortaa-Bold"
  },
  oct31930amParent: {
    width: 222,
    gap: 4
  },
  chat: {
    backgroundColor: "#757575",
    maxWidth: 240
  },
  myMessageno: {
    gap: 4
  },
  chat1: {
    backgroundColor: "#c57e1b",
    maxWidth: 280
  },
  myMessageyes: {
    justifyContent: "flex-end"
  },
  userChat: {
    borderRadius: 5,
    borderStyle: "dashed",
    borderColor: "#9747ff",
    borderWidth: 1,
    width: "100%",
    padding: 20,
    gap: 20,
    overflow: "hidden"
  }
});