import {
	Image,
	StyleSheet,
	Text,
	View,
	ImageBackground,
	Animated,
	TouchableOpacity,
	FlatList,
} from "react-native";
import { colors, typography, sizes } from "../../utils/design";
import Feather from "@expo/vector-icons/Feather";
import { addCommentLike, removeCommentLike } from "../../utils/common";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Link from "../Navigation/Link";

export default function CommentCard({
	id,
	name = "Name",
	comment = "Wow. What a nice picture, cool",
	replies = [],
	avatar = "https://wallpaperswide.com/download/beautiful_girl_face_aesthetic-wallpaper-1280x720.jpg",
	time = "A long time ago",
	likeCount = 0,
	liked = false,
	postId,
	userId,
	onReply,
}) {
	const [isLiked, setIsLiked] = useState(liked);
	const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
	const [showReplies, setShowReplies] = useState(false);

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
					<View style={styles.mainContentContainer}>
						<View style={styles.commentHeader}>
							<Text style={styles.name}>{name}</Text>
							<Text style={styles.time}>{time}</Text>
						</View>

						<Text style={styles.comment}>{comment}</Text>
					</View>
					{showReplies && (
						<FlatList
							data={replies}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({ item }) => (
								<View style={styles.replyContainer}>
									<Image
										style={styles.replyAvatar}
										source={{
											uri:
												item.avatar ||
												"https://wallpaperswide.com/download/beautiful_girl_face_aesthetic-wallpaper-1280x720.jpg",
										}}
									/>
									<Text style={styles.replyText}>
										{item.content}
									</Text>
								</View>
							)}
							contentContainerStyle={styles.repliesList} // Ensure this is correctly placed
						/>
					)}

					<View style={styles.actions}>
						{replies.length > 0 && (
							<Link
								variant="Neutral"
								state="Default"
								size="Small"
								label={
									showReplies
										? "Hide Replies"
										: "Show Replies"
								}
								hasIconStart={true}
								iconStart={
									showReplies
										? "chevron-up"
										: "chevron-down"
								}
								onPress={() => setShowReplies(!showReplies)}
							/>
						)}

						<Link
							variant="Neutral"
							state="Default"
							size="Small"
							label={"Reply"}
							hasIconStart={true}
							iconStart="message-circle"
							onPress={() => onReply(id)}
						/>
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
		backgroundColor: colors.background.default.default(),
	},
	left: {
		flexDirection: "row",
		gap: sizes.space[8],
		flex: 1,
	},
	imgIcon: {
		width: sizes.icon.xLarge,
		height: sizes.icon.xLarge,
		borderRadius: sizes.radius.circle,
	},
	commentSection: {
		flex: 1,
		paddingVertical: sizes.space[4],
		gap: sizes.space[8],
	},
	commentHeader: {
		flexDirection: "row",
		gap: sizes.space[8],
	},
	mainContentContainer: {
		gap: sizes.space[4],
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
	repliesList: {
		gap: sizes.space[16],
		backgroundColor: "#f9f9f9", // Example background color
	},
	replyContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: sizes.space[4],
	},
	replyAvatar: {
		width: 24,
		height: 24,
		borderRadius: sizes.radius.circle,
	},
	replyName: {
		fontWeight: "bold",
		color: colors.text.default.default(),
	},
	replyText: {
		color: colors.text.default.default(),
		fontSize: typography.styles.body.sizes.xsmall(),
		fontWeight: typography.styles.body.fontWeights.bold(),
	},
	actions: {
		flexDirection: "row",
		gap: sizes.space[16],
	},
	action: {
		flexDirection: "row",
		alignItems: "center",
	},
	likes: {
		alignItems: "center",
		justifyContent: "flex-start",
		gap: sizes.space[2],
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
