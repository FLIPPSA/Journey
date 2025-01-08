import * as React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { colors, typography, sizes } from "../../utils/design";
import Feather from "@expo/vector-icons/Feather";

export default function Search({ state = "Default", text = "Search", onSearch }) {
	const getStylesByState = (state) => {
		switch (state) {
			case "Default":
				return styles.statedefault;
			case "Entered":
				return styles.stateentered;
			case "Active":
				return styles.stateactive;
			default:
				return styles.statedefault;
		}
	};

	return (
		<View style={[styles.stateactiveLayout, getStylesByState(state)]}>
			<TextInput
				style={styles.searchText}
				placeholder={text}
				placeholderTextColor={colors.text.default.secondary()}
				onChangeText={onSearch}
			/>
			<Feather
				name="search"
				size={20}
				color={colors.icon.default.default()}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	stateactiveLayout: {
		maxHeight: sizes.space[48],
		gap: sizes.space[8],
		paddingVertical: sizes.space[12],
		paddingHorizontal: sizes.space[16],
		borderWidth: sizes.stroke[1],
		borderStyle: "solid",
		backgroundColor: colors.primitives.gray[100],
		borderRadius: sizes.radius.circle,
		alignSelf: "stretch",
		alignItems: "center",
		flexDirection: "row",
	},
	searchText: {
		color: colors.text.default.default(),
		textAlign: "left",
		flex: 1,
		fontFamily: typography.styles.body.fontFamily(),
		fontWeight: typography.styles.body.fontWeights.regular(),
		fontSize: typography.styles.body.sizes.small(),
	},
	statedefault: {
		borderColor: colors.border.default.default(),
	},
	stateentered: {
		borderColor: colors.border.brand.secondary(),
	},
	stateactive: {
		borderColor: colors.border.default.tertiary(),
	},
});
