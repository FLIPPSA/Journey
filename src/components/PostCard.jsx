import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons";
import { colors, sizes, typography } from "../utils/design";
import { wp } from "../utils/common";

export default function PostCard({
	userName,
	time,
	imageUri,
	likes,
	description,
}) {
	return (
		<View style={styles.card}>

			{/* Header */}
			<View style={styles.header}>

                <View style={styles.userInfoBlock}>
                    <Image
                        source={{ uri: "https://i.pinimg.com/736x/0f/07/71/0f0771cdb751568e01ee6d6a044a4bdb.jpg" }}
                        style={styles.profileImage}
                    />
                    <View style={styles.headerText}>
                        <Text style={styles.userName}>{userName}</Text>
                        <Text style={styles.time}>{time}</Text>
                    </View>
                </View>

				<TouchableOpacity style={styles.moreButton}>
					<MaterialIcons
						name="more-vert"
						size={typography.primitives.scale[24]}
						color={colors.icons.default.default()}
					/>
				</TouchableOpacity>
			</View>

			{/* Post Image */}
			<Image source={{ uri: imageUri }} style={styles.postImage} />

			{/* Action Buttons */}
			<View style={styles.actionButtons}>
                <View style={styles.socials}>
                    <TouchableOpacity>
                        <FontAwesome
                            name="heart-o"
                            size={typography.primitives.scale[24]}
                            color={colors.icons.default.default()}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather
                            name="message-circle"
                            size={typography.primitives.scale[24]}
                            color={colors.icons.default.default()}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather
                            name="share"
                            size={typography.primitives.scale[24]}
                            color={colors.icons.default.default()}
                        />
                    </TouchableOpacity>
                </View>
                
				<View style={styles.indicator}>
					<View style={[styles.dot, styles.activeDot]} />
					<View style={styles.dot} />
					<View style={styles.dot} />
				</View>

				<TouchableOpacity style={styles.tryItButton}>
					<Text style={styles.tryItText}>Try it!</Text>
				</TouchableOpacity>
			</View>

			{/* Likes and Description */}
			<Text style={styles.likes}>
				Liked by <Text style={styles.boldText}>Tom Nooks</Text> and <Text style={styles.boldText}>{likes} others</Text>
			</Text>
			<Text style={styles.description} numberOfLines={2}>
				{description} <Text style={styles.moreText}>more</Text>
			</Text>

			{/* View Comments */}
			<TouchableOpacity>
				<Text style={styles.commentsLink}>View all comments</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		width: "100%",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: sizes.space[8],
		paddingVertical: sizes.space[2],
	},
    userInfoBlock: {
        flexDirection: 'row',
        width: '100%',
        gap: sizes.space[4],
    },
	profileImage: {
		width: colors.primitives.scale[40],
		height: colors.primitives.scale[40],
		borderRadius: colors.primitives.radius.circle,
	},
	headerText: {
		flex: 1,
		marginLeft: colors.primitives.scale[12],
	},
	userName: {
		fontFamily: typography.primitives.family,
		fontSize: typography.primitives.scale[16],
		fontWeight: typography.primitives.weight.bold,
		color: colors.text.default.default()
	},
	time: {
		fontFamily: typography.primitives.family,
		fontSize: typography.styles.subheading.sizes.base(),
		color: colors.text.default.secondary(),
	},
	moreButton: {
		padding: colors.primitives.scale[8],
	},
	postImage: {
		width: wp(100),
		height: wp(75),
	},
	actionButtons: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: colors.primitives.scale[16],
	},
    socials: {
        flexDirection: 'row',
        gap: sizes.space[12],
        alignItems: 'center',
    },
	indicator: {
		flexDirection: "row",
		alignItems: "center",
        gap: sizes.space[12],
	},
	dot: {
		width: colors.primitives.scale[8],
		height: colors.primitives.scale[8],
		borderRadius: colors.primitives.radius.circle,
		backgroundColor: colors.icons.brand.tertiary(),
	},
	activeDot: {
		backgroundColor: colors.primitives.brand[700],
	},
	tryItButton: {
		backgroundColor: colors.primitives.brand[700],
		paddingHorizontal: colors.primitives.scale[12],
		paddingVertical: colors.primitives.scale[6],
		borderRadius: colors.primitives.radius[16],
	},
	tryItText: {
		fontFamily: typography.primitives.family,
		fontSize: typography.primitives.scale[12],
		fontWeight: typography.primitives.weight.bold,
		color: colors.primitives.white[100],
	},
	likes: {
		fontFamily: typography.primitives.family,
		fontSize: typography.styles.body.sizes.xsmall(),
		color: colors.text.default.default(),
	},
	boldText: {
		fontWeight: typography.primitives.weight.bold,
	},
	description: {
		fontFamily: typography.primitives.family,
		fontSize: typography.styles.body.sizes.base(),
		color: colors.text.default.default(),
	},
	moreText: {
		color: colors.text.default.secondary(),
        fontWeight: typography.styles.body.fontWeights.bold(),
	},
	commentsLink: {
		fontFamily: typography.primitives.family,
		fontSize: typography.primitives.scale[14],
		color: colors.primitives.gray[500],
		marginTop: colors.primitives.scale[8],
	},
});
