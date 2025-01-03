import React, { useState, useRef, useEffect } from "react";
import {
	Animated,
	FlatList,
	StyleSheet,
	View,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import {
	PanGestureHandler,
	GestureHandlerRootView,
	State,
} from "react-native-gesture-handler";
import CommentCard from "../../components/Cards/CommentCard";
import InputField from "../../components/Inputs/InputField";
import Avatar from "../../components/Avatars/Avatar";
import { fetchComments, postComment, wp, hp } from "../../utils/common";
import { colors, sizes } from "../../utils/design";
import Drag from '../../components/Utility/Drag';

export default function Commenting({ user, postId, closeSection }) {
	const [commentContent, setCommentContent] = useState("");
	const [comments, setComments] = useState([]);
	const [replyTo, setReplyTo] = useState(null);

	const translateY = useRef(new Animated.Value(0)).current;

	const MAX_TRANSLATE_Y = 0; // Fully open
	const MIN_TRANSLATE_Y = hp(100); // Fully closed

	const handleGestureEvent = ({ nativeEvent }) => {
		const { translationY } = nativeEvent;

		// Ensure the translateY does not exceed bounds
		if (translationY > 0) {
			translateY.setValue(translationY);
		}
	};

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
		async function fetchAllComments() {
			const fetchedComments = await fetchComments(user.id, postId);
			setComments(fetchedComments);
		}
		fetchAllComments();
	}, []);

	const handleSend = async () => {
		if (!commentContent.trim()) return;
		await postComment(commentContent, user.id, postId, replyTo);
		setCommentContent("");
		setReplyTo(null);
		const updatedComments = await fetchComments(user.id, postId);
		setComments(updatedComments);
	};

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

				{/* Comments */}
				<FlatList
					data={comments}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<CommentCard
							id={item.id}
							name={item.username}
							comment={item.content}
							profilePicture={item.profilePicture}
							replies={item.replies}
							time={item.time}
							liked={item.liked}
							likeCount={item.likes.length}
							postId={postId}
							userId={user.id}
						/>
					)}
					contentContainerStyle={styles.listContainer}
					keyboardShouldPersistTaps="handled"
				/>

				{/* InputField (Sticky at the bottom) */}
				<KeyboardAvoidingView
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
				</KeyboardAvoidingView>
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
});
