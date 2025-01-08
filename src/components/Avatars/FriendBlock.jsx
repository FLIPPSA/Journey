import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { colors, typography, sizes } from "../../utils/design";
import Button from "../Buttons/Button";
import ActionButtons from "../Buttons/ActionButtons";
import { Feather } from "@expo/vector-icons";

export default function FriendBlock({
	showButton = "Single",
	showIcon = true,
	showNotificationBubble = false,
	name = "Anonymous",
	buttonText,
	buttonLoading,
	onMessagePress,
	onMorePress,
	avatarUri,
	notificationUri,
	messageIcon,
	moreIcon,
	onApprovePress,
	onDenyPress,
	approveLoading,
	denyLoading,
}) {
	return (
		<View style={styles.container}>
			{showNotificationBubble && (
				<Image
					source={{ uri: notificationUri }}
					style={styles.notificationBubble}
				/>
			)}
			<View style={styles.avatarBlock}>
				{avatarUri ? (
					<Image
						source={{ uri: avatarUri }}
						style={[
							styles.avatar,
							{
								width: sizes.icon.large,
								height: sizes.icon.large,
							},
						]}
					/>
				) : (
					<View
						style={[
							styles.avatar,
							{
								width: sizes.icon.large,
								height: sizes.icon.large,
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

				<Text style={styles.name}>{name}</Text>
			</View>
			{showButton === "Single" ? (
				<Button
					variant="primary"
					state="default"
					size="small"
					label={buttonText}
					onPress={onMessagePress}
					rightIcon={messageIcon ? "message-circle" : null}
					isLoading={buttonLoading}
				/>
			) : (
				showButton === "Double" && (
					<ActionButtons
						onApprovePress={onApprovePress}
						onDenyPress={onDenyPress}
						approveLoading={approveLoading}
						denyLoading={denyLoading}
					/>
				)
			)}
			{moreIcon && (
				// <TouchableOpacity onPress={onMorePress}>
				<Feather
					name="more-vertical"
					size={sizes.icon.small}
					color={colors.icon.default.default()}
					onPress={onMorePress}
				/>
				// </TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		padding: sizes.space[8],
		gap: sizes.space[8],
		width: "100%",
	},
	notificationBubble: {
		width: sizes.icon.xxxSmall,
		height: sizes.icon.xxxSmall,
		borderRadius: sizes.radius.circle,
		backgroundColor: colors.background.brand.default(),
		display: "flex",
	},
	avatarBlock: {
		flexDirection: "row",
		alignItems: "center",
		gap: sizes.space[8],
		flex: 1,
	},
	avatar: {
		borderRadius: sizes.radius.circle,
		// backgroundColor: colors.primitives.gray[200],
	},
	name: {
		fontFamily: typography.styles.heading.fontFamily(),
		fontSize: typography.styles.heading.sizes.base(),
		fontWeight: typography.styles.heading.fontWeight(),
		color: colors.text.default.default(),
	},
	button: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.background.brand.default(),
		borderRadius: sizes.radius[8],
		paddingVertical: sizes.space[8],
		paddingHorizontal: sizes.space[12],
		gap: sizes.space[8],
	},
	buttonText: {
		fontFamily: typography.styles.body.fontFamily(),
		fontSize: typography.styles.body.sizes.base(),
		fontWeight: typography.styles.body.fontWeights.bold(),
		color: colors.text.default.inverse(),
	},
});
