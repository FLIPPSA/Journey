import React from "react";
import {
	StyleSheet,
	ActivityIndicator,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { colors, typography, sizes } from "../../utils/design";
import Feather from "@expo/vector-icons/Feather";

export default function Button({
	variant = "primary",
	state = "default",
	size = "medium",
	label = "Button",
	leftIcon = null,
	rightIcon = null,
	isLoading = false,
	onPress = () => {},
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

	const renderContent = () => {
		if (isLoading) {
			return (
				<ActivityIndicator
					size="small"
					color={variant === "tertiary" ? "#82581C" : "#FFFFFF"}
				/>
			);
		}

		return (
			<>
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
			</>
		);
	};

	return (
		<TouchableOpacity style={buttonStyles} onPress={onPress}>
			{renderContent()}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	buttonBase: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: sizes.space[8],
		height: sizes.space[40],
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
