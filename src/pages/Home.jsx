import { Image, StyleSheet, Platform, View, Text } from "react-native";
import Link from "../components/Navigation/Link";

export default function Home() {
	return (
		<View style={styles.container}>
			<Link />
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
