import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors, typography, sizes } from "../../utils/design";
import Checkbox from "./Checkbox";

export default function CheckboxField({
  state = "Default",
  valueType = "Unchecked",
  label = "Label",
  hasDescription = true,
  description = "Description",
}) {
  return (
    <View style={styles.container}>
      <View style={styles.descriptionRowFlexBox}>
        <Checkbox checked={true} />
        <Text style={styles.label}>{label}</Text>
      </View>
      {hasDescription && (
        <View style={styles.descriptionRowFlexBox}>
          <View style={styles.spaceLayout} />
          <Text style={styles.description}>{description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: sizes.space[4],
  },
  descriptionRowFlexBox: {
    gap: sizes.space[8],
    flexDirection: "row",
    alignItems: "center",
  },
  spaceLayout: {
    height: sizes.icon.small,
    width: sizes.icon.small,
  },
  label: {
    fontSize: typography.styles.body.sizes.small(),
    color: colors.text.default.default(),
  },
  description: {
    fontSize: typography.styles.body.sizes.xsmall(),
    color: colors.text.default.secondary(),
  },
});
