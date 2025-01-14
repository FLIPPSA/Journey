import React from "react";
import { StyleSheet, View } from "react-native";
import Tab from "./Tab";

export default function Tabs({
	label1 = "Tab",
	showTab2 = false,
	label2 = "Tab",
	showTab3 = false,
	label3 = "Tab",
	showTab4 = false,
	label4 = "Tab",
	showTab5 = false,
	label5 = "Tab",
	activeTab,
	setActiveTab,
}) {
	return (
		<View style={styles.container}>
			<Tab
				label={label1}
				active={activeTab === label1}
				onPress={() => setActiveTab(label1)}
			/>
			{showTab2 && (
				<Tab
					label={label2}
					active={activeTab === label2}
					onPress={() => setActiveTab(label2)}
				/>
			)}
			{showTab3 && (
				<Tab
					label={label3}
					active={activeTab === label3}
					onPress={() => setActiveTab(label3)}
				/>
			)}
			{showTab4 && (
				<Tab
					label={label4}
					active={activeTab === label4}
					onPress={() => setActiveTab(label4)}
				/>
			)}
			{showTab5 && (
				<Tab
					label={label5}
					active={activeTab === label5}
					onPress={() => setActiveTab(label5)}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-evenly", // Ensure even spacing between tabs
		alignItems: "center",
		flexWrap: "nowrap", // Prevent wrapping to the next line
	},
});
