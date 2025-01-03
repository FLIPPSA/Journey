import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, typography, sizes } from "../../utils/design";
import { Feather } from "@expo/vector-icons";

export default function Link({
	variant = "Neutral",
	state = "Default",
	size = "Medium",
	label = "Link",
	hasIconStart = false,
    iconStart="",
	hasIconEnd = false,
	iconEnd = "X.png",
    onPress = () => {}
}) {
	const getTextColor = () => {
		if (variant === "Brand") return colors.text.brand.default();
		return colors.text.default.default();
	};

	const getTextSize = () => {
		if (size === "Small") return styles.linkSmall;
		return styles.linkMedium;
	};

	const getTextStyle = () => ({
		color: getTextColor(),
		...getTextSize(),
	});

	return (
		<TouchableOpacity style={styles.linkContainer} onPress={onPress}>
			{hasIconStart && (
				<Feather name={iconStart} size={sizes.space[16]} color={colors.icon.default.default()} />
			)}
			<Text
				style={[
					styles.linkText,
					getTextStyle(),
					state === "Active" && styles.activeText,
				]}
			>
				{label}
			</Text>
			{hasIconEnd && (
				<Feather name={iconEnd} size={sizes.space[16]} color={colors.icon.default.default()} />
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	linkContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: sizes.space[4],
	},
	linkText: {
		fontFamily: typography.styles.body.fontFamily(),
		fontWeight: typography.styles.body.fontWeights.bold(),
		textAlign: "left",
		color: colors.text.default.default(),
	},
	linkMedium: {
		fontSize: typography.styles.body.sizes.small(),
	},
	linkSmall: {
		fontSize: typography.styles.body.sizes.xsmall(),
	},
	activeText: {
		textDecorationLine: "underline",
	},
	icon: {
		width: sizes.icon.xxSmall,
		height: sizes.icon.xxSmall,
	},
});
