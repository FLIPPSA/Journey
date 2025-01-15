import { StyleSheet, Text, View } from "react-native";
import React from "react";
import UpperNavigationBack from "../../components/Navigation/UpperNavigationBack";

export default function Notifications() {
	return (
		<View>
			<UpperNavigationBack
				heading="Notifications"
				showBack={true}
			/>
			<Text>Notifications</Text>
		</View>
	);
}

const styles = StyleSheet.create({});
