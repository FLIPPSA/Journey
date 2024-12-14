import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { colors, typography, sizes } from "../../utils/design";

export default function InputFieldButton({ state = "Active" }) {
	const isActive = state === "Active";

	return (
		<View
			style={[
				styles.inputContainer,
				isActive ? styles.inputActive : styles.inputDefault,
			]}
		>
			<View style={styles.inputArea}>
				<Text
					style={[
						styles.inputText,
						isActive ? styles.textActive : styles.textDefault,
					]}
				>
					Write a message...
				</Text>
			</View>
			<View style={[styles.button, isActive && styles.buttonActive]}>
				<Text style={styles.buttonText}>Send</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		borderWidth: sizes.stroke[1],
		gap: sizes.space[8],
		borderRadius: sizes.radius[8],
		backgroundColor: colors.background.default.default(),
		overflow: "hidden",
	},
	inputDefault: {
		borderColor: colors.border.default.secondary(),
	},
	inputActive: {
		borderColor: colors.border.brand.default(),
	},
	inputArea: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: sizes.space[12],
	},
	inputText: {
		fontSize: typography.styles.body.sizes.small(),
		fontFamily: typography.styles.body.fontFamily(),
		fontWeight: typography.styles.body.fontWeights.regular(),
	},
	textDefault: {
		color: colors.text.default.secondary(),
	},
	textActive: {
		color: colors.text.default.default(),
	},
	button: {
		padding: sizes.space[12],
		borderTopRightRadius: sizes.radius[8],
		borderBottomRightRadius: sizes.radius[8],
		borderWidth: sizes.stroke[1],
		borderColor: colors.border.brand.default(),
		backgroundColor: colors.background.brand.default(),
	},
	buttonActive: {
		backgroundColor: colors.background.brand.default(),
	},
	buttonText: {
		fontSize: typography.styles.body.sizes.small(),
		fontFamily: typography.styles.body.fontFamily(),
		fontWeight: typography.styles.body.fontWeights.bold(),
		color: colors.text.default.inverse(),
	},
});
