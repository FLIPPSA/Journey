import { Image, StyleSheet, Platform, View, Text } from "react-native";
import UpperNavigation from "../../components/Navigation/UpperNavigation";
import PostCard from "../../components/Cards/PostCard";

export default function Home() {
	return (
		<View style={styles.container}>
			<UpperNavigation />
            <PostCard />
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
