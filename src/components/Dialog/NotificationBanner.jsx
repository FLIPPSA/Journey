import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function NotificationBanner({ icon = "Check circle.png", heading = "Like a Post Completed!", linkText = "See Dailies", onClose }) {
  	return (
    		<View style={styles.notificationBanner}>
      			{/* Icon and Heading */}
      			<View style={styles.iconTextContainer}>
        				<Image style={styles.icon} resizeMode="cover" source={icon} />
        				<Text style={styles.heading}>{heading}</Text>
      			</View>

      			{/* Link */}
      			<View style={styles.linkContainer}>
        				<Text style={styles.linkText}>{linkText}</Text>
        				<Image style={styles.arrowIcon} resizeMode="cover" source="Arrow right.png" />
      			</View>

      			{/* Close Button */}
      			<Image style={styles.closeIcon} resizeMode="cover" source="X.png" onPress={onClose} />
    		</View>
  	);
};

const styles = StyleSheet.create({
  	notificationBanner: {
    		shadowColor: "rgba(12, 12, 13, 0.2)",
    		shadowOffset: { width: 0, height: 1 },
    		shadowOpacity: 1,
    		shadowRadius: 4,
    		elevation: 4,
    		backgroundColor: "#fff",
    		borderRadius: 8,
    		width: "100%",
    		padding: 16,
    		flexDirection: "row",
    		alignItems: "center",
    		justifyContent: "space-between",
  	},
  	iconTextContainer: {
    		flexDirection: "row",
    		alignItems: "center",
  	},
  	icon: {
    		width: 24,
    		height: 24,
    		marginRight: 8,
  	},
  	heading: {
    		fontSize: 16,
    		fontFamily: "Comfortaa-Bold",
    		color: "#1e1e1e",
  	},
  	linkContainer: {
    		flexDirection: "row",
    		alignItems: "center",
  	},
  	linkText: {
    		fontSize: 14,
    		fontFamily: "Comfortaa-Bold",
    		color: "#82581c",
    		marginRight: 4,
  	},
  	arrowIcon: {
    		width: 16,
    		height: 16,
  	},
  	closeIcon: {
    		width: 24,
    		height: 24,
  	},
});