import * as React from "react";
import { StyleSheet, View } from "react-native";
import { colors, sizes } from "../../utils/design";

export default function Drag() {
	return (
		<View style={[styles.container]} />
	);
}

const styles = StyleSheet.create({
	container: {
		height: sizes.space[4],
		width: sizes.space[64],
		borderRadius: sizes.radius[8],
		backgroundColor: colors.background.default.tertiary(),
	},
});
