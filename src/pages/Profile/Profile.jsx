import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import ProfileNavigation from "../../components/Navigation/ProfileNavigation";
import Tabs from "../../components/Tabs/Tabs";
import { useContext, useEffect, useState } from "react";
import Chip from "../../components/Tags/Chip";
import { colors, sizes, typography } from "../../utils/design";
import UserContext from "../../utils/authentication";
import { fetchUserPosts } from "../../utils/common";

export default function Profile({ navigation }) {
	const [activeTab, setActiveTab] = useState("Friends");
	const [posts, setPosts] = useState([]);
	const { user } = useContext(UserContext);

	useEffect(() => {
		async function fetchData() {
			const fetchedPosts = await fetchUserPosts(user.id);
			setPosts(fetchedPosts);
		}
		fetchData();
	}, []);

	const renderActiveScreen = () => {
		switch (activeTab) {
			case "Friends":
				return (
					<View style={styles.screen}>
						<Text>Friends Screen</Text>
					</View>
				);
			case "Achievements":
				return (
					<View style={[styles.screen, styles.contentContainer]}>
						<View style={styles.category}>
							<Text style={styles.filterByText}>Filter By:</Text>
							<View style={styles.chips}>
								<Chip text="All" />
							</View>
						</View>
                        <View style={styles.contentWrapper}>
                            <Text style={styles.title}>Completed Tasks</Text>
                        </View>
                        <View style={styles.contentWrapper}>
                            <Text style={styles.title}>Badges</Text>
                        </View>
					</View>
				);
			case "Posts":
				return (
					<View style={styles.screen}>
						<View style={[styles.category, styles.contentContainer]}>
							<Text style={styles.filterByText}>Filter By:</Text>
							<View style={styles.chips}>
								<Chip text="All" />
							</View>
						</View>
						<FlatList
							data={posts}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => {
								return (
									<TouchableOpacity
										onPress={() => {
											// Handle post click
											navigation.navigate("PostDetails", {
												postId: item.id,
												user,
											});
										}}
										style={styles.imageWrapper}
									>
										<Image
											source={{
												uri: item.fileUrls[0],
											}}
											style={styles.image}
										/>
									</TouchableOpacity>
								);
							}}
							contentContainerStyle={styles.flatlistContent}
							numColumns={4} // Set the number of columns
							keyboardShouldPersistTaps="handled"
							ListFooterComponent={
								<View style={styles.footerSpacing} />
							}
						/>
					</View>
				);
			default:
				return null;
		}
	};

	return (
		<View style={styles.container}>
			<ProfileNavigation showBack={false} />
			<Tabs
				label1="Friends"
				label2="Achievements"
				label3="Posts"
				showTab4={false}
				showTab5={false}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
			{renderActiveScreen()}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	screen: {
		flex: 1,
		width: "100%",
	},
	category: {
		gap: sizes.space[4],
		width: "100%",
		alignItems: "flex-start",
	},
	filterByText: {
		color: colors.text.default.secondary(),
	},
	chips: {
		flexDirection: "row",
	},
	imageWrapper: {
		flex: 1, // Equal space for each image
		margin: sizes.space[4],
	},
	image: {
		width: "100%",
		aspectRatio: 1,
	},
	flatlistContent: {
		paddingBottom: sizes.space[24],
		backgroundColor: colors.primitives.gray[900],
		flex: 1,
	},
	footerSpacing: {
		height: sizes.space[16],
	},
    contentWrapper: {
        gap: sizes.space[8]
    },
    contentContainer: {
        paddingHorizontal: sizes.space[8],
    },
    title: {
        color: colors.text.default.default(),
        fontSize: typography.styles.body.sizes.base(),
        fontWeight: typography.styles.body.fontWeights.bold(),
    }
});
