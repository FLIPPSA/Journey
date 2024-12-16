import * as React from "react";
import { StyleSheet, View } from "react-native";
import Tab from "./Tab";

export default function Tabs({
	showTab2 = true,
	showTab3 = true,
	showTab4 = true,
	showTab5 = true,
}) {
	return (
		<View style={styles.container}>
			<Tab />
			{showTab2 && <Tab />}
			{showTab3 && <Tab />}
			{showTab4 && <Tab />}
			{showTab5 && <Tab />}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		alignItems: "center",
		flexDirection: "row",
	},
});
