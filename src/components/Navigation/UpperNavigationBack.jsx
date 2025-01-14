import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, typography, sizes } from "../../utils/design";
import Feather from "@expo/vector-icons/Feather";
import Button from "./../Buttons/Button";
import { useNavigation } from "expo-router";
import { wp } from "../../utils/common";

export default function UpperNavigationBack({
	type = "message",
	showHeading = true,
	heading = "Heading",
	showNext = false,
	showBack = false,
	showIcon = false,
	onPressNext = () => {},
}) {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			{!showBack && <View style={styles.widthContainer} />}
			{showBack && (
				<View style={styles.widthContainer}>
					<Button
						label="Back"
						variant="neutral"
						state="default"
						size="medium"
						onPress={() => navigation.goBack()}
						leftIcon={"arrow-left"}
					/>
				</View>
			)}
			{showHeading && <Text style={styles.headingText}>{heading}</Text>}
			{showNext && type === "back" && (
				<View style={styles.widthContainer}>
					<Button
						label="Next"
						variant="primary"
						state="default"
						size="small"
						onPress={onPressNext}
						rightIcon={"arrow-right"}
					/>
				</View>
			)}
			{showIcon && type === "message" && (
				<View style={styles.widthContainer}>
					<Feather
						name="edit"
						size={20}
						color={colors.icon.default.default()}
						style={{ textAlign: "center" }}
					/>
				</View>
			)}
			{!showIcon && type === "message" && (
				<View style={styles.widthContainer} />
			)}
            {!showIcon && !showNext && <View style={styles.widthContainer} />}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		height: sizes.space[64],
	},
	headingText: {
		flex: 1, // Occupies the central space
		textAlign: "center", // Centers the text horizontally
		fontFamily: typography.styles.heading.fontFamily(),
		fontWeight: typography.styles.heading.fontWeight(),
		fontSize: typography.styles.heading.sizes.base(),
		color: colors.text.default.default(),
	},
	widthContainer: {
		width: sizes.space[96], // Ensures consistent width for alignment'
	},
});
