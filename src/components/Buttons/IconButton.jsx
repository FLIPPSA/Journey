import React, { useEffect, useRef } from "react";
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
	Pressable,
	Animated,
} from "react-native";
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
	const scaleAnim = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		Animated.timing(scaleAnim, {
			toValue: active ? 1.2 : 1, // Scale up if active, reset if not
			duration: 200,
			useNativeDriver: true,
		}).start();
	}, [active]);

	const getStyles = () => {
		const baseStyle = {
			iconContainer: [
				styles.iconContainer,
				styles[`${variant}${active ? "Active" : ""}`],
				from === "Image" && { padding: 0 }, // No padding for Image
			],
			iconSizes: styles[`icon${size}`],
			textStyle: [styles[`text${size}`]],
		};
		return baseStyle;
	};

	const { iconContainer, textStyle } = getStyles();

	return (
		<Pressable style={styles.container} onPress={onPress}>
			<Animated.View
				style={[iconContainer, { transform: [{ scale: scaleAnim }] }]}
			>
				{from === "Feather" && (
					<Feather
						name={icon}
						size={24}
						color={colors.icon.default.inverse()}
					/>
				)}
				{from === "Image" && (
					<Image
						source={typeof icon === "number" ? icon : { uri: icon }}
						style={styles.image}
					/>
				)}
				{from === "FontAwesome6" && (
					<FontAwesome6
						name={icon}
						size={24}
						color={colors.icon.default.inverse()}
					/>
				)}
			</Animated.View>
			{showText && <Text style={textStyle}>{text}</Text>}
		</Pressable>
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
        overflow: "visible", // Allow the image to expand outside the container
        alignItems: "center", // Ensure content stays centered
        justifyContent: "center", // Center content vertically
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
	image: {
		width: sizes.icon.xxLarge,
		height: sizes.icon.xxLarge,
		borderRadius: sizes.radius.circle,
        resizeMode: "cover", // Keep the image proportions intact
        overflow: "hidden", // Ensure the borderRadius applies correctly
	},
});
