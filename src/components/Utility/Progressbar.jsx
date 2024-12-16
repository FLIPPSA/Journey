import * as React from "react";
import { StyleSheet, View } from "react-native";
import { colors, sizes } from "../../utils/design";

export default function ProgressBar({ progress = [0, 12, 25, 50, 75, 100] }) {
	return (
		<View style={styles.container}>
			{progress.map((num, ind) => (
				<View style={styles.fullBar} key={ind}>
					<View style={[styles.activeTrack, { width: `${num}%` }]} />

					<View
						style={[styles.track, { width: `${100 - num}%` }]}
						key={ind}
					/>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: sizes.space[16],
		justifyContent: "center",
		width: "75%",
	},
	fullBar: {
		alignItems: "center",
		flexDirection: "row",
	},
	track: {
		height: sizes.space[4],
		backgroundColor: colors.background.brand.default(),
		borderRadius: sizes.radius[8],
		overflow: "hidden",
	},
	activeTrack: {
		height: "100%",
		backgroundColor: colors.background.brand.secondaryActive(),
		borderRadius: sizes.radius[8],
	},
});
