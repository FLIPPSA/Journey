import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { colors, typography, sizes } from "../../utils/design";
import { Feather } from "@expo/vector-icons";

export default function AvatarBlock({
	layout = "horizontal",
	showDescription = true,
	description = "Description",
	name = "Name",
	showCheckIcon = false,
	showXIcon = false,
	icon = "Check",
	avatarUri,
    onPress
}) {
	const isHorizontal = layout === "horizontal";

	return (
		<TouchableOpacity
			style={styles.container}
            onPress={onPress}
		>
			<View style={styles.avatarContainer}>
				{/* Render Avatar or Placeholder */}
				{avatarUri ? (
					<Image
						source={{ uri: avatarUri }}
						style={[
							styles.avatar,
							{
								width: isHorizontal ? sizes.icon.medium : sizes.icon.large,
								height: isHorizontal ? sizes.icon.medium : sizes.icon.large,
							},
						]}
					/>
				) : (
					<View
						style={[
							styles.avatar,
							{
								width: isHorizontal ? sizes.icon.medium : sizes.icon.large,
								height: isHorizontal ? sizes.icon.medium : sizes.icon.large,
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: colors.background.default.secondary(),
							},
						]}
					>
						<Feather
							name="user"
							size={isHorizontal ? sizes.icon.small : sizes.icon.medium}
							color={colors.icon.default.default()}
						/>
					</View>
				)}
				{/* Show Check Icon */}
				{showCheckIcon && (
					<Image
						source={{ uri: icon }}
						style={[styles.checkIcon]}
					/>
				)}
				{/* Show X Icon */}
				{showXIcon && (
					<Image
						source={{ uri: "xIcon" }}
						style={[styles.xIcon]}
					/>
				)}
			</View>
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
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		padding: sizes.space[16],
		gap: sizes.space[16],
	},
	avatarContainer: {
		position: "relative",
	},
	avatar: {
		borderRadius: sizes.radius.circle,
	},
	checkIcon: {
		position: "absolute",
		bottom: -sizes.space[4],
		right: -sizes.space[4],
		width: sizes.icon.xxSmall,
		height: sizes.icon.xxSmall,
	},
	xIcon: {
		position: "absolute",
		top: sizes.space[2],
		right: sizes.space[2],
		width: sizes.icon.xxSmall,
		height: sizes.icon.xxSmall,
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
});
