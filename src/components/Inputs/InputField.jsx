import React, { useState, forwardRef } from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";
import { colors, typography, sizes } from "../../utils/design";
import Feather from "@expo/vector-icons/Feather";

const InputField = forwardRef(
	(
		{
			value = "",
			onChangeText,
			hasLabel = true,
			label = "Label:",
			hasDescription = false,
			description = "Description",
			hasError = false,
			error = "Error",
			leftIcon = null,
			rightIcon = null,
			placeholder = "Type here...",
			rightOnPress = () => {},
            editable = true
		},
		ref
	) => {
		const [isFocused, setIsFocused] = useState(false); // Track focus state

		const borderColor = hasError
			? colors.text.danger.default()
			: isFocused
			? colors.background.brand.default()
			: colors.border.default.secondary();

		return (
			<View style={styles.inputField}>
				{hasLabel && <Text style={styles.labelTypo}>{label}</Text>}
				{hasDescription && (
					<Text style={styles.descriptionTypo}>
						{description}
					</Text>
				)}
				<View style={[styles.inputContainer, { borderColor }]}>
					{leftIcon && (
						<Feather
							name={leftIcon}
							size={24}
							color={colors.icon.default.default()}
						/>
					)}
					<TextInput
						ref={ref} // Attach the ref to TextInput
						style={styles.inputText}
						placeholder={placeholder}
						multiline={true}
						onChangeText={onChangeText}
						value={value}
						placeholderTextColor={colors.text.default.secondary()}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
                        editable={editable}
					/>
					{rightIcon && (
						<Feather
							name={rightIcon}
							size={sizes.icon.small}
							color={colors.icon.default.default()}
							onPress={rightOnPress}
						/>
					)}
				</View>
				{hasError && (
					<Text style={styles.errorText}>{error}</Text>
				)}
			</View>
		);
	}
);

export default InputField;

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
		paddingHorizontal: sizes.space[12],
        paddingVertical: sizes.space[8],
		backgroundColor: colors.background.default.default(),
		alignItems: "center",
		alignSelf: "stretch",
		flexDirection: "row",
		borderRadius: sizes.radius[8],
		borderWidth: sizes.stroke[1],
	},
	inputText: {
		color: colors.text.default.default(),
		fontSize: typography.styles.body.sizes.small(),
		fontFamily: typography.styles.body.fontFamily(),
		fontWeight: typography.styles.body.fontWeights.regular(),
		textAlign: "left",
		flex: 1,
	},
	errorText: {
		color: colors.text.danger.default(),
		fontSize: typography.styles.body.sizes.xsmall(),
		marginTop: sizes.space[4],
		textAlign: "left",
	},
	inputField: {
		gap: sizes.space[2],
		flex: 1,
	},
});
