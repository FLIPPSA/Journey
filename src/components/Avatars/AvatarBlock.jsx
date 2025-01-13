import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import Avatar from "./Avatar"; // Assuming your Avatar component is in the same directory
import { colors, typography, sizes } from "../../utils/design";
import { Feather } from "@expo/vector-icons";

export default function AvatarBlock({
	size = "medium",
	shape = "circle",
	color = "brand",
	initials = "A",
	imageUri,
	name = "Name",
	description = "Description",
	layout,
	showDescription = false,
	showCheckIcon = false,
	showXIcon = false,
	icon = "Check",
	onPress,
}) {
	const isHorizontal = layout === "horizontal";

	return (
		<Pressable
			style={[styles.container, isHorizontal && styles.horizontalContainer]}
			onPress={onPress}
		>
			{/* Avatar Component */}
			<Avatar
				size={size}
				shape={shape}
				color={color}
				initials={initials}
				imageUri={imageUri}
			/>

			{/* Info Container */}
			<View
				style={[
					styles.infoContainer,
					!isHorizontal && styles.centeredText,
				]}
			>
				<Text style={styles.name}>{name}</Text>
				{showDescription && (
					<Text style={styles.description}>{description}</Text>
				)}
			</View>

			{/* Optional Icons */}
			{showCheckIcon && (
				<View style={styles.checkIcon}>
					<Feather name="check" size={sizes.icon.xSmall} color={colors.icon.default.default()} />
				</View>
			)}
			{showXIcon && (
				<View style={styles.xIcon}>
					<Text style={styles.iconText}>✖</Text>
				</View>
			)}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		// width: "100%",
		padding: sizes.space[16],
        gap: sizes.space[8],
		alignItems: "center",
	},
	horizontalContainer: {
		flexDirection: "row",
		gap: sizes.space[8],
	},
	infoContainer: {
		gap: sizes.space[4],
	},
	centeredText: {
		alignItems: "center",
	},
	name: {
		fontFamily: typography.styles.heading.fontFamily(),
		fontSize: typography.styles.heading.sizes.base(),
		fontWeight: typography.styles.heading.fontWeight(),
		color: colors.text.default.default(),
	},
	description: {
		fontFamily: typography.styles.subheading.fontFamily(),
		fontSize: typography.styles.subheading.sizes.base(),
		fontWeight: typography.styles.subheading.fontWeight(),
		color: colors.text.default.secondary(),
	},
	checkIcon: {
		position: "absolute",
		bottom: sizes.space[40],
		right: sizes.space[12],
        padding: sizes.space[2],
        backgroundColor: colors.background.brand.secondaryActive(),
        borderRadius: sizes.radius.circle,
	},
	xIcon: {
		position: "absolute",
		top: sizes.space[2],
		right: sizes.space[2],
	},
	iconText: {
		color: colors.text.default.default(),
		fontSize: typography.primitives.scale[14],
	},
});
