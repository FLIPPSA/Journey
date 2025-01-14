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
import {
	addFriend,
	approveFriendRequest,
	denyFriendRequest,
	fetchDiscoverUsers,
	fetchDomains,
	fetchFriends,
	fetchPendingFriendRequests,
	fetchPosts,
	fetchUserPosts,
	toggleSelection,
} from "../../utils/common";
import Search from "../../components/Inputs/Search";
import FriendBlock from "../../components/Avatars/FriendBlock";

export default function Profile({ navigation }) {
	const [activeTab, setActiveTab] = useState("Friends");
	const [searchQuery, setSearchQuery] = useState("");
	const [posts, setPosts] = useState([]);
	const [friends, setFriends] = useState([]);
	const [allUsers, setAllUsers] = useState([]);
	const [pendingRequests, setPendingRequests] = useState([]);
	const [domains, setDomains] = useState([]);
	const [selectedDomains, setSelectedDomains] = useState(["All"]);

	const { user } = useContext(UserContext);

	const [denyLoading, setDenyLoading] = useState(false);
	const [approveLoading, setApproveLoading] = useState(false);
	const [requestLoading, setRequestLoading] = useState(false);

	const [discoveryRefreshing, setDiscoveryRefreshing] = useState(false);
	const [postRefreshing, setPostRefreshing] = useState(false);
	const [friendRefreshing, setFriendRefreshing] = useState(false);

	useEffect(() => {
		async function fetchData() {
			const fetchedDomains = await fetchDomains();
			setDomains(fetchedDomains);
		}
		fetchData();
	}, []);

	// Initial data fetch
	useEffect(() => {
		fetchUserPostsFunction();
	}, [selectedDomains]); // Refetch posts whenever selectedDomains change

	const handleApproveFriendRequest = async (senderId) => {
		setApproveLoading(true);
		await approveFriendRequest(senderId, user.id);
		await fetchPendingFriendRequestsFunction();
		await fetchFriendsFunction();
		setApproveLoading(false);
	};

	const handleSendFriendRequest = async (receiverId) => {
		setRequestLoading(true);
		await addFriend(user.id, receiverId);
		await fetchPendingFriendRequestsFunction();
		await fetchFriendsFunction();
		setRequestLoading(false);
	};

	const handleDenyFriendRequest = async (senderId) => {
		setDenyLoading(true);
		await approveFriendRequest(senderId, user.id);
		await fetchPendingFriendRequestsFunction();
		await fetchDiscoverUsersFunction();
		setDenyLoading(false);
	};

	// Handle pull-to-refresh for Discovery
	const handleDiscoveryRefresh = async () => {
		setDiscoveryRefreshing(true);
		await fetchPendingFriendRequestsFunction();
		await fetchDiscoverUsersFunction();
		setDiscoveryRefreshing(false);
	};

	const handlePostRefresh = async () => {
		setPostRefreshing(true);
		await fetchUserPostsFunction();
		setPostRefreshing(false);
	};

	const handleFriendRefresh = async () => {
		setFriendRefreshing(true);
		await fetchFriendsFunction();
		setFriendRefreshing(false);
	};

	const fetchDiscoverUsersFunction = async () => {
		try {
			const fetchedDiscoveryUsers = await fetchDiscoverUsers(
				user.id,
				"",
				1,
				50
			);
			setAllUsers(fetchedDiscoveryUsers);
		} catch (error) {
			console.error("Error fetching discover users:", error);
		}
	};

	const fetchPendingFriendRequestsFunction = async () => {
		try {
			const fetchedPendingRequests = await fetchPendingFriendRequests(
				user.id
			);
			setPendingRequests(fetchedPendingRequests);
		} catch (error) {
			console.error("Error fetching friend requests:", error);
		}
	};

	const fetchFriendsFunction = async () => {
		try {
			const fetchedFriends = await fetchFriends(user.id);
			setFriends(fetchedFriends);
		} catch (error) {
			console.error("Error fetching friends:", error);
		}
	};

	const fetchUserPostsFunction = async () => {
		try {
			const fetchedPosts = await fetchUserPosts(user.id, selectedDomains);
			setPosts(fetchedPosts);
		} catch (error) {
			console.error("Error fetching posts:", error);
		}
	};

	// Initial fetch
	useEffect(() => {
		fetchUserPostsFunction();
		fetchFriendsFunction();
		fetchPendingFriendRequestsFunction();
		fetchDiscoverUsersFunction();
	}, []);

	// Fetch discovery users when searchQuery changes
	useEffect(() => {
		const fetchDiscovery = async () => {
			const fetchedUsers = await fetchDiscoverUsers(
				user.id,
				searchQuery,
				1,
				50
			);
			setAllUsers(fetchedUsers);
		};

		// Debounce the fetch
		// const debounce = setTimeout(() => {
		fetchDiscovery();
		// }, 100); // Adjust delay as needed

		// return () => clearTimeout(debounce);
	}, [searchQuery]);

	const renderActiveScreen = () => {
		switch (activeTab) {
			case "Friends":
				const filteredFriends = friends.filter((friend) =>
					friend.username
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
				);
				return (
					<View style={[styles.screen, styles.contentContainer]}>
						<View style={styles.searchContainer}>
							<Search onSearch={setSearchQuery} />
						</View>
						<FlatList
							data={filteredFriends}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => {
								return (
									<FriendBlock
										name={item.username}
										avatarUri={item.profilePicture}
										buttonText={"Message"}
										messageIcon={true}
										moreIcon={true}
										onMessagePress={() =>
											navigation.navigate("MessageTo", {
												user,
												chatPartner: item,
											})
										}
									/>
								);
							}}
							// contentContainerStyle={styles.flatlistContent}
							keyboardShouldPersistTaps="handled"
							refreshing={friendRefreshing} // Show the refreshing indicator
							onRefresh={handleFriendRefresh} // Triggered when pulled down
						/>
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
						<View
							style={[styles.category, styles.contentContainer]}
						>
							<Text style={styles.filterByText}>Filter By:</Text>
							<View style={styles.chips}>
								<Chip
									text="All"
									active={selectedDomains.includes("All")}
									onPress={() =>
										toggleSelection(
											"All",
											setSelectedDomains,
											"All"
										)
									}
								/>
								<FlatList
									data={domains}
									keyExtractor={(item) => item.id.toString()}
									renderItem={({ item }) => (
										<Chip
											text={item.title}
											active={selectedDomains.includes(
												item.id
											)}
											onPress={() =>
												toggleSelection(
													item.id,
													setSelectedDomains,
													"All"
												)
											}
										/>
									)}
									horizontal
									contentContainerStyle={styles.domainRow}
									showsHorizontalScrollIndicator={false}
								/>
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
							keyboardShouldPersistTaps="handled"
							numColumns={3}
							key={`numColumns-${3}`} // Dynamically set the key
							ListFooterComponent={
								<View style={styles.footerSpacing} />
							}
							refreshing={postRefreshing} // Show the refreshing indicator
							onRefresh={handlePostRefresh} // Triggered when pulled down
						/>
					</View>
				);
			case "Discover":
				return (
					<View style={[styles.screen, styles.contentContainer]}>
						{pendingRequests.length > 0 && (
							<View style={styles.pendingRequestsContainer}>
								<Text style={styles.title}>
									Pending Requests
								</Text>
								<FlatList
									data={pendingRequests}
									keyExtractor={(item) => item.id.toString()}
									renderItem={({ item }) => (
										<FriendBlock
											name={item.username}
											avatarUri={item.profilePicture}
											showButton={"Double"}
											onApprovePress={() =>
												handleApproveFriendRequest(
													item.id
												)
											}
											onDenyPress={() =>
												handleDenyFriendRequest(item.id)
											}
											approveLoading={approveLoading}
											denyLoading={denyLoading}
										/>
									)}
									// contentContainerStyle={styles.flatlistContent}
									keyboardShouldPersistTaps="handled"
									refreshing={discoveryRefreshing} // Show the refreshing indicator
									onRefresh={handleDiscoveryRefresh} // Triggered when pulled down
								/>
							</View>
						)}

						<View style={styles.addFriendsContainer}>
							<Text style={styles.title}>Add Friends</Text>
							<Text>
								Explore from your circle of friends or interest.
							</Text>
						</View>

						{/* Search Field */}
						<View style={styles.searchContainer}>
							<Search
								state={searchQuery ? "Entered" : "Default"}
								text="Search users..."
								onSearch={setSearchQuery} // Update searchQuery dynamically
							/>
						</View>

						<FlatList
							data={allUsers}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => (
								<FriendBlock
									name={item.username}
									avatarUri={item.profilePicture}
									buttonText={"Request Friend"}
									onMessagePress={() =>
										handleSendFriendRequest(item.id)
									}
									buttonLoading={requestLoading}
								/>
							)}
							// contentContainerStyle={styles.flatlistContent}
							keyboardShouldPersistTaps="handled"
							refreshing={discoveryRefreshing} // Show the refreshing indicator
							onRefresh={handleDiscoveryRefresh} // Triggered when pulled down
						/>
					</View>
				);
			default:
				return null;
		}
	};

	return (
		<View style={styles.container}>
			<ProfileNavigation profileName={user.username} showBack={false} />
			<Tabs
				label1="Friends"
				showTab2={true}
				label2="Achievements"
				showTab3={true}
				label3="Posts"
				showTab4={true}
				label4="Discover"
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
        gap: sizes.space[8],
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
		// flex: 1,
	},
	footerSpacing: {
		height: sizes.space[16],
	},
	contentWrapper: {
		gap: sizes.space[8],
	},
	contentContainer: {
		paddingHorizontal: sizes.space[8],
	},
	title: {
		color: colors.text.default.default(),
		fontSize: typography.styles.body.sizes.base(),
		fontWeight: typography.styles.body.fontWeights.bold(),
	},
	pendingRequestsContainer: {
		paddingBottom: sizes.space[8],
	},
	addFriendsContainer: {
		paddingVertical: sizes.space[8],
	},
	searchContainer: {
		paddingBottom: sizes.space[8],
	},
    domainRow: {
		gap: sizes.space[8],
	},
});
