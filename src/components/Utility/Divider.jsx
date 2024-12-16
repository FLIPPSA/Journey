import * as React from "react";
import { View, StyleSheet } from "react-native";
import { colors, sizes } from "../../utils/design";

export default function Divider({ vertical = false }) {
	return (
		<View
			style={[
				styles.divider,
				vertical ? styles.vertical : styles.horizontal,
			]}
		/>
	);
}

const styles = StyleSheet.create({
	divider: {
		backgroundColor: colors.border.default.default(),
	},
	horizontal: {
		height: sizes.stroke[1],
		width: "100%",
	},
	vertical: {
		width: sizes.stroke[1],
		height: "100%",
	},
});
