import {
	Animated,
	FlatList,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { fetchComments, fetchFriends, hp, wp } from "../../utils/common";
import { sizes } from "../../utils/design";
import {
	GestureHandlerRootView,
	PanGestureHandler,
	State,
} from "react-native-gesture-handler";
import Drag from "../../components/Utility/Drag";
import AvatarBlock from "../../components/Avatars/AvatarBlock";
import Search from "../../components/Inputs/Search";
import ShareContainer from "../../components/Utility/ShareContainer";

export default function Sharing({ user, closeSection }) {
	const [commentContent, setCommentContent] = useState("");
	const [comments, setComments] = useState([]);
	const [replyTo, setReplyTo] = useState(null);
	const [friends, setFriends] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedFriends, setSelectedFriends] = useState([]);

	const translateY = useRef(new Animated.Value(0)).current;

	const MAX_TRANSLATE_Y = 50; // Half open
	const MIN_TRANSLATE_Y = hp(100); // Fully closed

	const handleGestureStateChange = ({ nativeEvent }) => {
		const { translationY, velocityY, state } = nativeEvent;

		if (state === State.END) {
			if (translationY > hp(20) || velocityY > 1000) {
				Animated.timing(translateY, {
					toValue: MIN_TRANSLATE_Y,
					duration: 300,
					useNativeDriver: true,
				}).start(() => closeSection());
			} else {
				Animated.timing(translateY, {
					toValue: MAX_TRANSLATE_Y,
					duration: 300,
					useNativeDriver: true,
				}).start();
			}
		}
	};

	useEffect(() => {
		const fetchAllFriends = async () => {
			try {
				const fetchedFriends = await fetchFriends(user.id);
				setFriends(fetchedFriends);
			} catch (error) {
				console.error("Error fetching friends:", error);
			}
		};
		console.log("friends chatting:", friends);
		fetchAllFriends();
	}, []);

	const handleSend = async () => {
		if (!commentContent.trim()) return;
		await postComment(commentContent, user.id, postId, replyTo);
		setCommentContent("");
		setReplyTo(null);
		const updatedComments = await fetchComments(user.id, postId);
		setComments(updatedComments);
	};

	// Filter friends based on search term
	const filteredFriends = friends.filter((friend) =>
		friend.username.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Animated.View
				style={[styles.container, { transform: [{ translateY }] }]}
			>
				{/* Drag Handle */}
				<PanGestureHandler
					onGestureEvent={Animated.event(
						[{ nativeEvent: { translationY: translateY } }],
						{
							useNativeDriver: true,
						}
					)}
					onHandlerStateChange={handleGestureStateChange}
				>
					<Animated.View style={styles.dragContainer}>
						<Drag />
					</Animated.View>
				</PanGestureHandler>

				<Search
					placeholder="Search"
					value={searchTerm}
					onSearch={setSearchTerm}
				/>
				{/* Friends */}
				<FlatList
					data={filteredFriends} // Pass filtered friends here
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => {
						const isSelected = selectedFriends.some(
							(selectedFriend) => selectedFriend.id === item.id
						);

						return (
							<AvatarBlock
								initials={item.username[0]}
								name={item.username}
								imageUri={item.profilePicture}
								showCheckIcon={isSelected} // Show check icon if selected
								onPress={() => {
									if (isSelected) {
										// Remove friend from selectedFriends
										setSelectedFriends((prevSelected) =>
											prevSelected.filter(
												(friend) =>
													friend.id !== item.id
											)
										);
									} else {
										// Add friend to selectedFriends
										setSelectedFriends((prevSelected) => [
											...prevSelected,
											item,
										]);
									}
								}}
							/>
						);
					}}
					numColumns={4} // Set the number of columns for the grid
					columnWrapperStyle={styles.row} // Style for rows
					keyboardShouldPersistTaps="handled"
				/>

				{/* InputField (Sticky at the bottom) */}
				{/* <KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
				>
					<View style={styles.inputContainer}>
						<View style={styles.inner}>
							<Avatar imageUri={user.profilePicture} size="large"/>
							<InputField
								value={commentContent}
								onChangeText={setCommentContent}
								hasLabel={false}
								placeholder={
									replyTo ? "Reply..." : "Comment..."
								}
								rightIcon={"send"}
								rightOnPress={handleSend}
							/>
						</View>
					</View>
				</KeyboardAvoidingView> */}
                <ShareContainer />
			</Animated.View>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 0,
		width: wp(100),
		height: hp(100),
		backgroundColor: "white",
		overflow: "hidden",
	},
	dragContainer: {
		alignItems: "center",
		justifyContent: "center",
		height: hp(5),
	},
	listContainer: {
		paddingHorizontal: sizes.space[16],
		paddingBottom: sizes.space[60],
		gap: sizes.space[24],
	},
	inputContainer: {
		width: "100%",
		backgroundColor: "#fff",
		borderTopWidth: 1,
		borderTopColor: "#ccc",
		paddingVertical: sizes.space[8],
	},
	inner: {
		flexDirection: "row",
		paddingHorizontal: sizes.space[16],
		gap: sizes.space[16],
		alignItems: "center",
	},
	row: {
		// justifyContent: 'space-between', // Evenly space items in a row
		marginBottom: 16, // Space between rows
	},
});
