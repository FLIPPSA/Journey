import {
	Image,
	StyleSheet,
	View,
	Text,
	FlatList,
	Animated,
} from "react-native";
import { colors, typography, sizes } from "../../utils/design";
import TextIcon from "../Icons/TextIcon";
import Logo from "../Brand/Logo";
import IconButton from "../Buttons/IconButton";
import TextButton from "../Buttons/TextButton";
import { useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { toggleSelection } from "../../utils/common";

export default function UpperNavigation({
	domains = [],
	selectedDomains,
	setSelectedDomains,
}) {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			{/* Upper Section */}
			<View style={styles.upper}>
				<View style={styles.content}>
					{/* Logo */}
					<Logo />

					{/* Icons */}
					<View style={styles.upperIcons}>
						<TextIcon
							from={"Feather"}
							name={"bell"}
							number={5}
							onPress={() => navigation.navigate("Notifications")}
						/>
						<TextIcon
							from={"MaterialCommunityIcons"}
							name={"treasure-chest"}
							number={"8"}
							onPress={() => navigation.navigate("Rewards")}
						/>
						<TextIcon
							from={"Feather"}
							name={"shopping-cart"}
							onPress={() => navigation.navigate("Store")}
						/>
					</View>
				</View>
			</View>

			{/* Lower Section */}
			<View style={styles.lower}>
				<View style={styles.content}>
					<IconButton
						from="Image"
						icon={require("../../../assets/images/infity_wallpaper.jpg")}
						text={"All"}
						active={selectedDomains.includes("All")}
						onPress={() => toggleSelection("All", setSelectedDomains, "All")}
					/>

					<FlatList
						data={domains}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item }) => (
							<IconButton
								from="Image"
								icon={item.fileUrl}
								text={item.title}
								active={selectedDomains.includes(item.id)}
								onPress={() => toggleSelection(item.id, setSelectedDomains, "All")}
							/>
						)}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.domainList} // Ensure overflow is visible
						style={{ overflow: "visible" }} // Ensure FlatList itself allows overflow
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.background.default.default(),
		alignItems: "center",
		overflow: "hidden",
	},
	upper: {
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		paddingHorizontal: sizes.space[16],
		paddingVertical: sizes.space[8],
	},
	content: {
		width: "100%",
		flexDirection: "row",
		gap: sizes.space[8],
		justifyContent: "space-between",
		alignItems: "center",
	},
	upperIcons: {
		gap: sizes.space[16],
		flexDirection: "row",
		alignItems: "center",
	},
	badgeText: {
		fontSize: typography.styles.subheading.sizes.small(),
		lineHeight: typography.styles.subheading.sizes.small(),
		color: colors.text.default.inverse(),
		fontFamily: typography.styles.subheading.fontFamily(),
		fontWeight: typography.styles.subheading.fontWeight(),
		textAlign: "center",
	},
	lower: {
		width: "100%",
		paddingHorizontal: sizes.space[16],
		paddingVertical: sizes.space[8],
	},
	categoryButton: {
		gap: sizes.space[2],
		maxWidth: sizes.space[64],
		borderRadius: sizes.radius.circle,
		justifyContent: "center",
		alignItems: "center",
	},
	iconContainer: {
		position: "relative",
	},
	runIcon: {
		width: sizes.space[24],
		height: sizes.space[24],
		overflow: "hidden",
	},
	categoryText: {
		fontSize: typography.styles.body.sizes.xsmall(),
		fontWeight: typography.styles.body.fontWeights.regular(),
		fontFamily: typography.styles.body.fontFamily(),
		color: colors.text.default.default(),
		textAlign: "center",
	},
	activeCategory: {
		backgroundColor: colors.background.brand.default(),
	},
    domainList: {
        gap: sizes.space[12],
        overflow: "visible"
    }
});
