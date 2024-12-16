import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { colors, typography, sizes } from "../../utils/design";

export default function Tab({ active, label="Tab" }) {
  return (
      <View
        style={[
          styles.container,
          active === "On" ? styles.activeTab : styles.inactiveTab,
        ]}
      >
        <Text style={[styles.label, active === "On" && styles.activeLabel]}>
          {label}
        </Text>
      </View>
  );
};

const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingVertical: sizes.space[8],
        paddingHorizontal: sizes.space[12],
        borderBottomWidth: sizes.stroke[1],
        borderStyle: "solid",
        borderTopRightRadius: sizes.radius[4],
        borderTopLeftRadius: sizes.radius[4],
        alignItems: "center",
      },
      inactiveTab: {
        borderColor: colors.border.default.secondary(),
      },
      activeTab: {
        borderColor: colors.border.default.tertiary(),
      },
      label: {
        fontSize: typography.primitives.scale[13],
        fontFamily: typography.primitives.family,
        color: colors.text.default.secondary(),
        textAlign: "left",
      },
      activeLabel: {
        fontWeight: typography.primitives.weight.bold,
        color: colors.text.default.default(),
      },
});