import { Dimensions, Alert } from "react-native";
import { supabase } from "./supabaseConfig";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export const hp = (percentage) => {
	return (percentage * deviceHeight) / 100;
};

export const wp = (percentage) => {
	return (percentage * deviceWidth) / 100;
};

export const handleSignUp = async (
	navigation,
	setUser,
	email,
	password,
	firstName
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
			.insert([{ id: data.user.id, firstName, email }]);

		if (insertError) {
			Alert.alert("Profile Error", insertError.message);
			return;
		}
		Alert.alert("Success", "Account created successfully!");
		setUser({ id: data.user.id, firstName });
		navigation.navigate("NavBar");
	}
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

export async function insertPost(userId, caption, mediaUrl) {
	try {
		const { data, error } = await supabase.from("posts").insert([
			{
				userId,
				caption,
				mediaUrl,
			},
		]);

		if (error) {
			throw new Error(error.message);
		}

		return { success: true, data };
	} catch (error) {
		console.error("Error inserting post:", error.message);
		return { success: false, error: error.message };
	}
}
