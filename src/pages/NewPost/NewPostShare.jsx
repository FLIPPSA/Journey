import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import UpperNavigationBack from "../../components/Navigation/UpperNavigationBack";
import { fetchDomains, handlePostUpload, wp } from "../../utils/common";
import { colors, sizes } from "../../utils/design";
import Chip from "../../components/Tags/Chip";
import InputField from "../../components/Inputs/InputField";
import Button from "../../components/Buttons/Button";
import { useNavigation } from "expo-router";
import UserContext from "../../utils/authentication";

export default function NewPostShare({ route }) {
	const navigation = useNavigation();
	const { selectedImages } = route.params;
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [caption, setCaption] = useState("");
	const [domains, setDomains] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useContext(UserContext);

	const [selectedChip, setSelectedChip] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const fetchedDomains = await fetchDomains();
			setDomains(fetchedDomains);
		}
		fetchData();
	}, []);

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
			<UpperNavigationBack type="back" showNext={false} showBack={true}/>
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

			<View style={styles.detailContainer}>
				<View style={styles.tagCategoryContainer}>
					<Text>Tag category.</Text>
					<View style={styles.domainRow}>
						<Chip
							text="Other"
							active={selectedChip === "Other"} // Check if this chip is selected
							onPress={() => setSelectedChip("Other")} // Update selected chip
						/>
						<FlatList
							data={domains}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({ item }) => (
								<Chip
									text={item.title}
									active={selectedChip === item.id} // Check if this chip is selected
									onPress={() => setSelectedChip(item.id)} // Update selected chip
								/>
							)}
							horizontal
							contentContainerStyle={styles.domainRow}
							showsHorizontalScrollIndicator={false}
						/>
					</View>
				</View>
				<View style={styles.inputWrapper}>
					<InputField
						state="default"
						valueType="default"
						label="Caption the image."
						value={caption}
						onChangeText={setCaption}
						placeholder="Type here..."
					/>
				</View>
                <View style={styles.buttonWrapper}>
				<Button
					variant="primary"
					state="default"
					size="medium"
					label="Share Post"
					isLoading={isLoading}
					onPress={async () =>
						await handlePostUpload(
							navigation,
							selectedImages,
							caption,
							user.id
						)
					}
				/>
                </View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
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
	detailContainer: {
		gap: sizes.space[16],
		padding: sizes.space[16],
		// flex: 1,
	},
	tagCategoryContainer: {
		gap: sizes.space[4],
	},
	domainRow: {
		flexDirection: "row",
		gap: sizes.space[16],
	},
	inputWrapper: {
		flexDirection: "row",
	},
    buttonWrapper: {
		flexDirection: "row",
	},
});
