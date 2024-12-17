import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors, typography, sizes } from "../../utils/design";

export default function Link({
	variant = "Neutral",
	state = "Default",
	size = "Medium",
	label = "Link",
	hasIconStart = false,
	iconStart = "Star.png",
	hasIconEnd = false,
	iconEnd = "X.png",
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
		<View style={styles.linkContainer}>
			{hasIconStart && (
				<Image
					style={styles.icon}
					resizeMode="cover"
					source={iconStart}
				/>
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
				<Image
					style={styles.icon}
					resizeMode="cover"
					source={iconEnd}
				/>
			)}
		</View>
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
