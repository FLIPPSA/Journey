import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { colors, typography, sizes } from "../../utils/design";
import Button from "../Buttons/Button";
import { wp, hp } from "../../utils/common";

export default function PostCard({
	name = "Jenni So",
	time = "12:02 PM",
	caption = "Encountered two rare Pokémon's! I was so lucky to see them in the distance. What a mystery",
	image = "https://png.pngtree.com/thumb_back/fw800/background/20231224/pngtree-mountain-river-nature-wallpaper-image-image_15560315.jpg",
	avatar = "https://wallpapercave.com/wp/wp8781456.jpg",
	likes,
	buttonLabel,
	comments,
	onButtonPress,
	onCommentPress,
}) {
	return (
		<View style={styles.postCard}>
			{/* Header Section */}
			<View style={[styles.content, styles.contentLayout]}>
				<View style={[styles.avatarBlock, styles.socialFlexBox]}>
					{/* Avatar */}
					<Image
						style={styles.avatarIcon}
						resizeMode="cover"
						source={{ uri: avatar }}
					/>
					<View style={styles.info}>
						<Text style={[styles.name, styles.nameFlexBox]}>
							{name}
						</Text>
						<Text style={styles.description}>{time}</Text>
					</View>
				</View>
				<Feather name="more-horizontal" size={24} color="black" />
			</View>

			<Image
				style={styles.unsplashImage}
				resizeMode="cover"
				source={{ uri: image }}
			/>

			{/* Footer Section */}
			<View style={styles.contentLayout}>
				<View style={[styles.top, styles.topFlexBox]}>
					{/* Social Icons */}
					<View style={[styles.social, styles.socialFlexBox]}>
						<Feather name="heart" size={24} color="black" />
						<Feather
							name="message-circle"
							size={24}
							color="black"
						/>
						<Feather name="share-2" size={24} color="black" />
					</View>

					{/* Pagination Dots */}
					<View style={styles.pagination}>
						<View style={[styles.dot, styles.dotActive]} />
						<View style={[styles.dot, styles.dotInactive]} />
						<View style={[styles.dot, styles.dotInactive]} />
					</View>

					{/* Try It Button */}
					<Button
						variant="primary"
						state="default"
						size="small"
						label="Try it!"
					/>
				</View>

				{/* Likes */}
				<View style={styles.mid}>
					<Text style={styles.likes}>Liked by {likes}</Text>
				</View>

				{/* Caption */}
				<View style={styles.mid}>
					<Text style={styles.captionContainer}>
						<Text style={styles.captionText}>{caption}</Text>
						<Text
							style={[styles.more, styles.nameTypo]}
							onPress={onCommentPress}
						>
							more
						</Text>
					</Text>
				</View>

				{/* View Comments */}
				<View style={styles.link}>
					<Text style={styles.comments} onPress={onCommentPress}>
						View all comments
					</Text>
					<Feather
						name="chevron-right"
						size={16}
						color={colors.text.brand.default()}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	postCard: {
		height: sizes.space[463],
		maxWidth: sizes.space[744],
		width: "100%",
		flex: 1,
	},
	content: {
		paddingVertical: sizes.space[2],
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
	},
	contentLayout: {
		paddingHorizontal: sizes.space[8],
		paddingVertical: sizes.space[4],
		gap: sizes.space[12],
		maxWidth: sizes.space[744],
		width: "100%",
	},
	avatarBlock: {
		gap: sizes.space[8],
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	avatarIcon: {
		borderRadius: sizes.radius.circle,
		width: sizes.icon.small,
		height: sizes.icon.small,
	},
	info: {
		gap: sizes.space[4],
		flex: 1,
	},
	name: {
		fontSize: typography.primitives.scale[16],
		fontWeight: typography.primitives.weight.bold,
		color: colors.text.default.default(),
	},
	description: {
		fontSize: typography.primitives.scale[14],
		color: colors.text.default.secondary(),
	},
	unsplashImage: {
		width: wp(100),
		height: wp(90),
	},
	top: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	social: {
		gap: sizes.space[12],
		flexDirection: "row",
	},
	button: {
		borderRadius: sizes.radius[8],
		backgroundColor: colors.background.brand.default(),
		borderWidth: sizes.stroke[1],
		borderColor: colors.border.brand.default(),
		padding: sizes.space[8],
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		color: colors.text.default.inverse(),
		fontWeight: typography.primitives.weight.bold,
	},
	pagination: {
		flexDirection: "row",
		gap: sizes.space[8],
	},
	dot: {
		width: sizes.space[8],
		height: sizes.space[8],
		borderRadius: sizes.radius.circle,
	},
	dotActive: {
		backgroundColor: colors.background.brand.active(),
	},
	dotInactive: {
		backgroundColor: colors.background.brand.tertiaryActive(),
		opacity: 0.3,
	},
	mid: {
		alignSelf: "stretch",
		justifyContent: "center",
	},
	likes: {
		fontSize: typography.styles.body.sizes.xsmall(),
		color: colors.text.default.default(),
	},
	captionContainer: {
		flex: 1,
	},
	captionText: {
		fontSize: typography.styles.body.sizes.base(),
		color: colors.text.default.default(),
	},
	more: {
		color: colors.text.default.secondary(),
	},
	link: {
		gap: sizes.space[4],
		flexDirection: "row",
		alignItems: "center",
	},
	comments: {
		color: colors.text.brand.default(),
		fontWeight: typography.primitives.weight.bold,
	},
});
