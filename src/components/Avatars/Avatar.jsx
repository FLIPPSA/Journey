import React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { colors, typography, sizes } from "../../utils/design";

export default function Avatar({
	type = "initial",
	size = "medium",
	shape = "circle",
	initials = "A",
	imageUri,
}) {
	const borderRadius =
		shape === "circle" ? sizes.radius.circle : sizes.radius[4];

	const textSizes = {
		large: typography.primitives.scale[20],
		large: typography.primitives.scale[20],
		medium: typography.primitives.scale[16],
		small: typography.primitives.scale[14],
	};

	return (
		<View
			style={[
				styles.container,
				{
					width: sizes.icon[size],
					height: sizes.icon[size],
					borderRadius,
					backgroundColor:
						type === "initial" && colors.background.brand.default(),
				},
			]}
		>
			{type === "image" ? (
				<Image
					source={{ uri: imageUri }}
					style={[
						styles.image,
						{
							width: sizes.icon[size],
							height: sizes.icon[size],
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
