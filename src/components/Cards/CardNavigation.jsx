import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors, typography, sizes } from "../../utils/design";
import Feather from "@expo/vector-icons/Feather";

export default function CardNavigation({
	state = "default",
	text = "Navigation",
	showIcon = true,
	icon = "sunrise",
}) {
	const isActive = state === "active";

	return (
		<View
			style={[
				styles.cardNavigation,
				isActive ? styles.stateActive : styles.stateDefault,
			]}
		>
			{showIcon && <Feather name={icon} size={24} color={colors.icon.default.default()} />}
			<Text style={styles.text}>{text}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	cardNavigation: {
		minWidth: sizes.space[88],
		gap: sizes.space[4],
		paddingVertical: sizes.space[12],
		paddingHorizontal: sizes.space[8],
		justifyContent: "center",
		alignItems: "center",
		borderStyle: "solid",
		borderRadius: sizes.radius[4],
		borderWidth: sizes.stroke[1],
		alignSelf: "stretch",
	},
	stateDefault: {
		backgroundColor: colors.background.default.default(),
		borderColor: colors.border.default.secondary(),
	},
	stateActive: {
		backgroundColor: colors.background.brand.secondary(),
		borderColor: colors.border.brand.default(),
	},
	text: {
		fontSize: typography.styles.body.sizes.base(),
		fontWeight: typography.styles.body.fontWeights.bold(),
		fontFamily: typography.styles.body.fontFamily(),
		color: colors.text.default.default(),
		textAlign: "left",
	},
});
