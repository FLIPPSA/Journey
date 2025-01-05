import {
	Animated,
	FlatList,
	Image,
	Modal,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
	PanResponder,
	BackHandler,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { colors, typography, sizes } from "../../utils/design";
import Button from "../Buttons/Button";
import {
	wp,
	hp,
	removeLike,
	addLike,
	fetchUserLikedPostCheck,
	animateHeart,
	openCommentSection,
	closeCommentSection,
} from "../../utils/common";
import { useEffect, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Commenting from "../../pages/Homepage/Commenting";
import Link from "../Navigation/Link";
import { TouchableOpacity } from "react-native";

export default function PostCard({
	user,
	id,
	name = "Undefined",
	time = "Some when",
	caption = "Default caption",
	images = [], // Default to an empty array
	avatar = "https://wallpapercave.com/wp/wp8781456.jpg",
	likes = 0,
	commentCount = 0,
	buttonLabel,
	comments,
	onButtonPress,
	onCommentPress,
}) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isLiked, setIsLiked] = useState(false);
	const [captionIsExpanded, setCaptionIsExpanded] = useState(false);

	const [currentLikeCount, setCurrentLikeCount] = useState(likes);
	const [showHeart, setShowHeart] = useState(false);
	const [commentSectionVisible, setCommentSectionVisible] = useState(false);
    const scaleAnim = useRef(new Animated.Value(hp(100))).current;
	const slideAnim = useRef(new Animated.Value(hp(100))).current; // Modal position
	const overlayOpacity = useRef(new Animated.Value(0)).current; // Overlay opacity
	const heartScaleAnim = useRef(new Animated.Value(0)).current;
	const heartOpacityAnim = useRef(new Animated.Value(1)).current;
	const lastTap = useRef(null);

	const handleCaptionToggle = () => {
		setCaptionIsExpanded((prev) => !prev);
	};

	const openCommentSection = () => {
		setCommentSectionVisible(true);
		Animated.parallel([
			Animated.timing(slideAnim, {
				toValue: hp(0),
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.timing(overlayOpacity, {
				toValue: 1, // Fade in overlay
				duration: 300,
				useNativeDriver: true,
			}),
		]).start();
	};

	const closeCommentSection = () => {
		Animated.parallel([
			Animated.timing(slideAnim, {
				toValue: hp(100),
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.timing(overlayOpacity, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}),
		]).start(() => setCommentSectionVisible(false)); // Set visibility to false after animation
	};

	useEffect(() => {
		const fetchIsLiked = async () => {
			const liked = await fetchUserLikedPostCheck(user.id, id);
			setIsLiked(liked);
		};

		fetchIsLiked();
	}, []);

	const renderPaginationDots = () =>
		images.length > 1 ? (
			<View style={styles.pagination}>
				{images.map((_, index) => (
					<View
						key={index}
						style={[
							styles.dot,
							index === currentImageIndex
								? styles.dotActive
								: styles.dotInactive,
						]}
					/>
				))}
			</View>
		) : null;

	const handleDoubleTap = () => {
		const now = Date.now();
		if (lastTap.current && now - lastTap.current < 300) {
			if (!isLiked) {
				handleLikePress();
				animateHeart(heartScaleAnim, heartOpacityAnim, setShowHeart);
			}
		}
		lastTap.current = now;
	};

	const handleLikePress = () => {
		if (!showHeart) {
			if (isLiked) {
				setCurrentLikeCount(currentLikeCount - 1);
				setIsLiked(false);
				removeLike(user.id, id);
			} else {
				setCurrentLikeCount(currentLikeCount + 1);
				setIsLiked(true);
				addLike(user.id, id);

				Animated.sequence([
					Animated.timing(scaleAnim, {
						toValue: 1.2,
						duration: 150,
						useNativeDriver: true,
					}),
					Animated.timing(scaleAnim, {
						toValue: 0.8,
						duration: 150,
						useNativeDriver: true,
					}),
					Animated.timing(scaleAnim, {
						toValue: 1.1,
						duration: 150,
						useNativeDriver: true,
					}),
					Animated.timing(scaleAnim, {
						toValue: 1,
						duration: 150,
						useNativeDriver: true,
					}),
				]).start();
			}
		}
	};

	return (
		<View style={styles.postCard}>
			{/* Header Section */}
			<View style={[styles.content, styles.contentLayout]}>
				<View style={styles.avatarBlock}>
					{avatar ? (
						<Image
							style={styles.avatarIcon}
							resizeMode="cover"
							source={{ uri: avatar }}
						/>
					) : (
						<Feather
							name="user"
							size={sizes.icon.small}
							color={colors.icon.default.default()}
						/>
					)}

					<View style={styles.info}>
						<Text style={styles.name}>{name}</Text>
						<Text style={styles.description}>{time}</Text>
					</View>
				</View>
				<Feather
					name="more-horizontal"
					size={sizes.icon.small}
					color={colors.icon.default.default()}
				/>
			</View>

			{/* Image Carousel */}
			<View style={styles.carouselContainer}>
				<FlatList
					data={images}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					onScroll={(e) => {
						const newIndex = Math.round(
							e.nativeEvent.contentOffset.x / wp(100)
						);
						setCurrentImageIndex(newIndex);
					}}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => (
						<TouchableWithoutFeedback onPress={handleDoubleTap}>
							<View style={styles.imageContainer}>
								<Image
									source={{ uri: item }}
									style={styles.carouselImage}
								/>
								{showHeart && (
									<Animated.Image
										source={require("../../../assets/images/heart.png")}
										style={[
											styles.heartIcon,
											{
												transform: [
													{ scale: heartScaleAnim },
												],
											},
										]}
									/>
								)}
							</View>
						</TouchableWithoutFeedback>
					)}
				/>
			</View>

			{/* Footer Section */}
			<View style={styles.contentLayout}>
				<View style={styles.top}>
					<View style={styles.social}>
						{isLiked ? (
							<View style={styles.socialCountContainer}>
								<AntDesign
									name="heart"
									size={24}
									color={colors.icon.warning.secondary()}
									onPress={handleLikePress}
								/>
								<Text>{currentLikeCount}</Text>
							</View>
						) : (
							<View style={styles.socialCountContainer}>
								<AntDesign
									name="hearto"
									size={24}
									color="black"
									onPress={handleLikePress}
								/>
								<Text>{currentLikeCount}</Text>
							</View>
						)}
						<View style={styles.socialCountContainer}>
							<Feather
								name="message-circle"
								size={24}
								color={colors.icon.default.default()}
								onPress={openCommentSection} // Open comment section on message button click
							/>
							<Text>{commentCount}</Text>
						</View>
						<Modal
							transparent
							visible={commentSectionVisible}
							animationType="none"
						>
							{/* Overlay */}
							<Animated.View
								style={[
									styles.overlay,
									{ opacity: overlayOpacity },
								]}
							/>

							{/* Animated Commenting Section */}
							<Animated.View
								style={[
									styles.modalContent,
									{ transform: [{ translateY: slideAnim }] },
								]}
							>
								<Commenting
									user={user}
									postId={id}
									closeSection={closeCommentSection}
								/>
							</Animated.View>
						</Modal>

						<Feather
							name="share-2"
							size={24}
							color={colors.icon.default.default()}
						/>
					</View>

					{renderPaginationDots()}

					<Button
						variant="primary"
						state="default"
						size="small"
						label="Try it!"
					/>
				</View>

				<View style={styles.mid}>
					<Text style={styles.likes}>Liked by {likes}</Text>
				</View>

				<View style={styles.mid}>
					<Text
						style={styles.captionText}
						numberOfLines={captionIsExpanded ? undefined : 2} // Show full text when expanded
						ellipsizeMode="tail" // Adds "..." at the end
					>
						{caption}
					</Text>
					{!captionIsExpanded &&
						caption.split(" ").length > 10 && ( // Check if caption is long
							<TouchableOpacity onPress={handleCaptionToggle}>
								<Text style={[styles.more, styles.nameTypo]}>
									more
								</Text>
							</TouchableOpacity>
						)}
					{captionIsExpanded && (
						<TouchableOpacity onPress={handleCaptionToggle}>
							<Text style={[styles.more, styles.nameTypo]}>
								less
							</Text>
						</TouchableOpacity>
					)}
				</View>

				<Link
					variant="Neutral"
					state="Default"
					size="Medium"
					label="View all comments"
					hasIconEnd={true}
					iconEnd="chevron-right"
					onPress={openCommentSection}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	postCard: {
		height: wp(75),
		maxWidth: sizes.space[744],
		width: wp(100),
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
		width: wp(100),
		alignItems: "flex-start",
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
		fontSize: typography.styles.heading.sizes.base(),
		fontWeight: typography.styles.heading.fontWeight(),
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
	carouselContainer: {
		width: wp(100),
		height: wp(75),
		position: "relative",
	},
	carouselImage: {
		width: wp(100),
		height: wp(75),
		// resizeMode: "cover",
	},
	top: {
		alignItems: "center",
		flexDirection: "row",
		width: "100%",
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
		justifyContent: "center",
		alignItems: "center", // Center dots vertically
		position: "absolute", // Positioning relative to parent container
		bottom: sizes.space[16], // Move dots to the bottom of the carousel
		width: wp(100), // Ensure it spans the carousel width
	},
	dot: {
		width: sizes.space[8],
		height: sizes.space[8],
		borderRadius: sizes.radius.circle,
		marginHorizontal: sizes.space[4], // Add spacing between dots
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
	captionText: {
		fontSize: typography.styles.body.sizes.base(),
		color: colors.text.default.default(),
	},
	more: {
		color: colors.text.default.secondary(),
	},
	imageContainer: {
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 2,
	},
	heartIcon: {
		position: "absolute",
		width: 120,
		height: 110,
		opacity: 0.7,
	},
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		height: hp(100),
		// backgroundColor: "white",
	},
	socialCountContainer: {
		alignItems: "center",
	},
});
