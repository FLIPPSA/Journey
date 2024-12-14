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
		if (variant === "Brand") return "#82581c";
		return "#1e1e1e";
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
		<View style={[styles.linkContainer, styles.linkFlexBox]}>
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
		flexWrap: "wrap",
		width: "100%",
		borderRadius: sizes.radius[8],
		borderStyle: "dashed",
		borderColor: colors.border.brand.secondary(),
		borderWidth: sizes.stroke[2],
		padding: sizes.space[10],
		alignContent: "flex-start",
	},
	linkFlexBox: {
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		gap: sizes.space[4],
	},
	linkText: {
		fontFamily: typography.primitives.family,
		fontWeight: typography.styles.body.fontWeights.bold(),
		textDecorationLine: "underline",
		textAlign: "left",
		color: colors.text.brand.default(),
	},
	linkMedium: {
		fontSize: typography.styles.body.sizes.small(),
	},
	linkSmall: {
		fontSize: typography.styles.body.sizes.xsmall(),
	},
	activeText: {
		textDecorationStyle: "solid",
	},
	icon: {
		width: sizes.icon.xxSmall,
		height: sizes.icon.xxSmall,
		display: "flex",
	},
});
