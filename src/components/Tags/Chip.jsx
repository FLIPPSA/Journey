import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { colors, typography, sizes } from "../../utils/design";

export default function Chip({ active = true, text = "Chip" }) {
	return (
		<View
			style={[
				styles.container,
				active ? styles.activeChip : styles.inactiveChip,
			]}
		>
			<Text
				style={[
					styles.chipText,
					active ? styles.activeText : styles.inactiveText,
				]}
			>
				{text}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: sizes.space[4],
		paddingHorizontal: sizes.space[8],
		justifyContent: "center",
		alignItems: "center",
		borderRadius: sizes.radius.circle,
        alignSelf: "flex-start",
	},
	inactiveChip: {
		borderWidth: sizes.stroke[1],
		borderColor: colors.border.default.tertiary(),
	},
	activeChip: {
		backgroundColor: colors.background.default.tertiary(),
	},
	chipText: {
		fontSize: typography.styles.body.sizes.base(),
		fontFamily: typography.styles.body.fontFamily(),
		fontWeight: typography.styles.body.fontWeights.bold(),
		textAlign: "center",
	},
	inactiveText: {
		color: colors.text.default.default(),
	},
	activeText: {
		color: colors.text.default.inverse(),
	},
});
