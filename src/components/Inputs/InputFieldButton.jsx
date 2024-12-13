import * as React from "react";
import {Text, StyleSheet, View} from "react-native";

export default function InputFieldButton({state = "Default"}) {
  	const isActive = state === "Active";

  	return (
    		<View style={styles.inputFieldButton}>
      			<View
        				style={[
          					styles.inputContainer,
          					isActive ? styles.inputActive : styles.inputDefault,
        				]}
      			>
        				<View style={styles.inputArea}>
          					<Text
            						style={[
              							styles.inputText,
              							isActive ? styles.textActive : styles.textDefault,
            						]}
          					>
            						Write a message...
          					</Text>
          					{isActive && <View style={styles.cursor} />}
        				</View>
        				<View style={[styles.button, isActive && styles.buttonActive]}>
          					<Text style={styles.buttonText}>Send</Text>
        				</View>
      			</View>
    		</View>
  	);
};

const styles = StyleSheet.create({
  	inputFieldButton: {
    		width: "100%",
    		padding: 20,
  	},
  	inputContainer: {
    		flexDirection: "row",
    		alignItems: "center",
    		borderWidth: 1,
    		borderRadius: 8,
    		backgroundColor: "#fff",
    		overflow: "hidden",
  	},
  	inputDefault: {
    		borderColor: "#757575",
  	},
  	inputActive: {
    		borderColor: "#af731e",
  	},
  	inputArea: {
    		flex: 1,
    		flexDirection: "row",
    		alignItems: "center",
    		paddingHorizontal: 12,
  	},
  	inputText: {
    		fontSize: 14,
    		fontFamily: "Comfortaa-Light",
    		fontWeight: "300",
  	},
  	textDefault: {
    		color: "#757575",
  	},
  	textActive: {
    		color: "#1e1e1e",
  	},
  	cursor: {
    		backgroundColor: "#1e1e1e",
    		width: 1,
    		height: 16,
    		marginLeft: 2,
  	},
  	button: {
    		padding: 12,
    		borderTopRightRadius: 8,
    		borderBottomRightRadius: 8,
    		borderLeftWidth: 1,
    		borderColor: "#af731e",
    		backgroundColor: "#c57e1b",
  	},
  	buttonActive: {
    		backgroundColor: "#c57e1b",
  	},
  	buttonText: {
    		fontSize: 14,
    		fontFamily: "Comfortaa-Bold",
    		fontWeight: "700",
    		color: "#f5f5f5",
  	},
});