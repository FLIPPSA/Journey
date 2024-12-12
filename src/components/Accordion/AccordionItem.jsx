import React, { useState } from "react";
import { Text, StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { colors, typography, sizes } from "../../utils/design";
import Feather from "@expo/vector-icons/Feather";

export default function AccordionItem({
	title = "Title",
	content = "Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.",
	expandedInitially = false,
}) {
	const [expanded, setExpanded] = useState(expandedInitially);

	return (
		<View style={[styles.accordionItem, expanded && styles.headerExpanded]}>
			{/* Header */}
			<TouchableOpacity
				style={styles.header}
				onPress={() => setExpanded(!expanded)}
			>
				<Text style={styles.title}>{title}</Text>
				<Feather
					name={expanded ? "chevron-up" : "chevron-down"}
					size={sizes.icon.small}
					color={colors.icon.default.default()}
				/>
			</TouchableOpacity>

			{/* Content */}
			{expanded && (
				<View style={styles.content}>
					<Text style={styles.body}>{content}</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	accordionItem: {
		width: "100%",
		borderColor: colors.border.default.default(),
		borderWidth: sizes.stroke[1],
		borderRadius: sizes.radius[8],
		backgroundColor: colors.background.default.secondary(),
		padding: sizes.space[16],
        gap: sizes.space[8],
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		gap: sizes.space[8],
	},
	headerExpanded: {
		backgroundColor: colors.background.default.default(),
	},
	title: {
		flex: 1,
		fontFamily: typography.styles.body.fontFamily(),
		fontSize: typography.styles.body.sizes.base(),
		fontWeight: typography.styles.body.fontWeights.bold(),
		color: colors.text.default.default(),
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	body: {
		fontFamily: typography.styles.body.fontFamily(),
		fontSize: typography.styles.body.sizes.small(),
		fontWeight: typography.styles.body.fontWeights.regular(),
		color: colors.text.default.default(),
	},
});
