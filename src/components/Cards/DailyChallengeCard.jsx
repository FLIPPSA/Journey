import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors, typography, sizes } from "../../utils/design";

export default function DailyChallengeCard({ text = "Jog for 20 minutes." }) {
	return (
		<View style={styles.container}>
			<Image
				style={styles.imageIcon}
				resizeMode="cover"
				source={{
					uri: "https://static.vecteezy.com/system/resources/thumbnails/032/253/385/small_2x/the-beach-wallpaper-hd-wallpaper-wallpaper-beach-wallpaper-wallpaper-wallpaper-wallpaper-wallpaper-wallpaper-wallpaper-wallpaper-wallpaper-wallpaper-wallpaper-ai-generated-free-photo.jpg",
				}}
			/>
			<View style={styles.textContainer}>
				<Text style={styles.text}>{text}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: sizes.radius[8],
		backgroundColor: colors.background.brand.tertiaryActive(),
		width: "100%",
		height: sizes.space[240],
		maxHeight: sizes.space[240],
		justifyContent: "center",
		flex: 1,
	},
	imageIcon: {
		borderTopLeftRadius: sizes.radius[8],
		borderTopRightRadius: sizes.radius[8],
		maxHeight: "100%",
		width: sizes.space[152],
		flex: 1,
	},
	text: {
		fontSize: typography.styles.body.sizes.xsmall(),
		fontWeight: typography.styles.body.fontWeights.bold(),
		fontFamily: typography.styles.body.fontFamily(),
		color: colors.text.default.default(),
		textAlign: "center",
		flex: 1,
	},
	textContainer: {
		height: sizes.space[50],
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: sizes.space[8],
		paddingVertical: sizes.space[12],
		justifyContent: "center",
	},
});
