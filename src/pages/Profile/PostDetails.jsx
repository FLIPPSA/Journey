import { StyleSheet, FlatList, Text, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import UpperNavigationBack from "../../components/Navigation/UpperNavigationBack";
import { fetchPostById } from "../../utils/common";
import PostCard from "../../components/Cards/PostCard";

export default function PostDetails({ route }) {
	const [post, setPost] = useState([]);
	const { postId, user } = route.params;

	useEffect(() => {
		async function fetchInitialPosts() {
			const fetchedPost = await fetchPostById(postId);
			setPost(fetchedPost);
		}
		fetchInitialPosts();
	}, [postId]);

    useEffect(() => {
        console.log('User:', user, '\n', 'post ID:', postId)
    }, [])


	return (
		<View style={styles.container}>
			<UpperNavigationBack
				type="back"
				heading="My Post"
				showNext={false}
				showBack={true}
			/>

			<PostCard
				user={user}
				id={post.id}
				name={post.name}
				time={post.time}
				caption={post.caption}
				images={post.fileUrls}
				avatar={post.avatar}
				likes={post.likeCount}
				commentCount={post.commentCount}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	flatlistContent: {
		gap: 200,
	},
	footerSpacing: {
		height: 100, // Adjust to add space at the bottom
	},
});
