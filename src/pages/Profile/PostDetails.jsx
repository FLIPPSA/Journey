import { StyleSheet, FlatList, Text, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import UpperNavigationBack from "../../components/Navigation/UpperNavigationBack";
import { fetchUserPostsAfter, fetchUserPostsBefore } from "../../utils/common";
import PostCard from "../../components/Cards/PostCard";

export default function PostDetails({ route }) {
	const [posts, setPosts] = useState([]);
	const [isFetchingEarlier, setIsFetchingEarlier] = useState(false);
	const [isFetchingLater, setIsFetchingLater] = useState(false);
	const [hasMoreEarlier, setHasMoreEarlier] = useState(true);
	const [hasMoreLater, setHasMoreLater] = useState(true);

	const { postId, user } = route.params;

	useEffect(() => {
		async function fetchInitialPosts() {
			const initialPosts = await fetchUserPostsAfter(user.id, postId, 10);
			setPosts(initialPosts);
		}
		fetchInitialPosts();
	}, [postId]);

	const fetchEarlierPosts = async () => {
		if (isFetchingEarlier || !hasMoreEarlier) return;

		setIsFetchingEarlier(true);
		const earliestPost = posts[0]; // Get the first post in the list
		const earlierPosts = await fetchUserPostsBefore(
			user.id,
			earliestPost.id,
			10
		);
		if (earlierPosts.length < 10) setHasMoreEarlier(false);
		setPosts((prevPosts) => [...earlierPosts, ...prevPosts]);
		setIsFetchingEarlier(false);
	};

	const fetchLaterPosts = async () => {
		if (isFetchingLater || !hasMoreLater) return;

		setIsFetchingLater(true);
		const latestPost = posts[posts.length - 1]; // Get the last post in the list
		const laterPosts = await fetchUserPostsAfter(
			user.id,
			latestPost.id,
			10
		);
		if (laterPosts.length < 10) setHasMoreLater(false);
		setPosts((prevPosts) => [...prevPosts, ...laterPosts]);
		setIsFetchingLater(false);
	};

	return (
		<View style={styles.container}>
			<UpperNavigationBack
				type="back"
				heading="My Posts"
				showNext={false}
				showBack={true}
			/>
			<FlatList
				data={posts}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => {
					return (
						<PostCard
							user={user}
							id={item.id}
							name={item.name}
							time={item.time}
							caption={item.caption}
							images={item.fileUrls}
							avatar={item.avatar}
							likes={item.likeCount}
							commentCount={item.commentCount}
						/>
					);
				}}
				contentContainerStyle={styles.flatlistContent}
				onEndReached={fetchLaterPosts}
				onEndReachedThreshold={0.5}
				onScrollBeginDrag={fetchEarlierPosts} // For fetching earlier posts
				ListFooterComponent={<View style={styles.footerSpacing} />}
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
