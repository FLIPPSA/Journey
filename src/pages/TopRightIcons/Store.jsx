import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import UpperNavigationBack from "../../components/Navigation/UpperNavigationBack";
import Tabs from "../../components/Tabs/Tabs";

export default function Store() {
	const [activeTab, setActiveTab] = useState("Emojis");
	const renderActiveScreen = () => {
		switch (activeTab) {
			case "Emojis":
				return (
					<View style={[styles.screen, styles.contentContainer]}>
						<Text>Emojis</Text>
					</View>
				);
			case "Pets":
				return (
					<View style={[styles.screen, styles.contentContainer]}>
						<Text>Pets</Text>
					</View>
				);
			default:
				return null;
		}
	};
	return (
		<View>
			<UpperNavigationBack
				heading="Store"
				showIcon={true}
				showBack={true}
			/>

			<Tabs
				label1="Emojis"
				showTab2={true}
				label2="Pets"
                activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>

			{renderActiveScreen()}
		</View>
	);
}

const styles = StyleSheet.create({});
