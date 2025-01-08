import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors, typography, sizes } from "../../utils/design";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "expo-router";

export default function ProfileNavigation({
	showBack = true,
	backLabel = "Back",
	showProfile = true,
	profileName = "Jenni So",
	profileImage,
	showMenu = true,
}) {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			{/* Back Button */}
			{showBack && (
				<View style={styles.button}>
					<Feather
						name="arrow-left"
						size={24}
						color={colors.icon.default.default()}
					/>
					<Text style={styles.backLabel}>{backLabel}</Text>
				</View>
			)}

			{/* Profile Section */}
			{showProfile && (
				<View style={styles.avatarBlockContainer}>
					<View style={styles.profileInfo}>
						{profileImage ? (
							<Image
								style={styles.profileImage}
								resizeMode="cover"
								source={{ uri: profileImage }}
							/>
						) : (
							<View
								style={[
									styles.profileImage,
									{
										justifyContent: "center",
										alignItems: "center",
										backgroundColor: colors.background.default.secondary(),
									},
								]}
							>
								<Feather
									name="user"
									size={sizes.icon.small}
									color={colors.icon.default.default()}
								/>
							</View>
						)}

						<Text style={styles.name}>{profileName}</Text>
					</View>

					{/* Menu Icon */}
					{showMenu && (
						<Feather
							name="menu"
							size={24}
							color={colors.icon.default.default()}
							onPress={() => {
								navigation.navigate("Settings");
							}}
						/>
					)}
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: sizes.space[8],
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: colors.background.default.default(),
		width: "100%",
	},
	name: {
		color: colors.text.default.default(),
		fontFamily: typography.styles.heading.fontFamily(),
		fontWeight: typography.styles.heading.fontWeight(),
		fontSize: typography.styles.heading.sizes.base(),
	},
	profileImage: {
		height: sizes.icon.large,
		width: sizes.icon.large,
		borderRadius: sizes.radius.circle,
	},
	backLabel: {
		fontSize: typography.styles.body.sizes.small(),
		textAlign: "left",
		color: colors.text.default.default(),
		fontFamily: typography.primitives.family,
		fontWeight: typography.styles.body.fontWeights.bold(),
	},
	button: {
		gap: sizes.space[8],
		alignItems: "center",
		flexDirection: "row",
		borderRadius: sizes.radius[8],
		padding: sizes.space[12],
		justifyContent: "center",
	},
	iconButton: {
		borderRadius: sizes.radius[32],
		justifyContent: "center",
		padding: sizes.space[8],
		alignItems: "center",
		flexDirection: "row",
	},
	avatarBlockContainer: {
		alignItems: "center",
		width: "100%",
		justifyContent: "space-between",
		flexDirection: "row",
	},
	profileInfo: {
		flexDirection: "row",
		alignItems: "center",
		gap: sizes.space[8],
	},
});
