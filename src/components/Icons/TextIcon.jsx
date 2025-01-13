import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, typography, sizes } from "../../utils/design";

export default function TextIcon({ from, name, number, onPress }) {
	return (
		<Pressable style={styles.container} onPress={onPress}>
			{from === "Feather" && (
				<Feather
					name={name}
					size={24}
					color={colors.icon.default.default()}
				/>
			)}
			{from === "MaterialCommunityIcons" && (
				<MaterialCommunityIcons
					name={name}
					size={24}
					color={colors.icon.default.default()}
				/>
			)}
			{number && (
				<View style={styles.iconTextContainer}>
					<Text style={styles.iconText}>{number}</Text>
				</View>
			)}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
	},
	iconTextContainer: {
		position: "absolute",
		bottom: -sizes.space[4],
		right: -sizes.space[4],
		width: sizes.space[16],
		height: sizes.space[16],
		backgroundColor: colors.background.brand.default(),
		borderRadius: sizes.radius.circle,
		justifyContent: "center",
		alignItems: "center",
	},
	iconText: {
		fontSize: typography.styles.body.sizes.xsmall(),
		fontWeight: typography.styles.body.fontWeights.bold(),
		color: colors.text.default.inverse(),
	},
});
