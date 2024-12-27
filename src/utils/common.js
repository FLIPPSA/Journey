import { Dimensions, Alert } from "react-native";
import { supabase } from "./supabaseConfig";
import Constants from 'expo-constants';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
import * as FileSystem from "expo-file-system";

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
		Alert.alert("Success", "Account created successfully!");
		setUser({ id: data.user.id, firstName });
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
	const { data: tasksets, error } = await supabase.from("tasksets").select("*");

	if (error) {
		throw new Error(error.message);
	}
	return tasksets;
};

export const fetchPosts = async ({ belongingDomain }) => {
	const { data: posts, error } = await supabase.from("posts").select("*");

	if (error) {
		throw new Error(error.message);
	}
	return posts;
};

    export async function handlePostUpload(navigation, selectedImages, caption, userId) {
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
            navigation.navigate("NavBar")
        }
    };


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
        console.log('Extension:', extension)
        console.log('Real path:', file)

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