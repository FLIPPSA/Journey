import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, typography, sizes } from "../../utils/design";
import Feather from "@expo/vector-icons/Feather";

export default function MenuItem({
	icon = "user",
	title = "Account Center",
	description = "Password, Manage Account",
    onPress
}) {
	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<Feather
				name={icon}
				size={24}
				color={colors.icon.default.default()}
			/>
			<View style={styles.body}>
				<View style={styles.row}>
					<Text style={styles.label}>{title}</Text>
					<Feather
						name="arrow-right"
						size={24}
						color={colors.icon.default.default()}
					/>
				</View>
				<Text style={styles.description}>{description}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: sizes.radius[8],
		width: "100%",
		paddingHorizontal: sizes.space[16],
		paddingVertical: sizes.space[12],
		gap: sizes.space[12],
		flexDirection: "row",
		overflow: "hidden",
	},
	label: {
		fontSize: typography.styles.body.sizes.base(),
		fontWeight: typography.styles.body.fontWeights.bold(),
		fontFamily: typography.styles.body.fontFamily(),
		color: colors.text.default.default(),
		textAlign: "left",
		flex: 1,
	},
	row: {
		alignItems: "center",
		justifyContent: "space-between",
		alignSelf: "stretch",
		flexDirection: "row",
	},
	description: {
		fontSize: typography.styles.body.sizes.small(),
		fontWeight: typography.styles.body.fontWeights.regular(),
		fontFamily: typography.styles.body.fontFamily(),
		color: colors.text.default.secondary(),
		textAlign: "left",
		alignSelf: "stretch",
	},
	body: {
		gap: sizes.space[4],
		flex: 1,
	},
});
