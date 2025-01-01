import { Image, StyleSheet, Platform, View, Text } from "react-native";
import UpperNavigation from "../../components/Navigation/UpperNavigation";
import PostCard from "../../components/Cards/PostCard";
import { useContext, useEffect, useState } from "react";
import { fetchPosts } from "../../utils/common";
import UserContext from "../../utils/authentication";

export default function Home() {
	const [posts, setPosts] = useState([]);
	const { user } = useContext(UserContext);

	useEffect(() => {
		async function fetchData() {
			const fetchedPosts = await fetchPosts();
            console.log('Posts:', fetchedPosts)
			setPosts(fetchedPosts);
		}
		fetchData();
	}, []);

    return (
        <View style={styles.container}>
            <UpperNavigation />
            {posts.map((post, idx) => {
                const images = Array.isArray(post.fileUrls)
                    ? post.fileUrls
                    : JSON.parse(post.fileUrls || "[]");
    
                return (
                    <PostCard
                        key={idx}
                        user={user}
                        id={post.id}
                        name={post.name}
                        time={post.time}
                        caption={post.caption}
                        images={images}
                        avatar={post.avatar}
                        likes={post.likeCount}
                    />
                );
            })}
        </View>
    );
    
    
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
});
