import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { colors, typography, sizes } from "../../utils/design";

export default function TextButton({
	variant = "Primary",
	state = "Default",
	size = "Medium",
	text = "All",
}) {
	const getBackgroundColor = () => {
		if (variant === "Primary") {
			return state === "Active"
				? colors.background.brand.active()
				: colors.background.brand.default();
		} else if (variant === "Neutral") {
			return state === "Active"
				? colors.background.default.secondaryActive()
				: colors.background.default.secondary();
		} else if (variant === "Tertiary") {
			return state === "Active"
				? colors.background.brand.tertiaryActive()
				: colors.background.brand.tertiary();
		}
	};

	const getSize = () => {
		return size === "Small" ? styles.small : styles.medium;
	};

	return (
		<View
			style={[
				styles.textButton,
				getSize(),
				{ backgroundColor: getBackgroundColor() },
			]}
		>
			<Text style={styles.text}>{text}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	textButton: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: sizes.radius.circle,
		overflow: "hidden",
	},
	text: {
		textAlign: "center",
		fontFamily: typography.styles.heading.fontFamily(),
		fontWeight: typography.styles.heading.fontWeight(),
		fontSize: typography.styles.heading.sizes.base(),
		color: colors.text.default.inverse(),
	},
	medium: {
		height: sizes.space[64],
		width: sizes.space[64],
		padding: sizes.space[16],
	},
	small: {
		height: sizes.space[40],
		width: sizes.space[40],
		padding: sizes.space[8],
	},
});
