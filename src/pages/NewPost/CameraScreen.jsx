import React, { useState, useEffect, useRef } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	Alert,
} from "react-native";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";

export default function CameraScreen() {
	const [hasPermission, setHasPermission] = useState(null);
	const [cameraRef, setCameraRef] = useState(null);
	const [photo, setPhoto] = useState(null);
	const navigation = useNavigation();

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	const takePicture = async () => {
		if (cameraRef) {
			const photo = await cameraRef.takePictureAsync();
			setPhoto(photo.uri);
		}
	};

	const savePhoto = () => {
		if (photo) {
			navigation.navigate("PreviousScreen", { photo }); // Pass photo back
		} else {
			Alert.alert("No photo taken", "Please take a photo first!");
		}
	};

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.container}>
			{!photo ? (
				<Camera
					style={styles.camera}
					type={Camera.Constants.Type.back}
					ref={(ref) => setCameraRef(ref)}
				>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={styles.takePhotoButton}
							onPress={takePicture}
						>
							<Text style={styles.buttonText}>Take Photo</Text>
						</TouchableOpacity>
					</View>
				</Camera>
			) : (
				<View style={styles.preview}>
					<Image
						source={{ uri: photo }}
						style={styles.imagePreview}
					/>
					<View style={styles.previewButtons}>
						<TouchableOpacity
							style={styles.retakeButton}
							onPress={() => setPhoto(null)}
						>
							<Text style={styles.buttonText}>Retake</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.saveButton}
							onPress={savePhoto}
						>
							<Text style={styles.buttonText}>Save</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		backgroundColor: "transparent",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	takePhotoButton: {
		backgroundColor: "white",
		padding: 15,
		borderRadius: 50,
		marginBottom: 20,
	},
	buttonText: {
		fontSize: 16,
		color: "black",
	},
	preview: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	imagePreview: {
		width: "90%",
		height: "70%",
		borderRadius: 10,
	},
	previewButtons: {
		flexDirection: "row",
		marginTop: 20,
		gap: 10,
	},
	retakeButton: {
		backgroundColor: "gray",
		padding: 15,
		borderRadius: 10,
	},
	saveButton: {
		backgroundColor: "green",
		padding: 15,
		borderRadius: 10,
	},
});
