import React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { colors, typography, sizes } from "../../utils/design";

export default function Avatar({
	size = "medium",
	shape = "circle",
	color = "brand",
	initials = "A",
	imageUri,
}) {
	const borderRadius =
		shape === "circle" ? sizes.radius.circle : sizes.radius[4];

	const textSizes = {
		large: typography.primitives.scale[20],
		medium: typography.primitives.scale[16],
		small: typography.primitives.scale[14],
	};

	const sizeMapping = {
		small: { width: sizes.icon.large, height: sizes.icon.large, iconSize: sizes.icon.small },
		medium: { width: sizes.space[64], height: sizes.space[64], iconSize: sizes.icon.medium },
		large: { width: sizes.space[96], height: sizes.space[96], iconSize: sizes.icon.large },
	};

	// Default to "medium" size if the size is invalid
	const { width, height, iconSize } = sizeMapping[size] || sizeMapping.medium;

	const backgroundColors = {
		brand: colors.background.brand.default(),
		gray: colors.background.default.tertiary(),
	};

	// Default to "brand" color if the color is invalid
	const backgroundColor = backgroundColors[color] || backgroundColors.brand;

	return (
		<View
			style={[
				styles.container,
				{
					width,
					height,
					borderRadius,
					backgroundColor: imageUri ? "transparent" : backgroundColor,
				},
			]}
		>
			{imageUri ? (
				<Image
					source={{ uri: imageUri }}
					style={[
						styles.image,
						{
							width,
							height,
							borderRadius,
						},
					]}
				/>
			) : (
				<Text
					style={[
						styles.initials,
						{
							fontSize: textSizes[size],
						},
					]}
				>
					{initials}
				</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
	},
	image: {
		resizeMode: "cover",
	},
	initials: {
		color: colors.text.default.inverse(),
		fontFamily: typography.styles.subheading.fontFamily(),
		fontWeight: typography.styles.subheading.fontWeight(),
		textAlign: "center",
	},
});
