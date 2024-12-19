import React, { useState, useEffect } from "react";
import {
	Image,
	StyleSheet,
	View,
	FlatList,
	Pressable,
	Text,
	Dimensions,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import UpperNavigationBack from "../../components/Navigation/UpperNavigationBack";
import IconButton from "../../components/Buttons/IconButton";
import { colors, sizes } from "../../utils/design";
import { wp } from "../../utils/common";

export default function NewPost({ navigation }) {
	const [galleryImages, setGalleryImages] = useState([]);
	const [selectedImages, setSelectedImages] = useState([]);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	// Load images from the gallery
	useEffect(() => {
		(async () => {
			const { status } = await MediaLibrary.requestPermissionsAsync();
			if (status === "granted") {
				const media = await MediaLibrary.getAssetsAsync({
					mediaType: "photo",
					first: 50,
				});
				setGalleryImages(media.assets);
			}
		})();
	}, []);

	// Toggle image selection
	const toggleImageSelection = (uri) => {
		setSelectedImages((prev) => {
			if (prev.includes(uri)) {
				return prev.filter((item) => item !== uri);
			} else {
				return [...prev, uri];
			}
		});
	};

	// Render each image item
	const renderImageItem = ({ item }) => {
		const isSelected = selectedImages.includes(item.uri);

		return (
			<Pressable
				onPress={() => toggleImageSelection(item.uri)}
				style={styles.imageWrapper}
			>
				<Image source={{ uri: item.uri }} style={styles.imageItem} />
				{isSelected && <View style={styles.darkOverlay} />}
				{isSelected && <View style={styles.innerBorder} />}
				{isSelected && (
					<View style={styles.selectionNumber}>
						<Text style={styles.selectionText}>
							{selectedImages.indexOf(item.uri) + 1}
						</Text>
					</View>
				)}
			</Pressable>
		);
	};

	// Render pagination dots
	const renderPaginationDots = () => {
		return (
			<View style={styles.pagination}>
				{selectedImages.map((_, index) => (
					<View
						key={index}
						style={[
							styles.dot,
							index === currentImageIndex
								? styles.activeDot
								: styles.inactiveDot,
						]}
					/>
				))}
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<UpperNavigationBack
				type="back"
				heading="New Post"
				onPressNext={() =>
					navigation.navigate("NewPostShare", {
						selectedImages: selectedImages,
					})
				}
			/>

			{/* Main Image Carousel */}
			<View style={styles.carouselContainer}>
				<FlatList
					data={selectedImages}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					onScroll={(e) => {
						const newIndex = Math.round(
							e.nativeEvent.contentOffset.x / wp(100)
						);
						setCurrentImageIndex(newIndex);
					}}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => (
						<Image
							source={{ uri: item }}
							style={styles.carouselImage}
						/>
					)}
				/>
				{renderPaginationDots()}
			</View>

			{/* Image Actions */}
			<View style={styles.iconButtons}>
				<IconButton
					variant="primary"
					size="x-small"
					from="Feather"
					icon={"camera"}
					showText={false}
				/>
				<IconButton
					variant="primary"
					size="x-small"
					from="Feather"
					icon={"image"}
					showText={false}
				/>
			</View>

			{/* Image Grid */}
			<View style={styles.imagesContainer}>
				<FlatList
					data={galleryImages}
					keyExtractor={(item) => item.id}
					renderItem={renderImageItem}
					numColumns={3}
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
	carouselContainer: {
		width: "100%",
		height: wp(75),
		position: "relative",
	},
	carouselImage: {
		width: wp(100),
		height: wp(75),
		resizeMode: "cover",
	},
	pagination: {
		position: "absolute",
		bottom: 10,
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginHorizontal: 4,
	},
	activeDot: {
		backgroundColor: colors.background.brand.default(),
	},
	inactiveDot: {
		backgroundColor: colors.primitives.gray[300],
		opacity: 0.5,
	},
	iconButtons: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "flex-end",
		padding: sizes.space[8],
		gap: sizes.space[12],
	},
	imagesContainer: {
		flex: 1,
		width: "100%",
		padding: sizes.space[8],
		backgroundColor: colors.primitives.gray[900],
	},
	imageWrapper: {
		flex: 1,
		aspectRatio: 1,
		position: "relative",
		padding: sizes.space[4],
	},
	imageItem: {
		width: "100%",
		height: "100%",
	},
	darkOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: colors.primitives.black[500],
		opacity: 0.5,
	},
	innerBorder: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		borderWidth: 1,
		borderColor: colors.background.brand.default(),
	},
	selectionNumber: {
		position: "absolute",
		top: 8,
		right: 8,
		backgroundColor: colors.background.brand.default(),
		borderRadius: 999,
		width: 24,
		height: 24,
		alignItems: "center",
		justifyContent: "center",
	},
	selectionText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 14,
	},
});
