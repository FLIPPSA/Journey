import * as React from "react";
import { Image, StyleSheet, Text, View, ImageBackground } from "react-native";
import { colors, typography, sizes } from "../../utils/design";
import Feather from "@expo/vector-icons/Feather";

export default function CommentCard({
	name = "Name",
	comment = "Wow. What a nice picture, cool",
	replies = [],
	showReplies = false,
}) {
	return (
		<View style={styles.container}>
			<View style={styles.left}>
				<Image
					style={styles.imgIcon}
					resizeMode="cover"
					source={{
						uri: "https://wallpaperswide.com/download/beautiful_girl_face_aesthetic-wallpaper-1280x720.jpg",
					}}
				/>

				<View style={styles.commentSection}>
					<View style={styles.commentHeader}>
						<Text style={styles.name}>{name}</Text>
						<Text style={styles.time}>23 min ago</Text>
					</View>

					<Text style={styles.comment}>{comment}</Text>

					{showReplies &&
						replies.map((reply, index) => (
							<View key={index} style={styles.reply}>
								<Image
									style={styles.replyAvatar}
									resizeMode="cover"
									source={{ uri: "Avatar.png" }}
								/>
								<Text style={styles.replyText}>{reply}</Text>
							</View>
						))}

					<View style={styles.actions}>
						<View style={styles.action}>
							<Feather
								name="chevron-down"
								size={16}
								color={colors.icon.default.default()}
							/>
							<Text style={styles.actionText}>
								{showReplies ? "Hide Replies" : "Show Replies"}
							</Text>
						</View>

						<View style={styles.action}>
							<Feather
								name="message-circle"
								size={24}
								color={colors.icon.default.default()}
							/>
							<Text style={styles.actionText}>Reply</Text>
						</View>
					</View>
				</View>
			</View>

			<View style={styles.likes}>
				<Feather name="heart" size={24} color="black" />
				<Text style={styles.likeCount}>91</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: sizes.space[6],
		backgroundColor: colors.background.default.default(),
	},
	left: {
		flexDirection: "row",
		flex: 1,
	},
	imgIcon: {
		width: sizes.icon.medium,
		height: sizes.icon.medium,
		borderRadius: sizes.radius.circle,
	},
	commentSection: {
		flex: 1,
		marginLeft: sizes.space[8],
	},
	commentHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	name: {
		fontWeight: typography.styles.body.fontWeights.bold(),
		color: colors.text.default.default(),
		fontSize: typography.styles.body.sizes.xsmall(),
	},
	time: {
		color: colors.text.default.secondary(),
		fontSize: typography.styles.body.sizes.xsmall(),
		fontWeight: typography.styles.body.fontWeights.regular(),
	},
	comment: {
		color: colors.text.default.default(),
		fontSize: typography.styles.body.sizes.xsmall(),
	},
	reply: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: sizes.space[8],
	},
	replyAvatar: {
		width: sizes.icon.small,
		height: sizes.icon.small,
		borderRadius: sizes.radius.circle,
		marginRight: sizes.space[8],
	},
	replyText: {
		color: colors.text.default.default(),
		fontSize: typography.styles.body.sizes.xsmall(),
        fontWeight: typography.styles.body.fontWeights.bold(),
	},
	actions: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: sizes.space[8],
	},
	action: {
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		width: sizes.icon.xxSmall,
		height: sizes.icon.xxSmall,
		marginRight: sizes.space[4],
	},
	actionText: {
		color: colors.text.default.default(),
		fontWeight: typography.styles.body.fontWeights.bold(),
		fontSize: typography.styles.body.sizes.xsmall(),
	},
	likes: {
		alignItems: "center",
		justifyContent: "center",
		width: sizes.space[40],
	},
	likeIcon: {
		width: sizes.icon.small,
		height: sizes.icon.small,
	},
	likeCount: {
		color: colors.text.default.default(),
		fontWeight: typography.styles.body.fontWeights.bold(),
		fontSize: typography.styles.body.sizes.xsmall(),
	},
});
