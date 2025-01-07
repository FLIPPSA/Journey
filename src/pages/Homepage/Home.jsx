import {
	Image,
	StyleSheet,
	Platform,
	View,
	Text,
	FlatList,
} from "react-native";
import UpperNavigation from "../../components/Navigation/UpperNavigation";
import PostCard from "../../components/Cards/PostCard";
import { useContext, useEffect, useState } from "react";
import { fetchPosts } from "../../utils/common";
import UserContext from "../../utils/authentication";
import { sizes } from "../../utils/design";

export default function Home() {
	const [posts, setPosts] = useState([]);
	const { user } = useContext(UserContext);

	useEffect(() => {
		async function fetchData() {
			const fetchedPosts = await fetchPosts();
			setPosts(fetchedPosts);
			console.log("All posts:", fetchedPosts);
		}
		fetchData();
	}, []);

	return (
		<View style={styles.container}>
			<UpperNavigation />
			<FlatList
				data={posts}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => {
					const images = Array.isArray(item.fileUrls)
						? item.fileUrls
						: JSON.parse(item.fileUrls || "[]");
					return (
						<PostCard
							user={user}
							id={item.id}
							name={item.name}
							time={item.time}
							caption={item.caption}
							images={images}
							avatar={item.avatar}
							likes={item.likeCount}
							commentCount={item.commentCount}
						/>
					);
				}}
				contentContainerStyle={styles.flatlistContent}
				keyboardShouldPersistTaps="handled"
				ListFooterComponent={<View style={styles.footerSpacing} />} // Add spacing at the end
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1, // Ensures the container occupies full height
		// backgroundColor: "white", // Optional background
	},
	flatlistContent: {
        gap: 200,
	},
	footerSpacing: {
		height: 100, // Adjust to add space at the bottom
	},
});
