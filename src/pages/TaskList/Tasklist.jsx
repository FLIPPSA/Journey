import {
	Image,
	StyleSheet,
	Platform,
	View,
	Text,
	FlatList,
} from "react-native";
import UpperNavigationBack from "../../components/Navigation/UpperNavigationBack";
import Tabs from "../../components/Tabs/Tabs";
import { useEffect, useState } from "react";
import TaskCard from "../../components/Cards/TaskCard";
import { colors, sizes, typography } from "../../utils/design";
import { fetchDomains, toggleSelection } from "../../utils/common";
import Chip from "../../components/Tags/Chip";
import Checkbox from "../../components/Inputs/Checkbox";

export default function Tasklist() {
	const [activeTab, setActiveTab] = useState("Dailies");
	const [domains, setDomains] = useState([]);

	const [selectedDomains, setSelectedDomains] = useState(["All"]);
	const [tasks, setTasks] = useState([]);

	const [taskset, setTaskset] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const fetchedDomains = await fetchDomains();
			setDomains(fetchedDomains);
		}
		fetchData();
	}, []);

	const renderActiveScreen = () => {
		switch (activeTab) {
			case "Dailies":
				return (
					<View style={styles.screen}>
						<View style={styles.firstTextRow}>
							<Text style={styles.headline}>Prompt:</Text>
							<Text>Complete at least 3 tasks.</Text>
						</View>

						<View>
							<Text style={styles.headline}>Cooking</Text>
							<TaskCard />
						</View>

						<View style={styles.taskCardContainer}>
							<Text style={styles.headline}>Fitness</Text>
							<TaskCard />
						</View>

						<View>
							<Text style={styles.headline}>Photography</Text>
							<TaskCard />
						</View>
					</View>
				);
			case "Challenges":
				return (
					<View style={styles.screen}>
						<View style={styles.tagCategoryContainer}>
							<Text>Filter By:</Text>
							<View style={styles.domainRow}>
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
									keyExtractor={(item, index) =>
										index.toString()
									}
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

						<View style={styles.firstTextRow}>
							<Text style={styles.headline}>Prompt:</Text>
							<Text>Complete at least 3 tasks.</Text>
						</View>

						<FlatList
							data={tasks}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({ item }) => <TaskCard />}
							// contentContainerStyle={styles.domainRow}
							showsHorizontalScrollIndicator={false}
						/>
					</View>
				);
			case "Sets":
				return (
					<View style={styles.screen}>
						<View style={styles.tagCategoryContainer}>
							<Text>Filter By:</Text>
							<View style={styles.domainRow}>
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
							<FlatList
								data={taskset}
								keyExtractor={(item, index) => index.toString()}
								renderItem={({ item }) => (
									<View style={styles.taskContainer}>
										<Image
											source={{ uri: item.fileUrl }}
											style={styles.taskImage}
										/>
										<View style={styles.taskCardWrapper}>
											<View style={styles.innerContainer}>
												<Text style={styles.taskTitle}>
													{item.title}
												</Text>
												<Checkbox />
											</View>
											<Text style={styles.taskDescription}>
												{item.description}
											</Text>
										</View>
									</View>
								)}
								horizontal
								contentContainerStyle={styles.domainRow}
								showsHorizontalScrollIndicator={false}
							/>
						</View>

						<View style={styles.firstTextRow}>
							<Text style={styles.headline}>Prompt:</Text>
							<Text>Complete at least 3 tasks.</Text>
						</View>

						<FlatList
							data={tasks}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({ item }) => <TaskCard />}
							// contentContainerStyle={styles.domainRow}
							showsHorizontalScrollIndicator={false}
						/>
					</View>
				);
			default:
				return null;
		}
	};

	return (
		<View style={styles.container}>
			<UpperNavigationBack heading="Task List" showBack={true} />

			<Tabs
				label1="Dailies"
				showTab2={true}
				label2="Challenges"
				showTab3={true}
				label3="Sets"
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
		// justifyContent: 'center',
		// alignItems: "center",
	},
	screen: {
		gap: sizes.space[16],
		paddingHorizontal: sizes.space[8],
	},
	taskCardContainer: {
		gap: sizes.space[2],
	},
	headline: {
		color: colors.text.default.default(),
		fontWeight: typography.styles.body.fontWeights.bold(),
		fontSize: typography.styles.body.sizes.base(),
	},
	firstTextRow: {
		flexDirection: "row",
		alignItems: "flex-end",
		gap: sizes.space[4],
	},
	tagCategoryContainer: {
		gap: sizes.space[4],
	},
	domainRow: {
		flexDirection: "row",
		gap: sizes.space[8],
	},
	innerContainer: {
		flexDirection: "row",
		justifyContent: "space-between", // Ensures even spacing between title and checkbox
		alignItems: "center", // Align items vertically centered
	},
	taskContainer: {
		flexDirection: "row",
		borderColor: colors.border.default.default(),
		borderWidth: 1,
		borderRadius: sizes.radius[4],
	},
	taskCardWrapper: {
		flex: 1,
		gap: sizes.space[4],
		paddingHorizontal: sizes.space[8],
		justifyContent: "center",
	},
	taskImage: {
		width: sizes.space[64],
		height: sizes.space[64],
		borderTopLeftRadius: sizes.radius[4],
		borderBottomLeftRadius: sizes.radius[4],
	},
	taskTitle: {
		fontSize: typography.styles.heading.sizes.base(),
		fontWeight: typography.styles.heading.fontWeight(),
	},
	taskDescription: {
		fontSize: typography.styles.body.sizes.xsmall(),
		fontWeight: typography.styles.body.fontWeights.regular(),
		color: colors.text.default.secondary(),
	},
});
