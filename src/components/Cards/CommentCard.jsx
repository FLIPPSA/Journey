import {
	Image,
	StyleSheet,
	Text,
	View,
	ImageBackground,
	Animated,
} from "react-native";
import { colors, typography, sizes } from "../../utils/design";
import Feather from "@expo/vector-icons/Feather";
import { addCommentLike, removeCommentLike } from "../../utils/common";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function CommentCard({
    id,
	name = "Name",
	comment = "Wow. What a nice picture, cool",
	replies = [],
	avatar = "https://wallpaperswide.com/download/beautiful_girl_face_aesthetic-wallpaper-1280x720.jpg",
	time = "A long time ago",
	likeCount = 0,
	showReplies = false,
    liked = false,
	postId,
	userId,
}) {
	const [isLiked, setIsLiked] = useState(liked);
	const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);

	const handleLikePress = () => {
		if (isLiked) {
			setCurrentLikeCount(currentLikeCount - 1);
			setIsLiked(false);
			removeCommentLike(userId, postId, id);
		} else {
			setCurrentLikeCount(currentLikeCount + 1);
			setIsLiked(true);
			addCommentLike(userId, postId, id);

			// Animated.sequence([
			//     Animated.timing(scaleAnim, {
			//         toValue: 1.2,
			//         duration: 150,
			//         useNativeDriver: true,
			//     }),
			//     Animated.timing(scaleAnim, {
			//         toValue: 0.8,
			//         duration: 150,
			//         useNativeDriver: true,
			//     }),
			//     Animated.timing(scaleAnim, {
			//         toValue: 1.1,
			//         duration: 150,
			//         useNativeDriver: true,
			//     }),
			//     Animated.timing(scaleAnim, {
			//         toValue: 1,
			//         duration: 150,
			//         useNativeDriver: true,
			//     }),
			// ]).start();
		}
        
	};

	return (
		<View style={styles.container}>
			<View style={styles.left}>
				<Image
					style={styles.imgIcon}
					resizeMode="cover"
					source={{
						uri: avatar,
					}}
				/>

				<View style={styles.commentSection}>
					<View style={styles.commentHeader}>
						<Text style={styles.name}>{name}</Text>
						<Text style={styles.time}>{time}</Text>
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
				{isLiked ? (
					<AntDesign
						name="heart"
						size={24}
						color={colors.icon.warning.secondary()}
						onPress={handleLikePress}
					/>
				) : (
					<AntDesign
						name="hearto"
						size={24}
						color="black"
						onPress={handleLikePress}
					/>
				)}
				<Text style={styles.likeCount}>{currentLikeCount}</Text>
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
