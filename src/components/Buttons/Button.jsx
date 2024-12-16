import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { colors, typography, sizes } from "../../utils/design";
import Feather from "@expo/vector-icons/Feather";

export default function Button({
	variant = "primary",
	state = "default",
	size = "medium",
	label = "Button",
	leftIcon = null,
	rightIcon = null,
}) {
	const buttonStyles = [
		styles.buttonBase,
		styles[`${variant}Button`],
		state === "active" && styles[`${variant}ButtonActive`],
		size === "small" && styles.smallButton,
	];

	const textStyles = [
		styles.textBase,
		styles[`${variant}Text`],
		state === "active" && styles[`${variant}TextActive`],
	];

	return (
		<TouchableOpacity style={buttonStyles}>
			{leftIcon && (
				<Feather
					name={leftIcon}
					size={24}
                    style={styles[`${variant}Text`]}
				/>
			)}
			<Text style={textStyles}>{label}</Text>
			{rightIcon && (
				<Feather
					name={rightIcon}
					size={24}
					style={styles[`${variant}Text`]}
				/>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	buttonBase: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: sizes.space[8],
		padding: sizes.space[12],
		borderRadius: sizes.radius[8],
	},
	textBase: {
		fontFamily: typography.styles.body.fontFamily(),
		fontSize: typography.styles.body.sizes.base(),
		fontWeight: typography.styles.body.fontWeights.bold(),
		textAlign: "center",
	},
	primaryButton: {
		backgroundColor: colors.background.brand.default(),
		borderColor: colors.border.brand.default(),
        borderWidth: sizes.stroke[1],
	},
	primaryButtonActive: {
		backgroundColor: colors.background.brand.active(),
		borderColor: colors.border.brand.default(),
	},
	primaryText: {
		color: colors.text.default.inverse(),
	},
	primaryTextActive: {
		color: colors.text.default.inverse(),
	},
	secondaryButton: {
		backgroundColor: colors.background.brand.tertiary(),
		borderColor: colors.border.brand.secondary(),
        borderWidth: sizes.stroke[1],
	},
	secondaryButtonActive: {
		backgroundColor: colors.background.brand.tertiary(),
		borderColor: colors.border.brand.secondary(),
	},
	secondaryText: {
		color: colors.text.brand.default(),
	},
	secondaryTextActive: {
		color: colors.text.default.default(),
	},
	neutralButtonActive: {
		borderColor: colors.border.default.tertiary(),
		borderWidth: sizes.stroke[1],
	},
	neutralText: {
		color: colors.text.default.default(),
	},
	neutralTextActive: {
		color: colors.text.default.inverse(),
	},
	tertiaryButtonActive: {
		borderColor: colors.border.brand.secondary(),
		borderWidth: sizes.stroke[1],
	},
	tertiaryText: {
		color: colors.text.brand.default(),
	},
	tertiaryTextActive: {
		color: colors.text.brand.default(),
	},
	smallButton: {
		padding: sizes.space[8],
	},
});
