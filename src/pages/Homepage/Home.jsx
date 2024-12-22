import { Image, StyleSheet, Platform, View, Text } from "react-native";
import UpperNavigation from "../../components/Navigation/UpperNavigation";
import PostCard from "../../components/Cards/PostCard";
import { useEffect, useState } from "react";
import { fetchPosts } from "../../utils/common";

export default function Home() {
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const fetchedPosts = await fetchPosts();
            setPosts(fetchedPosts)
        }
        fetchData();
    })

	return (
		<View style={styles.container}>
			<UpperNavigation />
            {posts.map((post, idx) => {
                <PostCard key={idx}/>
            })}
            
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		justifyContent: "center",
	},
});
