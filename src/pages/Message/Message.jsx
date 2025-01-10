import React, { useEffect, useState, useContext } from "react";
import {
	FlatList,
	StyleSheet,
	View,
} from "react-native";
import { supabase } from "../../utils/supabaseConfig";
import UpperNavigationBack from "../../components/Navigation/UpperNavigationBack";
import FriendBlock from "../../components/Avatars/FriendBlock";
import UserContext from "../../utils/authentication";
import { fetchFriends } from "../../utils/common";
import Search from "../../components/Inputs/Search";
import { sizes } from "../../utils/design";

export default function Message({ navigation }) {
	const [friends, setFriends] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const { user } = useContext(UserContext);

	// Handle pull-to-refresh
	const handleRefresh = async () => {
		setRefreshing(true);
		await fetchFriendsFunction();
		setRefreshing(false); // Stop the refresh indicator
	};

	const fetchFriendsFunction = async () => {
		try {
			const fetchedFriends = await fetchFriends(user.id);
			setFriends(fetchedFriends);
		} catch (error) {
			console.error("Error fetching friends:", error);
		}
	};

	useEffect(() => {
		fetchFriendsFunction();
	}, []);

	// Filter friends based on search term
	const filteredFriends = friends.filter((friend) =>
		friend.username.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<View style={styles.container}>
			<UpperNavigationBack heading="Message" showIcon={true} />
			<View style={styles.mainContent}>
				<View style={styles.searchWrapper}>
					<Search value={searchTerm} onSearch={setSearchTerm} />
				</View>

				<FlatList
					data={filteredFriends} // Pass filtered friends here
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<FriendBlock
							name={item.username}
							avatarUri={item.profilePicture}
							description={item.description}
							showButton={false}
							onPress={() =>
								navigation.navigate("MessageTo", {
									user,
									chatPartner: item,
								})
							}
						/>
					)}
					keyboardShouldPersistTaps="handled"
					refreshing={refreshing} // Show the refreshing indicator
					onRefresh={handleRefresh} // Triggered when pulled down
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	searchWrapper: {
		width: "100%",
	},
	mainContent: {
		padding: sizes.space[8],
		width: "100%",
	},
});
