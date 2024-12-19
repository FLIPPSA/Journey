import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { colors, sizes, typography } from "../../utils/design";
import IconButton from "../../components/Buttons/IconButton";
import PostCard from "../../components/Cards/PostCard";
import Button from "../../components/Buttons/Button";
import Divider from "../../components/Utility/Divider";
import TextIcon from "../../components/Icons/TextIcon";
import Logo from "../../components/Brand/Logo";

export default function WelcomeBack() {
	return (
		<View style={styles.container}>
			{/* Banner */}
			<View style={styles.banner}>
				<View style={styles.bannerContent}>
					<Logo showText={false}/>
					<Text style={styles.heading}>Welcome Back!</Text>
					<Text style={styles.subheading}>
						You've made progress in <Text style={styles.days}>7 days!</Text>
					</Text>
				</View>

				{/* Progress Stats */}
				<View style={styles.stats}>
					<TextIcon icon="star" from={"Feather"} text="7 Tokens" />
					<TextIcon icon="target" from={"Feather"} text="111 Points" />
					<TextIcon icon="treasure-chest" from={"MaterialCommunityIcons"} text="22 Chests" />
					<TextIcon icon="award" from={"Feather"} text="3 Badges" />
				</View>
			</View>

			{/* Posts Section */}
			<View style={styles.content}>
				<Text style={styles.sectionTitle}>Users Love These Posts!</Text>

				<View style={styles.carousel}>
					<IconButton icon="chevron-left" from="Feather" variant="primary" />
					<PostCard
						imageSource="https://source.unsplash.com/UCd78vfC8vU"
						likedBy="Tom Nooks"
						likes={62}
						description="Encountered two rare Pokémon's! I was so lucky to see them in the distance..."
					/>
					<IconButton icon="chevron-right" from="Feather" variant="primary" />
				</View>
			</View>

			{/* Action Buttons */}
			<View style={styles.buttons}>
				<Button variant="primary" size="large" label="Continue" />
				<Button variant="tertiary" size="large" label="Share Results" />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background.default.default(),
	},
	banner: {
		backgroundColor: colors.background.brand.tertiary(),
		paddingVertical: sizes.space[16],
		paddingHorizontal: sizes.space[12],
		alignItems: "center",
		gap: sizes.space[16],
	},
	bannerContent: {
		alignItems: "center",
		gap: sizes.space[8],
	},
	heading: {
		fontSize: typography.styles.titlePage.sizes.base(),
		fontWeight: typography.styles.titlePage.fontWeight(),
		color: colors.text.default.default(),
	},
	subheading: {
		fontSize: typography.styles.body.sizes.base(),
		color: colors.text.default.default(),
		textAlign: "center",
	},
	days: {
		fontWeight: typography.styles.body.fontWeights.bold(),
	},
	stats: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
	},
	iconText: {
		alignItems: "center",
		gap: sizes.space[4],
	},
	icon: {
		width: sizes.icon.small,
		height: sizes.icon.small,
	},
	statText: {
		color: colors.text.default.default(),
		...typography.styles.body.sizes.small(),
	},
	content: {
		padding: sizes.space[16],
		alignItems: "center",
		gap: sizes.space[12],
	},
	sectionTitle: {
		...typography.styles.heading.sizes.base(),
		color: colors.text.default.default(),
	},
	carousel: {
		flexDirection: "row",
		alignItems: "center",
		gap: sizes.space[12],
	},
	buttons: {
		flexDirection: "row",
		justifyContent: "space-around",
		paddingHorizontal: sizes.space[16],
		marginVertical: sizes.space[12],
	},
});
