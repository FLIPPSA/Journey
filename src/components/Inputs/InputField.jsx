import * as React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { colors, typography, sizes } from "../../utils/design";
import Feather from '@expo/vector-icons/Feather';

export default function InputField({
	state = "Default", // Default, Active, Error, Error-Active
	valueType = "Default", // Default, Placeholder
	inline = true,
	value,
	hasLabel = true,
	label = "Label:",
	hasDescription = false,
	description = "Description",
	hasError = false,
	error = "Error",
	leftIcon = null, // Pass image source for left icon
	rightIcon = null, // Pass image source for right icon
}) {
	const borderColor =
		state === "Error" || hasError
			? "#900b09"
			: state === "Active" || state === "Error-Active"
			? "#af731e"
			: "#757575";

	return (
		<View style={styles.inputField}>
			{hasLabel && (
				<Text style={styles.labelTypo}>{label}</Text>
			)}
			{hasDescription && (
				<Text style={styles.descriptionTypo}>
					{description}
				</Text>
			)}
			<View
				style={[
					styles.inputContainer,
					{
						borderColor: borderColor,
						flexDirection: inline ? "row" : "column",
					},
				]}
			>
				{leftIcon && (
					<Feather name={leftIcon} size={24} color={colors.icon.default.default()} />
				)}
				<Text style={styles.valueTypo}>
					{valueType === "placeholder" ? "" : value}
				</Text>
				{rightIcon && (
					<Feather name={rightIcon} size={24} color={colors.icon.default.default()} />
				)}
			</View>
			{hasError && (
				<Text style={styles.errorText}>{error}</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	labelTypo: {
		textAlign: "left",
		fontFamily: typography.primitives.family,
		fontSize: typography.primitives.scale[13],
		color: colors.text.default.secondary(),
	},
	descriptionTypo: {
		fontFamily: typography.styles.body.fontFamily(),
		fontSize: typography.styles.body.sizes.xsmall(),
		textAlign: "left",
		color: colors.text.default.secondary(),
		alignSelf: "stretch",
	},
	inputContainer: {
		gap: sizes.space[8],
		padding: sizes.space[12],
		backgroundColor: colors.background.default.default(),
		alignItems: "center",
		alignSelf: "stretch",
		borderRadius: sizes.radius[8],
		borderWidth: sizes.stroke[1],
		borderColor: colors.border.default.secondary(),
	},
	valueTypo: {
		color: colors.text.default.default(),
		fontSize: typography.styles.body.sizes.small(),
		fontFamily: typography.styles.body.fontFamily(),
		fontWeight: typography.styles.body.fontWeights.regular(),
		textAlign: "left",
		flex: 1,
	},
	icon: {
		width: sizes.icon.xSmall,
		height: sizes.icon.xSmall,
		overflow: "hidden",
	},
	errorText: {
		color: colors.text.danger.default(),
		fontSize: typography.styles.body.sizes.xsmall(),
		marginTop: sizes.space[4],
		textAlign: "left",
	},
	inputField: {
		width: "100%",
		gap: sizes.space[2],
	},
});
