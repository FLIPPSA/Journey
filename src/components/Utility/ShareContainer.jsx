import * as React from "react";
import {Image, StyleSheet, View, Text} from "react-native";

export default function ShareContainer({buttons}) {
  	return (
    		<View style={styles.shareContainer}>
      			<View style={[styles.inner, styles.iconFlexBox]}>
        				{buttons.map((button, index) => (
          					<View key={index} style={[styles.iconButton, styles.iconFlexBox]}>
            						<View style={[styles.iconContainer, styles.iconFlexBox]}>
              							<Image style={styles.linkIcon} resizeMode="cover" source={button.icon} />
            						</View>
            						<Text style={styles.text}>{button.label}</Text>
          					</View>
        				))}
      			</View>
    		</View>
  	);
};

const styles = StyleSheet.create({
  	iconFlexBox: {
    		alignItems: "center",
    		justifyContent: "center"
  	},
  	linkIcon: {
    		width: 24,
    		height: 24,
    		overflow: "hidden"
  	},
  	iconContainer: {
    		borderRadius: 9999,
    		backgroundColor: "#e6e6e6",
    		width: 40,
    		height: 40,
    		padding: 12,
    		flexDirection: "row",
    		alignItems: "center"
  	},
  	text: {
    		fontSize: 12,
    		fontWeight: "300",
    		fontFamily: "Comfortaa-Light",
    		color: "#1e1e1e",
    		textAlign: "center"
  	},
  	iconButton: {
    		borderRadius: 32,
    		gap: 2,
    		maxWidth: 64
  	},
  	inner: {
    		width: 360,
    		paddingHorizontal: 16,
    		paddingVertical: 0,
    		gap: 16,
    		flexDirection: "row",
    		alignItems: "center"
  	},
  	shareContainer: {
    		backgroundColor: "#fff",
    		borderStyle: "solid",
    		borderColor: "#d9d9d9",
    		borderTopWidth: 1,
    		flex: 1,
    		width: "100%",
    		paddingHorizontal: 0,
    		paddingVertical: 12,
    		justifyContent: "center"
  	}
});