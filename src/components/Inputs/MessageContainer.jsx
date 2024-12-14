import InputFieldButton from "./InputFieldButton";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, typography, sizes } from "../../utils/design";

export default function MessageContainer() {
	return (
		<View style={styles.container}>
			<View style={styles.contentWrapper}>
				<InputFieldButton />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: sizes.space[12],
		borderTopWidth: sizes.stroke[1],
		borderTopColor: colors.border.default.default(),
	},
	contentWrapper: {
        width: '100%',
		gap: sizes.space[16],
		paddingHorizontal: sizes.space[16],
	},
});
