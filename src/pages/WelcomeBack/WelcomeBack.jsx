import { Image, StyleSheet, Platform, View, Text } from "react-native";
import ProgressBar from "../components/Utility/ProgressBar";

export default function Home() {
	return (
		<View style={styles.container}>
			<ProgressBar />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
