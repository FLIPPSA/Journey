import { Dimensions, Alert } from "react-native";
import { supabase } from "./supabaseConfig";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export const hp = percentage => {
    return (percentage * deviceHeight) / 100;
}

export const wp = percentage => {
    return (percentage * deviceWidth) / 100;
}

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