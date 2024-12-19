import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, typography, sizes } from "../../utils/design";
import Feather from "@expo/vector-icons/Feather";
import Button from "./../Buttons/Button";
import { useNavigation } from "expo-router";

export default function UpperNavigationBack({
	type = "message",
	showHeading = true,
	heading = "Heading",
	showNext = true,
	showBack = true,
	showIcon = true,
	onPressNext = () => {},
}) {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			{showBack && (
				<Button
					label="Back"
					variant="neutral"
					state="default"
					size="medium"
					onPress={() => navigation.goBack()}
					leftIcon={"arrow-left"}
				/>
			)}
			{showHeading && <Text style={styles.headingText}>{heading}</Text>}
			{showNext && type === "back" && (
				<Button
					label="Next"
					variant="primary"
					state="default"
					size="small"
					onPress={onPressNext}
					rightIcon={"arrow-right"}
				/>
			)}
			{showIcon && type === "message" && (
				<Feather
					name="edit"
					size={20}
					color={colors.icon.default.default()}
					style={styles.editIcon}
				/>
			)}
			{!showNext && type === "back" && (
				<View style={styles.placeholder} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		flexDirection: "row",
	},
	headingText: {
		fontFamily: typography.styles.heading.fontFamily(),
		fontWeight: typography.styles.heading.fontWeight(),
		color: colors.text.default.default(),
	},
	editIcon: {
		padding: sizes.space[12],
	},
	placeholder: {
		width: sizes.space[64],
		height: sizes.space[40],
	},
});
