import { StyleSheet, Text, View } from "react-native";
import React from "react";
import UpperNavigationBack from "../../components/Navigation/UpperNavigationBack";

export default function Support() {
	return (
		<View style={styles.container}>
			<UpperNavigationBack
				type="back"
				heading="Support"
				showBack={true}
			/>
		</View>
	);
}

const styles = StyleSheet.create({});
