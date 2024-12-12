import * as React from "react";
import { Image, StyleSheet, View, Text } from "react-native";

export default function UpperNavigation({ logo, wordmark, icons, categories }) {
  return (
    <View style={styles.upperNavigation}>
      {/* Upper Section */}
      <View style={[styles.upper, styles.upperFlexBox]}>
        <View style={[styles.content, styles.upperFlexBox]}>
          {/* Logo */}
          <View style={styles.logo}>
            {logo && (
              <Image
                style={[styles.logoSymbolIcon, styles.logoSymbolIconLayout]}
                resizeMode="cover"
                source={logo}
              />
            )}
            {wordmark && (
              <Image style={styles.wordmarkIcon} resizeMode="cover" source={wordmark} />
            )}
          </View>
          {/* Icons */}
          <View style={styles.upperIcons}>
            {icons.map((icon, index) => (
              <View key={index} style={[styles.iconText, styles.iconFlexBox]}>
                <View style={[styles.top, styles.topIconLayout]}>
                  <Image
                    style={[styles.bellIcon, styles.topIconLayout]}
                    resizeMode="cover"
                    source={icon.source}
                  />
                  {icon.badge && (
                    <View style={[styles.value, styles.iconFlexBox]}>
                      <Text style={styles.text}>{icon.badge}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Lower Section */}
      <View style={[styles.lower, styles.upperFlexBox]}>
        <View style={[styles.content, styles.upperFlexBox]}>
          {categories.map((category, index) => (
            <View
              key={index}
              style={[styles.iconButton, category.isActive ? styles.activeCategory : null]}
            >
              <View style={[styles.iconContainer, styles.textButtonFlexBox]}>
                <Image
                  style={[styles.runIcon, styles.topIconLayout]}
                  resizeMode="cover"
                  source={category.icon}
                />
              </View>
              <Text style={[styles.text2, styles.allClr]}>{category.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  upperNavigation: {
    backgroundColor: "#fff",
    alignItems: "center",
    overflow: "hidden",
  },
  upperFlexBox: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  logoSymbolIconLayout: {
    width: "100%",
    overflow: "hidden",
    flex: 1,
  },
  content: {
    maxWidth: 744,
    flex: 1,
    justifyContent: "space-between",
  },
  logo: {
    width: 127,
    height: 32,
    alignItems: "flex-end",
    gap: 8,
    flexDirection: "row",
  },
  logoSymbolIcon: {
    maxWidth: "100%",
    maxHeight: "100%",
    alignSelf: "stretch",
    overflow: "hidden",
  },
  wordmarkIcon: {
    width: 81,
    height: 23,
  },
  bellIcon: {
    top: 0,
    left: 0,
    zIndex: 0,
    position: "absolute",
    overflow: "hidden",
  },
  text: {
    fontSize: 8,
    lineHeight: 10,
    color: "#f5f5f5",
    textAlign: "center",
    fontFamily: "Comfortaa-Bold",
    fontWeight: "700",
  },
  value: {
    right: -4,
    bottom: -2,
    backgroundColor: "#c57e1b",
    width: 12,
    height: 12,
    paddingHorizontal: 2,
    paddingVertical: 0,
    zIndex: 1,
    borderRadius: 9999,
    position: "absolute",
    flexDirection: "row",
  },
  top: {
    padding: 10,
    gap: 10,
  },
  iconText: {
    width: 31,
  },
  upperIcons: {
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  lower: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: "stretch",
    overflow: "hidden",
  },
  textButtonFlexBox: {
    backgroundColor: "#e6e6e6",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    padding: 12,
    borderRadius: 9999,
  },
  iconButton: {
    gap: 2,
    maxWidth: 64,
    borderRadius: 32,
  },
  runIcon: {
    overflow: "hidden",
  },
  text2: {
    fontSize: 12,
    fontWeight: "300",
    fontFamily: "Comfortaa-Light",
    color: "#1e1e1e",
    textAlign: "center",
  },
  activeCategory: {
    backgroundColor: "#c57e1b",
    borderRadius: 32,
  },
});