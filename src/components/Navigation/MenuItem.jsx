import * as React from "react";
import {Image, StyleSheet, Text, View} from "react-native";

export default function MenuItem({icon, title, description}) {
  	return (
    		<View style={styles.menuItem}>
      			<Image style={styles.icon} resizeMode="cover" source={icon} />
      			<View style={styles.body}>
        				<View style={styles.row}>
          					<Text style={styles.label}>{title}</Text>
          					<Image style={styles.arrowRightIcon} resizeMode="cover" source="Arrow right.png" />
        				</View>
        				<Text style={styles.description}>{description}</Text>
      			</View>
    		</View>
  	);
};

const styles = StyleSheet.create({
  	icon: {
    		width: 20,
    		height: 20,
    		overflow: "hidden"
  	},
  	label: {
    		fontSize: 14,
    		fontWeight: "700",
    		fontFamily: "Comfortaa-Bold",
    		color: "#1e1e1e",
    		textAlign: "left",
    		flex: 1
  	},
  	arrowRightIcon: {
    		width: 24,
    		height: 24,
    		overflow: "hidden"
  	},
  	row: {
    		alignItems: "center",
    		justifyContent: "space-between",
    		alignSelf: "stretch",
    		flexDirection: "row"
  	},
  	description: {
    		fontSize: 12,
    		fontWeight: "300",
    		fontFamily: "Comfortaa-Light",
    		color: "#757575",
    		textAlign: "left",
    		alignSelf: "stretch"
  	},
  	body: {
    		gap: 4,
    		flex: 1
  	},
  	menuItem: {
    		borderRadius: 8,
    		width: "100%",
    		paddingHorizontal: 16,
    		paddingVertical: 12,
    		gap: 12,
    		flexDirection: "row",
    		overflow: "hidden",
    		flex: 1
  	}
});