import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import AvatarBlock from "../../components/Avatars/AvatarBlock";
import UpperNavigationBack from "../../components/Navigation/UpperNavigationBack";
import InputField from "../../components/Inputs/InputField";
import { sizes } from "../../utils/design";
import * as ImagePicker from "expo-image-picker";
import UserContext from "../../utils/authentication";
import { deleteFileFromStorage, updateRowToDatabase, uploadFileToStorage } from "../../utils/common";

export default function Account({ route }) {
	const usernameRef = useRef(null);
	const emailRef = useRef(null);
	const {user, setUser} = useContext(UserContext);
    const [isUploading, setIsUploading] = useState(false);

	// State to store the selected profile picture URI
	const [profilePicture, setProfilePicture] = useState(user.profilePicture);

	const handleOpenGallery = async () => {
		// Request media library permissions
		const permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (!permissionResult.granted) {
			Alert.alert(
				"Permission Required",
				"Permission to access the gallery is required!"
			);
			return;
		}

		// Open the image picker
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

		if (!pickerResult.canceled) {
			const selectedImageUri = pickerResult.assets[0].uri;

            // Upload the image
			handleProfilePictureUpload(selectedImageUri);
		}
	};

	const handleProfilePictureUpload = async (uri) => {
		setIsUploading(true);
		try {
			// Delete the existing profile picture if it exists
			if (user.profilePicture) {
				await deleteFileFromStorage(user.profilePicture);
			}

			// Upload the new profile picture
			const uploadedImageUrl = await uploadFileToStorage(uri, "ProfilePictures");

			// Update the user's profile in the database
			await updateRowToDatabase(
				"users",
				{ profilePicture: uploadedImageUrl },
				user.id
			);

			// Update the profile picture state
			setProfilePicture(uploadedImageUrl);

			setUser((prevUser) => ({
				...prevUser,
				profilePicture: uploadedImageUrl
			}));

		} catch (error) {
			console.error("Error uploading profile picture:", error);
			Alert.alert("Error", "Failed to update profile picture.");
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<View style={styles.container}>
			<UpperNavigationBack
				type="back"
				heading="Account"
				showNext={false}
				showBack={true}
			/>
			<View style={styles.mainContent}>
				<AvatarBlock
					layout="centered"
					showDescription={false}
					name="Upload Image"
					imageUri={profilePicture}
					onPress={handleOpenGallery} // Open the gallery on press
				/>

				<View style={styles.inputWrapper}>
					<InputField
						ref={usernameRef}
						state="Default"
						valueType="default"
						hasLabel={true}
						label="Username"
						value={user.username}
                        editable={false}
						// onChangeText={setUsername}
					/>
				</View>
				<View style={styles.inputWrapper}>
					<InputField
						ref={emailRef}
						state="Default"
						valueType="default"
						hasLabel={true}
						label="Email"
						value={user.email}
                        editable={false}
						// onChangeText={setEmail}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	mainContent: {
		paddingVertical: sizes.space[16],
		paddingHorizontal: sizes.space[8],
		gap: sizes.space[16],
	},
	inputWrapper: {
		flexDirection: "row",
		width: "100%",
	},
});
