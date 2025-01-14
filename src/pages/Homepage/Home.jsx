import { Image, StyleSheet, View, Text, FlatList } from "react-native";
import UpperNavigation from "../../components/Navigation/UpperNavigation";
import PostCard from "../../components/Cards/PostCard";
import { useContext, useEffect, useState } from "react";
import { fetchDomains, fetchPosts, toggleSelection } from "../../utils/common";
import UserContext from "../../utils/authentication";
import { sizes } from "../../utils/design";

export default function Home({ route }) {
	const [posts, setPosts] = useState([]);
	const [refreshing, setRefreshing] = useState(false); // Track refresh state
	const { user } = useContext(UserContext);
	const [domains, setDomains] = useState([]);
	const [selectedDomains, setSelectedDomains] = useState(["All"]);

	useEffect(() => {
		async function fetchData() {
			const fetchedDomains = await fetchDomains();
			setDomains(fetchedDomains);
		}
		fetchData();
	}, []);

	// Fetch data function
	const fetchPostsFunction = async () => {
		try {
			const fetchedPosts = await fetchPosts(selectedDomains);
			setPosts(fetchedPosts);
		} catch (error) {
			console.error("Error fetching posts:", error);
		}
	};

	// Initial data fetch
	useEffect(() => {
		fetchPostsFunction();
	}, [selectedDomains]); // Refetch posts whenever selectedDomains change

	// Handle pull-to-refresh
	const handleRefresh = async () => {
		setRefreshing(true);
		await fetchData(); // Re-fetch the posts
		setRefreshing(false); // Stop the refresh indicator
	};

	return (
		<View style={styles.container}>
			<UpperNavigation
				domains={domains}
				selectedDomains={selectedDomains}
				setSelectedDomains={setSelectedDomains}
			/>
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
				ListFooterComponent={<View style={styles.footerSpacing} />}
				refreshing={refreshing} // Show the refreshing indicator
				onRefresh={handleRefresh} // Triggered when pulled down
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
		height: 100,
	},
});
