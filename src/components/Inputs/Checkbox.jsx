import * as React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function Checkbox({ checked = false }) {
  	return (
    		<View style={styles.checkbox}>
      			{checked ? (
        				<Image
          					style={[styles.checkedIcon, styles.iconLayout]}
          					resizeMode="cover"
          					source="Checked?=Yes.png"
        				/>
      			) : (
        				<Image
          					style={[styles.uncheckedIcon, styles.iconLayout]}
          					resizeMode="cover"
          					source="Checked?=No.png"
        				/>
      			)}
    		</View>
  	);
};

const styles = StyleSheet.create({
  	iconLayout: {
    		borderRadius: 9999,
    		position: "absolute",
    		overflow: "hidden",
  	},
  	checkedIcon: {
    		top: "55.1%",
    		left: "31.25%",
    		right: "31.25%",
    		bottom: "20.41%",
    		width: "37.5%",
    		height: "24.49%",
    		maxWidth: "100%",
    		maxHeight: "100%",
  	},
  	uncheckedIcon: {
    		top: 20,
    		left: 20,
    		width: 24,
    		height: 24,
  	},
  	checkbox: {
    		borderRadius: 5,
    		borderStyle: "dashed",
    		borderColor: "#9747ff",
    		borderWidth: 1,
    		width: "100%",
    		height: 98,
    		overflow: "hidden",
  	},
});