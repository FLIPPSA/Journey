import * as React from "react";
import { StyleSheet, View } from "react-native";
import { colors, sizes } from "../../utils/design";
import IconButton from "../Buttons/IconButton";

export default function ShareContainer({ buttons }) {
	return (
		<View style={styles.container}>
			<View style={styles.inner}>
				<IconButton from={"Feather"} icon={"copy"} variant="neutral" text="Copy Link" />
				<IconButton from={"Feather"} icon={"share-2"} variant="neutral" text="Share To" />
				<IconButton from={"Feather"} icon={"facebook"} variant="neutral" text="Facebook" />
				<IconButton from={"Feather"} icon={"instagram"} variant="neutral" text="Instagram" />
				<IconButton from={"FontAwesome6"} icon={"x-twitter"} variant="neutral" text="X" />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.background.default.default(),
		borderStyle: "solid",
		borderColor: colors.border.default.default(),
		borderTopWidth: sizes.stroke[1],
		width: "100%",
		paddingHorizontal: sizes.space[0],
		paddingVertical: sizes.space[12],
		justifyContent: "center",
	},
    inner: {
		width: sizes.space[360],
		paddingHorizontal: sizes.space[16],
		paddingVertical: sizes.space[0],
		gap: sizes.space[16],
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
});
