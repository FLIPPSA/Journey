import * as React from "react";
import { StyleSheet, View } from "react-native";
import { colors, sizes } from "../../utils/design";
import { Feather } from "@expo/vector-icons";

export default function Checkbox({ checked = true }) {
	return (
		<View style={checked ? styles.checked : styles.unchecked}>
			{checked && (
				<Feather
					name="check"
					size={16}
					color={colors.icon.default.inverse()}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	unchecked: {
		borderRadius: sizes.radius.circle, // Fully rounded for circle shapes
		borderColor: colors.border.brand.default(),
		height: sizes.space[24],
		width: sizes.space[24],
	},
	checked: {
		alignItems: "center",
		justifyContent: "center",
		borderRadius: sizes.radius.circle, // Fully rounded for circle shapes
		backgroundColor: colors.background.brand.default(),
		height: sizes.space[24],
		width: sizes.space[24],
	},
});
