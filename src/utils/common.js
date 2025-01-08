import { Dimensions, Alert, Animated, Easing } from "react-native";
import { supabase } from "./supabaseConfig";
import Constants from "expo-constants";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import * as FileSystem from "expo-file-system";
import { formatDistanceToNow } from "date-fns";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

const SUPABASE_URL = Constants.expoConfig?.extra?.SUPABASE_URL;
const SUPABASE_ANONKEY = Constants.expoConfig?.extra?.SUPABASE_ANONKEY;

export const hp = (percentage) => {
	return (percentage * deviceHeight) / 100;
};

export const wp = (percentage) => {
	return (percentage * deviceWidth) / 100;
};

function getFileExtension(filename) {
	if (typeof filename === "string" && filename.includes(".")) {
		return filename.split(".").pop()?.toLowerCase() || "";
	}
	return "";
}

export const handleSignUp = async (
	navigation,
	setUser,
	email,
	password,
	username
) => {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) {
		Alert.alert("Sign Up Error", error.message);
		return;
	}

	if (data.user) {
		const { error: insertError } = await supabase
			.from("users")
			.insert([{ id: data.user.id, username, email }]);

		if (insertError) {
			Alert.alert("Profile Error", insertError.message);
			return;
		}
		const userObj = await fetchUser(data.user.id);
		setUser(userObj);
		navigation.navigate("NavBar");
	}
};

export const handleLogIn = async (navigation, setUser, email, password) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		Alert.alert("Sign In Error", error.message);
		return; // Stop execution if there's an error
	}

	if (data && data.user) {
		try {
			const userObj = await fetchUser(data.user.id);
			setUser(userObj);
			navigation.navigate("NavBar");
		} catch (fetchError) {
			Alert.alert("Profile Fetch Error", fetchError.message);
		}
	} else {
		Alert.alert("Sign In Error", "No user found in response");
	}
};

export const fetchUser = async (id) => {
	const { data: userData, error: fetchError } = await supabase
		.from("users")
		.select("*")
		.eq("id", id)
		.single();

	if (fetchError) {
		Alert.alert("Profile Error", fetchError.message);
		return;
	}

	return userData;
};

export const fetchAllDomains = async () => {
	const { data: domains, error } = await supabase.from("domains").select("*");

	if (error) {
		throw new Error(error.message);
	}
	return domains;
};

export const fetchAllTasksets = async () => {
	const { data: tasksets, error } = await supabase
		.from("tasksets")
		.select("*");

	if (error) {
		throw new Error(error.message);
	}
	return tasksets;
};

export const fetchPosts = async ({ belongingDomain } = {}) => {
	try {
		const { data: posts, error } = await supabase.from("posts").select(
			`
                    *,
                    user:users(username, profilePicture),
                    likes:likes(userId, commentId),
                    commentCount:comments!left(postId)
                `
		);

		if (error) {
			throw new Error(error.message);
		}

		// Format the posts data
		const formattedPosts = posts.map((post) => {
			const postLikes =
				post.likes?.filter((like) => !like.commentId) || []; // Only likes without commentId
			return {
				...post,
				time: formatTime(post.createdAt),
				name: post.user?.username, // Add `username` directly
				avatar: post.user?.profilePicture, // Add `profilePicture` directly
				likeCount: postLikes.length, // Count only likes for posts
				commentCount: post.commentCount?.length || 0, // Count the number of comments
				fileUrls: post.fileUrls ? JSON.parse(post.fileUrls) : [], // Parse the JSON string into an array
			};
		});

		return formattedPosts;
	} catch (error) {
		console.error("Error fetching posts:", error);
		throw error;
	}
};

