import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Logo from "../../components/Brand/Logo";
import LottieView from "lottie-react-native";
import { sizes } from "../../utils/design";

export default function Splash() {
	return (
		<View style={styles.container}>
			<Logo />
			<View style={styles.roundedContainer}>
				<LottieView
					source={{
						uri: "https://lottie.host/b14aa121-01fb-4190-9882-76ae6f5a26df/tnAhIoOdiJ.json",
					}}
					autoPlay
					loop
					style={styles.animation}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		gap: sizes.space[32],
		paddingHorizontal: sizes.space[16],
	},
	roundedContainer: {
		width: 300, // Set your desired width
		height: 300, // Set your desired height
		borderRadius: 24, // Change this value to adjust the radius
		overflow: "hidden", // This ensures the rounded corners apply to the child
		backgroundColor: "#fff", // Optional background color
	},
	animation: {
		width: "100%",
		height: "100%",
	},
});
