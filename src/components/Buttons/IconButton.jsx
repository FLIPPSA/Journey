import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { colors, typography, sizes } from "../../utils/design";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function IconButton({
	variant = "primary", // primary, neutral, tertiary
	active = false,
	size = "medium", // medium, small, x-small
	icon,
	from = "Image",
	showText = true,
	text = "Text",
	onPress,
}) {
	const getStyles = () => {
		const baseStyle = {
			iconContainer: [
				styles.iconContainer,
				styles[`${variant}${active ? "Active" : ""}`],
			],
			iconSizes: styles[`icon${size}`],
			textStyle: styles[`text${size}`],
		};
		return baseStyle;
	};

	const { iconContainer, textStyle } = getStyles();

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<View style={iconContainer}>
				{from === "Feather" && (
					<Feather
						name={icon}
						size={24}
						color={colors.icon.default.inverse()}
					/>
				)}
				{from === "Image" && (
					<Image source={icon} style={styles.icon} />
				)}
				{from === "FontAwesome6" && (
					<FontAwesome6
						name={icon}
						size={24}
						color={colors.icon.default.inverse()}
					/>
				)}
			</View>
			{showText && <Text style={textStyle}>{text}</Text>}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		gap: sizes.space[2],
	},
	iconContainer: {
		borderRadius: sizes.radius.circle,
		padding: sizes.space[8],
	},
	primary: {
		backgroundColor: colors.background.brand.default(),
	},
	primaryActive: {
		backgroundColor: colors.background.brand.active(),
	},
	neutral: {
		backgroundColor: colors.background.default.secondary(),
	},
	neutralActive: {
		backgroundColor: colors.background.default.secondaryActive(),
	},
	tertiary: {
		backgroundColor: colors.background.brand.tertiary(),
	},
	iconmedium: {
		width: sizes.icon.small,
		height: sizes.icon.small,
	},
	iconsmall: {
		width: sizes.icon.xSmall,
		height: sizes.icon.xSmall,
	},
	iconxsmall: {
		width: sizes.icon.xxSmall,
		height: sizes.icon.xxSmall,
	},
	textmedium: {
		fontSize: typography.styles.body.sizes.small(),
		fontWeight: typography.styles.body.fontWeights.regular(),
		fontFamily: typography.styles.body.fontFamily(),
		color: colors.text.default.default(),
	},
	textsmall: {
		fontSize: typography.styles.body.sizes.xsmall(),
		fontWeight: typography.styles.body.fontWeights.regular(),
		fontFamily: typography.styles.body.fontFamily(),
		color: colors.text.default.default(),
	},
	textxsmall: {
		fontSize: typography.styles.body.sizes.xsmall(),
		fontWeight: typography.styles.body.fontWeights.regular(),
		fontFamily: typography.styles.body.fontFamily(),
		color: colors.text.default.default(),
	},
});
