import { Image, StyleSheet } from "react-native";
import React from "react";
import { sizes } from "../../utils/design";

const imageMap = {
	Facebook: require("../../../assets/Facebook.png"),
	Google: require("../../../assets/Google.png"),
};

export default function Socials({ name }) {
	const imageSource = imageMap[name];

	if (!imageSource) {
		console.warn(`Image for name "${name}" not found.`);
		return null; // Or render a placeholder image
	}

	return (
		<Image
			style={styles.logo}
			source={imageSource}
		/>
	);
}

const styles = StyleSheet.create({
	logo: {
		borderRadius: sizes.radius.circle,
		width: sizes.icon.large,
		height: sizes.icon.large,
	},
});
