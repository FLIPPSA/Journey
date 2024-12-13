import * as React from "react";
import {Text, StyleSheet, Image, View} from "react-native";

export default function Search({state = "Default", text = "Search"}) {
  	const getStylesByState = (state) => {
    		switch (state) {
      			case "Default":
        				return styles.statedefault;
      			case "Entered":
        				return styles.stateentered;
      			case "Active":
        				return styles.stateactive;
      			default:
        				return styles.statedefault;
    		}
  	};

  	return (
    		<View style={styles.search}>
      			<View style={[styles.stateactiveLayout, getStylesByState(state)]}>
        				{state === "Entered" && (
          					<View style={styles.inputArea}>
            						<Text style={styles.searchTypo}>{text}</Text>
            						<View style={styles.cursor} />
          					</View>
        				)}
        				{state !== "Entered" && (
          					<Text style={styles.searchTypo}>{text}</Text>
        				)}
        				<Image style={styles.searchIcon} resizeMode="cover" source="Search.png" />
      			</View>
    		</View>
  	);
};

const styles = StyleSheet.create({
  	stateactiveLayout: {
    		maxHeight: 48,
    		gap: 8,
    		paddingVertical: 12,
    		paddingHorizontal: 16,
    		borderWidth: 1,
    		borderStyle: "solid",
    		backgroundColor: "#f5f5f5",
    		borderRadius: 9999,
    		alignSelf: "stretch",
    		alignItems: "center",
    		flexDirection: "row",
    		overflow: "hidden",
  	},
  	searchTypo: {
    		color: "#1e1e1e",
    		textAlign: "left",
    		fontFamily: "Comfortaa-Light",
    		fontWeight: "300",
    		fontSize: 14,
  	},
  	searchIcon: {
    		width: 16,
    		height: 16,
    		overflow: "hidden",
  	},
  	statedefault: {
    		borderColor: "#d9d9d9",
  	},
  	stateentered: {
    		borderColor: "#af731e",
  	},
  	stateactive: {
    		borderColor: "#1e1e1e",
  	},
  	cursor: {
    		backgroundColor: "#1e1e1e",
    		width: 1,
    		height: 16,
  	},
  	inputArea: {
    		gap: 2,
    		flex: 1,
    		alignItems: "center",
    		flexDirection: "row",
  	},
  	search: {
    		borderRadius: 8,
    		borderStyle: "dashed",
    		borderColor: "#303030",
    		borderWidth: 2,
    		width: "100%",
    		justifyContent: "center",
    		padding: 21,
    		gap: 22,
    		overflow: "hidden",
  	},
});