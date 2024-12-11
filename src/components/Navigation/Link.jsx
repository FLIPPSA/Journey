import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons"; // Add any icon library used
import { colors, typography } from "../../utils/design";

const Link = ({
	label = "Link",
	variant = "neutral", // 'neutral' or 'brand'
	state = "default", // 'default' or 'active'
	size = "medium", // 'medium' or 'small'
	hasIconStart = false,
	iconStart = "star", // Icon name for the start
	hasIconEnd = false,
	iconEnd = "x", // Icon name for the end
	onPress,
}) => {
	const textStyle = [
		styles.text,
		size === "small" && styles.textSmall,
		variant === "brand" && styles.textBrand,
		state === "active" && styles.textActive,
	];

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			{hasIconStart && (
				<Feather
					name={iconStart}
					size={
						size === "medium"
							? typography.primitives.scale[16]
							: typography.primitives.scale[12]
					}
					color={
						variant === "brand"
							? colors.primitives.brand[700]
							: colors.primitives.gray[900]
					}
					style={styles.iconStart}
				/>
			)}
			<Text style={textStyle}>{label}</Text>
			{hasIconEnd && (
				<Feather
					name={iconEnd}
					size={
						size === "medium"
							? typography.primitives.scale[16]
							: typography.primitives.scale[12]
					}
					color={
						variant === "brand"
							? colors.primitives.brand[700]
							: colors.primitives.gray[900]
					}
					style={styles.iconEnd}
				/>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontFamily: typography.styles.body.fontFamily(),
		fontSize: typography.styles.body.sizes.base(),
		fontWeight: typography.styles.body.fontWeights.bold(),
		color: colors.text.default.default(),
	},
	textSmall: {
		fontSize: typography.styles.body.sizes.xsmall(),
	},
	textBrand: {
		color: colors.text.brand.default(),
	},
	textActive: {
		textDecorationLine: "underline",
	},
	iconStart: {},
});

export default Link;
