import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CommentCard from "../../components/Cards/CommentCard";
import InputField from "../../components/Inputs/InputField";
import { Feather } from "@expo/vector-icons";
import { colors, sizes } from "../../utils/design";
import Avatar from "../../components/Avatars/Avatar";
import { fetchComments, postComment, wp } from "../../utils/common";

export default function Commenting({ user={}, postId }) {
	const [commentContent, setCommentContent] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function fetchAllComments() {
            const fetchedComments = await fetchComments(user.id, postId);
            setComments(fetchedComments);
        }
        fetchAllComments()
    }, [])

	return (
		<View style={styles.container}>
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
						showReplies={false}
                        liked={item.liked}
                        likeCount={item.likeCount}
                        postId={postId}
                        userId={user.id}
					/>
				)}
				contentContainerStyle={styles.listContainer}
			/>

			<View style={styles.inputContainer}>
				<View style={styles.inner}>
					<Avatar imageUri={user.profilePicture}/>
					<InputField
						value={commentContent}
						onChangeText={setCommentContent}
						hasLabel={false}
						placeholder="Comment..."
						rightIcon={"send"}
                        rightOnPress={async () => await postComment(commentContent, user.id, postId, null)}
					/>
					{/* <Feather
						name="smile"
						size={sizes.icon.small}
						color={colors.icon.default.default()}
					/> */}
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	listContainer: {
		padding: 10,
	},
	inputContainer: {
        borderColor: colors.border.default.default(),
        borderWidth: sizes.stroke[1],
		paddingVertical: sizes.space[12],
        gap: sizes.space[4],
		alignItems: "center",
		width: wp(100),
	},
	inner: {
		flexDirection: "row",
		// flex: 1,
		backgroundColor: "#FFFFFF",
		paddingHorizontal: sizes.space[16],
		alignItems: "center",
		gap: sizes.space[16],
	},
});