export async function handlePostUpload(
	navigation,
	selectedImages,
	caption,
	userId
) {
	try {
		// Array to store the public URLs of uploaded images
		const uploadedImageUrls = await Promise.all(
			selectedImages.map(async (image) => {
				if (image) {
					return await uploadFileToStorage(image, "Posts");
				}
				return null; // Skip if no image
			})
		);

		// Filter out any null entries
		const fileUrls = uploadedImageUrls.filter((url) => url !== null);

		// Insert post with the array of uploaded image URLs
		await uploadRowToDatabase("posts", {
			caption,
			fileUrls,
			userId,
		});

		console.log("Post uploaded successfully!");
	} catch (error) {
		console.error("Error uploading post with images:", error);
		throw error;
	} finally {
		navigation.navigate("NavBar");
	}
}

export async function uploadRowToDatabase(tableName, inserts) {
	const { data, error } = await supabase
		.from(tableName)
		.insert([inserts])
		.select();

	if (error) {
		throw error;
	}
	return data;
}

// Upload the file directly using FileSystem.uploadAsync
export async function uploadFileToStorage(file, bucketName) {
	try {
		const uniqueID = uuidv4(); // Generate a unique ID for the file
		const extension = getFileExtension(file); // Get file extension
		console.log("Extension:", extension);
		console.log("Real path:", file);

		// Supabase storage endpoint for uploading the file
		const filePath = `${bucketName}/${uniqueID}.${extension}`;
		const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${filePath}`;

		// Upload the file using expo-file-system's uploadAsync method
		const response = await FileSystem.uploadAsync(uploadUrl, file, {
			headers: {
				Authorization: `Bearer ${SUPABASE_ANONKEY}`, // Set the authorization header
				"Content-Type": `image/${extension}`, // Adjust based on file type
			},
			httpMethod: "POST",
			uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT, // Upload binary file content
		});

		if (response.status !== 200) {
			throw new Error(`Upload failed with status: ${response.body}`);
		}

		// Return the public URL of the uploaded file
		return `${SUPABASE_URL}/storage/v1/object/public/${bucketName}/${uniqueID}.${extension}`;
	} catch (error) {
		console.error("Error uploading file:", error);
		throw error;
	}
}

export const formatTime = (timestamp) => {
	return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};

const handleNavigateToProfile = (post, user) => {
	if (user.id === post.userId) {
		navigation.navigate("OwnProfile");
	} else {
		navigation.navigate("UserProfile", { userId: post.userId });
	}
};

export const addLike = async (userId, postId) => {
	const { error } = await supabase.from("likes").insert([{ userId, postId }]);
	if (error) {
		throw new Error(error.message);
	}
	return true;
};

export const removeLike = async (userId, postId) => {
	const { data, error } = await supabase
		.from("likes")
		.delete()
		.match({ userId, postId }) // Match userId and postId
		.is("commentId", null); // Ensure commentId is NULL

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const fetchUserLikedPostCheck = async (userId, postId) => {
	const { data: likes, error } = await supabase
		.from("likes")
		.select("postId")
		.eq("userId", userId)
		.eq("postId", postId)
		.is("commentId", null); // Use `.is` to check for NULL values

	if (error) {
		throw new Error(error.message);
	}

	return likes.length > 0;
};

export const animateHeart = (
	heartScaleAnim,
	heartOpacityAnim,
	setShowHeart
) => {
	setShowHeart(true);
	heartScaleAnim.setValue(0);
	heartOpacityAnim.setValue(1);

	Animated.sequence([
		Animated.timing(heartScaleAnim, {
			toValue: 1.5,
			duration: 200,
			useNativeDriver: true,
		}),
		Animated.timing(heartScaleAnim, {
			toValue: 1,
			duration: 200,
			useNativeDriver: true,
		}),
		Animated.timing(heartScaleAnim, {
			toValue: 1.1,
			duration: 200,
			useNativeDriver: true,
		}),
		Animated.timing(heartScaleAnim, {
			toValue: 1.1,
			duration: 300,
			useNativeDriver: true,
		}),
		Animated.parallel([
			Animated.timing(heartScaleAnim, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true,
			}),
			Animated.timing(heartOpacityAnim, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true,
			}),
		]),
	]).start(() => setShowHeart(false));
};

export const openCommentSection = (setVisible, slideAnim) => {
	setVisible(true);
	Animated.timing(slideAnim, {
		toValue: 1,
		duration: 300,
		easing: Easing.out(Easing.ease),
		useNativeDriver: true,
	}).start();
};

export const closeCommentSection = (setVisible, slideAnim) => {
	Animated.timing(slideAnim, {
		toValue: 0,
		duration: 300,
		easing: Easing.in(Easing.ease),
		useNativeDriver: true,
	}).start(() => setVisible(false));
};

export async function postComment(
	content,
	userId,
	postId,
	parentCommentId = null
) {
	if (!content) {
		return { error: "Content is required!" };
	}

	try {
		const { data, error } = await supabase.from("comments").insert([
			{
				content,
				userId,
				postId,
				parentCommentId,
			},
		]);

		if (error) {
			console.error("Error posting comment:", error);
			return { error };
		}

		return { data };
	} catch (err) {
		console.error("Unexpected error posting comment:", err);
		return { error: err.message };
	}
}

export async function fetchComments(userId, postId) {
	if (!postId) {
		return { error: "Post ID is required!" };
	}

	try {
		const { data, error } = await supabase
			.from("comments")
			.select(
				`
                    id,
                    content,
                    userId,
                    parentCommentId,
                    createdAt,
                    users (username, profilePicture),
                    likes:likes!likes_commentId_fkey (userId)
                `
			)
			.eq("postId", postId)
			.not("likes.commentId", "is", null)
			.order("parentCommentId", { ascending: true }) // Ensures threaded replies are grouped
			.order("createdAt", { ascending: true }); // Orders comments by time

		if (error) {
			console.error("Error fetching comments:", error);
			return { error };
		}

		// Format the time for each comment like in the fetchPosts function and count likes for comments
		const formattedComments = await Promise.all(
			data.map(async (comment) => ({
				...comment,
				liked: await fetchUserLikedCommentCheck(
					userId,
					postId,
					comment.id
				),
				time: formatTime(comment.createdAt), // Format the createdAt time
				name: comment.users?.username, // Add username
				avatar: comment.users?.profilePicture, // Add profile picture
			}))
		);

		// Group replies under their parent comments using Map
		const groupedComments = (() => {
			const commentMap = new Map();

			// Add all comments to the map, initialize replies as an empty array
			formattedComments.forEach((comment) => {
				commentMap.set(comment.id, { ...comment, replies: [] });
			});

			// Assign replies to their parent comment
			formattedComments.forEach((comment) => {
				if (comment.parentCommentId) {
					const parentComment = commentMap.get(
						comment.parentCommentId
					);
					if (parentComment) {
						parentComment.replies.push({
							id: comment.id,
							content: comment.content,
							userId: comment.userId,
							parentCommentId: comment.parentCommentId,
							name: comment.name,
							avatar: comment.avatar,
						});
					}
				}
			});

			// Return only top-level comments (those without a parent)
			return Array.from(commentMap.values()).filter(
				(comment) => !comment.parentCommentId
			);
		})();

		console.log("Comments:", JSON.stringify(groupedComments, null, 2));

		return groupedComments;
	} catch (err) {
		console.error("Unexpected error fetching comments:", err);
		return { error: err.message };
	}
}

export const addCommentLike = async (userId, postId, commentId) => {
	const { error } = await supabase
		.from("likes")
		.insert([{ userId, postId, commentId }]);
	if (error) {
		console.log("error:", error);
		throw new Error(error.message);
	}
	console.log("Comment liked");
	return true;
};

export const removeCommentLike = async (userId, postId, commentId) => {
	const { data, error } = await supabase
		.from("likes")
		.delete()
		.match({ userId, postId, commentId });

	if (error) {
		console.log("error:", error);
		throw new Error(error.message);
	}
	console.log("Comment disliked");
	return data;
};

export const fetchUserLikedCommentCheck = async (userId, postId, commentId) => {
	const { data: likes, error } = await supabase
		.from("likes")
		.select("postId")
		.eq("userId", userId)
		.eq("postId", postId)
		.eq("commentId", commentId);

	if (error) {
		throw new Error(error.message);
	}

	return likes.length > 0;
};

export const fetchUserPosts = async (userId) => {
	try {
		const { data, error } = await supabase
			.from("posts")
			.select("id, fileUrls")
			.eq("userId", userId);

		if (error) {
			throw new Error(error.message);
		}

		// Parse the fileUrls JSON strings into arrays
		const formattedData = data.map((post) => ({
			...post,
			fileUrls: post.fileUrls ? JSON.parse(post.fileUrls) : [], // Parse or fallback to an empty array
		}));

		return formattedData; // Array of posts with parsed fileUrls
	} catch (error) {
		console.error("Error fetching user posts:", error.message);
		throw error;
	}
};

export const fetchUserPostsBefore = async (userId, postId, limit = 10) => {
	try {
		const { data: post } = await supabase
			.from("posts")
			.select("createdAt")
			.eq("id", postId)
			.single();

		const { data, error } = await supabase
			.from("posts")
			.select(
				`
                *,
                user:users(username, profilePicture),
                likes:likes(userId, commentId),
                commentCount:comments!left(postId)
            `
			)
			.eq("userId", userId)
			.lt("createdAt", post.createdAt) // Posts before the given post
			.order("createdAt", { ascending: false }) // Most recent first
			.limit(limit);

		if (error) throw error;
		return data.map((post) => ({
			...post,
			fileUrls: post.fileUrls ? JSON.parse(post.fileUrls) : [],
		}));
	} catch (error) {
		console.error("Error fetching earlier posts:", error);
		return [];
	}
};

export const fetchUserPostsAfter = async (userId, postId, limit = 10) => {
	try {
		const { data: post } = await supabase
			.from("posts")
			.select("createdAt")
			.eq("id", postId)
			.single();

		const { data, error } = await supabase
			.from("posts")
			.select(
				`
                *,
                user:users(username, profilePicture),
                likes:likes(userId, commentId),
                commentCount:comments!left(postId)
            `
			)
			.eq("userId", userId)
			.gt("createdAt", post.createdAt) // Posts after the given post
			.order("createdAt", { ascending: true }) // Oldest first
			.limit(limit);

		// Format the posts data
		const formattedPosts = data.map((post) => {
			const postLikes =
				post.likes?.filter((like) => !like.commentId) || []; // Only likes without commentId
			return {
				...post,
				time: formatTime(post.createdAt),
				name: post.user?.username, // Add `username` directly
				avatar: post.user?.profilePicture, // Add `profilePicture` directly
				likeCount: postLikes.length, // Count only likes for posts
				commentCount: post.commentCount?.length || 0, // Count the number of comments
				fileUrls: post.fileUrls ? JSON.parse(post.fileUrls) : [], // Parse the JSON string into an array
			};
		});

		return formattedPosts;
	} catch (error) {
		console.error("Error fetching later posts:", error);
		return [];
	}
};

export const addFriend = async (senderId, receiverId) => {
	try {
		// Validate inputs
		if (!senderId || !receiverId) {
			throw new Error("Both senderId and receiverId are required.");
		}

		// Insert relationship into the "relationships" table
		const { data, error } = await supabase
			.from("relationships")
			.insert([{ senderId, receiverId, status: false }]);

		if (error) {
			throw new Error(error.message);
		}

		return data; // Successfully added relationship
	} catch (error) {
		console.error("Error adding friend:", error.message);
		throw error;
	}
};

export const fetchFriends = async (userId) => {
	try {
		// Validate input
		if (!userId) {
			throw new Error("User ID is required.");
		}

		// Fetch relationships where the user is either the sender or receiver, and the status is true (accepted)
		const { data, error } = await supabase
			.from("relationships")
			.select(
				`
                id,
                senderId,
                receiverId,
                sender:users!relationships_senderId_fkey(id, username, profilePicture),
                receiver:users!relationships_receiverId_fkey(id, username, profilePicture)
            `
			)
			.or(`senderId.eq.${userId},receiverId.eq.${userId}`)
			.eq("status", true);

		if (error) {
			throw new Error(error.message);
		}

		// Extract and normalize friend data
		const friends = data.map((relation) => {
			if (relation.senderId === userId) {
				return relation.receiver; // Friend is the receiver
			} else {
				return relation.sender; // Friend is the sender
			}
		});

		return friends; // Array of friend objects with id, username, and profilePicture
	} catch (error) {
		console.error("Error fetching friends:", error.message);
		throw error;
	}
};

export const fetchPendingFriendRequests = async (userId) => {
	try {
		// Validate input
		if (!userId) {
			throw new Error("User ID is required.");
		}

		// Fetch relationships where the user is the receiver and status is false (pending)
		const { data, error } = await supabase
			.from("relationships")
			.select(
				`
                senderId,
                sender:users!relationships_senderId_fkey(id, username, profilePicture)
            `
			)
			.eq("receiverId", userId)
			.eq("status", false);

		if (error) {
			throw new Error(error.message);
		}

		// Extract and normalize pending request data
		const pendingRequests = data.map((relation) => ({
			id: relation.sender.id,
			username: relation.sender.username,
			profilePicture: relation.sender.profilePicture,
		}));

		return pendingRequests; // Array of pending request objects with id, username, and profilePicture
	} catch (error) {
		console.error("Error fetching pending friend requests:", error.message);
		throw error;
	}
};

export const fetchDiscoverUsers = async (
	userId,
	searchQuery = "",
	page = 1,
	limit = 50
) => {
	try {
		// Validate input
		if (!userId) {
			throw new Error("User ID is required.");
		}

		// Calculate offset for pagination
		const offset = (page - 1) * limit;

		// Fetch all relationships where the user is either the sender or receiver
		const { data: relationshipsData, error: relationshipsError } =
			await supabase
				.from("relationships")
				.select("senderId, receiverId")
				.or(`senderId.eq.${userId},receiverId.eq.${userId}`);

		if (relationshipsError) {
			throw new Error(relationshipsError.message);
		}

		// Extract IDs of all related users (friends or pending requests)
		const relatedUserIds = new Set(
			relationshipsData.flatMap((relation) =>
				relation.senderId === userId
					? relation.receiverId
					: relation.senderId
			)
		);

		// Fetch users excluding related users and the current user
		const { data: users, error: usersError } = await supabase
			.from("users")
			.select("id, username, profilePicture")
			.not("id", "in", `(${[...relatedUserIds].join(",")})`) // Exclude related users
			.neq("id", userId) // Exclude the current user
			.ilike("username", `%${searchQuery}%`) // Filter by search query (case-insensitive)
			.range(offset, offset + limit - 1); // Pagination

		if (usersError) {
			throw new Error(usersError.message);
		}

		return users; // Return the list of users for discovery
	} catch (error) {
		console.error("Error fetching discover users:", error.message);
		throw error;
	}
};

export const approveFriendRequest = async (senderId, receiverId) => {
	try {
		// Validate input
		if (!senderId || !receiverId) {
			throw new Error("Both senderId and receiverId are required.");
		}

		// Update the relationship status to true (approved)
		const { data, error } = await supabase
			.from("relationships")
			.update({ status: true })
			.eq("senderId", senderId)
			.eq("receiverId", receiverId);

		if (error) {
			throw new Error(error.message);
		}

		return data; // Return the updated row
	} catch (error) {
		console.error("Error approving friend request:", error.message);
		throw error;
	}
};

export const denyFriendRequest = async (senderId, receiverId) => {
	try {
		// Validate input
		if (!senderId || !receiverId) {
			throw new Error("Both senderId and receiverId are required.");
		}

		// Delete the relationship row
		const { data, error } = await supabase
			.from("relationships")
			.delete()
			.eq("senderId", senderId)
			.eq("receiverId", receiverId);

		if (error) {
			throw new Error(error.message);
		}

		return data; // Return the deleted row(s)
	} catch (error) {
		console.error("Error denying friend request:", error.message);
		throw error;
	}
};
