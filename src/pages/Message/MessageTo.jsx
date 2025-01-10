import React, { useEffect, useState, useContext, useRef } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	View,
	Image,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import { supabase } from "../../utils/supabaseConfig";
import UpperNavigationBack from "../../components/Navigation/UpperNavigationBack";
import FriendBlock from "../../components/Avatars/FriendBlock";
import InputField from "../../components/Inputs/InputField";
import { colors, sizes, typography } from "../../utils/design";
import { Feather } from "@expo/vector-icons";
import { fetchChat, hp, sendMessage, wp } from "../../utils/common";
import Avatar from "../../components/Avatars/Avatar";
import AvatarBlock from "../../components/Avatars/AvatarBlock";
import LottieView from "lottie-react-native";

export default function Message({ route }) {
	const { user, chatPartner } = route.params;
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const commentContentref = useRef(null);
	const typingChannel = useRef(null);

	const flatListRef = useRef(null);

	async function fetchChatFunction() {
		const fetchedMessages = await fetchChat(user.id, chatPartner.id);
		setMessages(fetchedMessages);
	}

	useEffect(() => {
		fetchChatFunction();

		// Subscribe to message updates
		const messageSubscription = supabase
			.channel("public:messages")
			.on(
				"postgres_changes",
				{ event: "INSERT", schema: "public", table: "messages" },
				(payload) => {
					const message = payload.new;
					const date = new Date(message.createdAt);
					const month = date
						.toLocaleString("default", { month: "short" })
						.toUpperCase();
					const day = date.getDate();
					const hours = date.getHours() % 12 || 12;
					const minutes = String(date.getMinutes()).padStart(2, "0");
					const amPm = date.getHours() >= 12 ? "PM" : "AM";

					const formattedDate = `${month} ${day} - ${hours}:${minutes}${amPm}`;

					const formattedMessage = {
						...message,
						formattedCreatedAt: formattedDate,
					};

					setMessages((prevMessages) => [
						formattedMessage,
						...prevMessages,
					]);
				}
			)
			.subscribe();

		const typingChannel = supabase.channel("public:typing");

		typingChannel.on("broadcast", { event: "typing" }, (payload) => {
			if (payload.payload.senderId === chatPartner.id) {
				setIsTyping(payload.payload.isTyping); // Update based on chat partner's typing status
			}
		});

		typingChannel.subscribe();

		return () => {
			supabase.removeChannel(typingChannel); // Cleanup subscription
		};
	}, [chatPartner.id]);

	const handleSendMessage = async () => {
		setIsLoading(true);
        handleTyping("");
		await sendMessage(user.id, chatPartner.id, newMessage);
		setNewMessage("");
		setIsTyping(false);
		setIsLoading(false);
	};

	const renderMessage = (item) => {
		const isCurrentUser = item.senderId === user.id;

		return (
			<View
				style={{
					flexDirection: isCurrentUser ? "row-reverse" : "row",
					gap: 8,
				}}
			>
				{!isCurrentUser && (
					<Avatar
						imageUri={chatPartner.profilePicture}
						size="small"
						initials={chatPartner.username[0]}
						color="gray"
					/>
				)}

				<View
					style={[
						styles.messageContainer,
						isCurrentUser
							? styles.myMessageContainer
							: styles.partnerMessageContainer,
					]}
				>
					<Text style={styles.timeText}>
						{item.formattedCreatedAt}
					</Text>
					<Text style={styles.messageText}>{item.content}</Text>
				</View>
			</View>
		);
	};

	const handleTyping = (text) => {
		setNewMessage(text);

		// Send typing state to Supabase channel
		supabase.channel("public:typing").send({
			type: "broadcast",
			event: "typing",
			payload: {
				senderId: user.id,
				isTyping: text.trim() !== "", // Broadcast true if there's text, false otherwise
			},
		});
	};

	return (
		// <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
		<View style={styles.container}>
			<UpperNavigationBack
				heading={chatPartner.username || "Chat"}
				showBack={true}
			/>
			<FlatList
				ref={flatListRef}
				data={messages}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => renderMessage(item)}
				contentContainerStyle={styles.messagesContainer}
				ListHeaderComponent={
					isTyping ? (
						<View style={styles.typingContainer}>
							<LottieView
								source={require("../../../assets/animations/typing.json")} // Path to your typing.json
								autoPlay
								loop
								style={styles.typingAnimation}
							/>
						</View>
					) : null // Render nothing if not typing
				}
				ListFooterComponent={
					<View style={styles.footerContainer}>
						<Avatar
							size="large"
							color="gray"
							shape="circle"
							imageUri={chatPartner.profilePicture}
							initials={chatPartner.username[0]}
						/>
					</View>
				}
				inverted // Invert the FlatList so it starts at the bottom
				keyboardShouldPersistTaps="handled" // Allow taps to close the keyboard
			/>

			{/* Typing Indicator */}

			{/* Input Field */}
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				// keyboardVerticalOffset={80} // Adjust based on header height
			>
				<View style={styles.inputContainer}>
					<InputField
						ref={commentContentref}
						hasLabel={false}
						placeholder={"Write a message..."}
						value={newMessage}
						onChangeText={handleTyping} // Call handleTyping on text change
						rightIcon={"send"}
						rightOnPress={handleSendMessage}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
		// </TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	messagesContainer: {
		gap: sizes.space[12],
		padding: sizes.space[8],
		paddingTop: sizes.space[96],
	},
	footerContainer: {
		alignItems: "center", // Horizontally center
		justifyContent: "center", // Vertically center
		paddingVertical: sizes.space[16], // Add spacing around the Avatar
	},
	messageContainer: {
		maxWidth: "80%", // Limit the width of the message bubble
		padding: sizes.space[12],
		borderRadius: sizes.radius[8],
	},
	typingContainer: {
		height: 50,
		padding: sizes.space[12],
		borderRadius: sizes.radius[8],
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "flex-start",
		backgroundColor: colors.background.default.tertiary(),
	},
	myMessageContainer: {
		alignSelf: "flex-end",
		backgroundColor: colors.background.brand.default(),
	},
	partnerMessageContainer: {
		alignSelf: "flex-start",
		backgroundColor: colors.background.default.tertiary(),
	},
	messageText: {
		fontSize: typography.styles.body.sizes.base(),
		fontFamily: typography.styles.body.fontFamily(),
		fontWeight: typography.styles.body.fontWeights.bold(),
		color: colors.text.default.inverse(),
	},
	timeText: {
		fontSize: typography.styles.body.sizes.small(),
		fontFamily: typography.styles.body.fontFamily(),
		color: colors.text.default.inverse(),
	},
	avatarBlock: {
		alignItems: "center", // Center children vertically
		justifyContent: "center", // Center children horizontally
		width: "100%", // Optional: Ensures the block spans full width
		gap: sizes.space[8], // Adds space between the avatar and text
	},
	inputContainer: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		backgroundColor: "#fff",
		borderTopWidth: 1,
		borderTopColor: "#ccc",
		paddingVertical: sizes.space[8],
		paddingHorizontal: sizes.space[16],
	},
	name: {
		fontFamily: typography.styles.heading.fontFamily(),
		fontSize: typography.styles.heading.sizes.base(),
		fontWeight: typography.styles.heading.fontWeight(),
		textAlign: "center",
		color: colors.text.default.default(),
	},
	// flatlistWrapper: {
	// 	flex: 1,
	// 	// marginBottom: sizes.space[96], // Space for InputField height
	// },
	profilePicture: {
		width: sizes.space[32],
		height: sizes.space[32],
		borderRadius: sizes.radius.circle,
	},
	typingAnimation: {
		width: sizes.icon.xxLarge,
		height: sizes.icon.xxLarge,
	},
});
