import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { colors, typography, sizes } from "../../utils/design";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Button from "../Buttons/Button";
import Feather from "@expo/vector-icons/Feather";

export default function TaskCard({
	fitness = false,
	done = false,
	heading = "Delicious Meal",
	description = "Take a picture of a delicious meal",
	showIcon1 = true,
	icon1 = "Treasure.png",
	showIcon2 = true,
	icon2 = "Coin.png",
	showProgress = true,
	progress = 7,
}) {
	const circleRadius = sizes.space[48];
	const strokeWidth = sizes.stroke[4];
	const circleCircumference = 2 * Math.PI * circleRadius;
	const progressStrokeDashoffset = circleCircumference - (progress * 10 / 100) * circleCircumference;

	return (
		<View style={styles.taskCard}>
			{/* Card Header */}
			<View
				style={[styles.header, fitness ? styles.fitnessHeader : null]}
			>
				<View style={styles.imageContainer}>
					<Image
						style={styles.imgIcon}
						resizeMode="cover"
						source={{
							uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsARvnEfJhWkW_tjESV9PFWmpssJuPOK8irBInVBDJGcyusKDUPL4RuPx2pYhOcVzL9_E&usqp=CAU",
						}}
					/>
					<View style={styles.overlay} />
                    {showProgress && (
						<View style={styles.progressContainer}>
							<Svg
								width={circleRadius * 2 + strokeWidth}
								height={circleRadius * 2 + strokeWidth}
							>
								{/* Background Circle */}
								<Circle
									cx={circleRadius + strokeWidth / 2}
									cy={circleRadius + strokeWidth / 2}
									r={circleRadius}
									stroke={colors.background.brand.tertiary()} // Background circle color
									strokeWidth={strokeWidth}
									fill="none"
								/>
								{/* Progress Circle */}
								<Circle
									cx={circleRadius + strokeWidth / 2}
									cy={circleRadius + strokeWidth / 2}
									r={circleRadius}
									stroke={colors.background.brand.default()} // Progress color
									strokeWidth={strokeWidth}
									fill="none"
									strokeDasharray={`${circleCircumference} ${circleCircumference}`}
									strokeDashoffset={progressStrokeDashoffset}
									strokeLinecap="round"
                                    transform={`rotate(-90 ${circleRadius + strokeWidth / 2} ${circleRadius + strokeWidth / 2})`}
								/>
							</Svg>
							<Text style={styles.progressText}>{progress}</Text>
						</View>
					)}
				</View>
				<View style={styles.content}>
					<View style={styles.headingRow}>
						<Text style={styles.heading}>{heading}</Text>
						{done ? (
							<Feather
								name="check-circle"
								size={24}
								color="black"
							/>
						) : (
							<Feather
								name="upload"
								size={24}
								color={colors.icon.default.default()}
							/>
						)}
					</View>
					<Text style={styles.description}>{description}</Text>
					<View style={styles.rewards}>
						{showIcon1 && (
							<View style={styles.rewardItem}>
								<MaterialCommunityIcons
									name="treasure-chest"
									size={24}
									color="black"
								/>
								<View style={styles.rewardBox}>
									<Text style={styles.rewardText}>3</Text>
								</View>
							</View>
						)}
						{showIcon2 && (
							<View style={styles.rewardItem}>
								<MaterialCommunityIcons
									name="star-four-points-outline"
									size={24}
									color="black"
								/>
								<View style={styles.rewardBox}>
									<Text style={styles.rewardText}>8</Text>
								</View>
							</View>
						)}
					</View>
					{/* Progress or Actions */}
					{showProgress && (
						<View style={styles.actionRow}>
							<Button
								variant="tertiary"
								state="default"
								size="small"
								label="Cancel"
							/>
							<Button
								variant="primary"
								state="default"
								size="small"
								label="Start"
							/>
						</View>
					)}

					{/* Achievement */}
					{done && (
						<Button
							variant="primary"
							state="default"
							size="small"
							label="Share Achievement"
						/>
					)}
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	taskCard: {
		borderRadius: sizes.radius[4],
		borderWidth: sizes.stroke[1],
		borderColor: colors.border.default.default(),
		width: "100%",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		gap: sizes.space[10],
		position: "relative",
	},
	fitnessHeader: {
		backgroundColor: colors.background.default.default(),
	},
    imageContainer: {
        position: "relative",
        width: sizes.space[160],
        height: sizes.space[160],
        borderTopLeftRadius: sizes.radius[4],
        borderBottomLeftRadius: sizes.radius[4],
        overflow: "hidden",
    },    
	imgIcon: {
		width: "100%",
		height: "100%",
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black overlay
	},
	progressContainer: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: [
			{ translateX: -sizes.space[48] },
			{ translateY: -sizes.space[48] },
		],
		justifyContent: "center",
		alignItems: "center",
	},
	progressText: {
		position: "absolute",
		fontSize: typography.styles.titleHero.fontSize(),
		fontWeight: typography.styles.titleHero.fontWeight(),
		color: colors.text.brand.tertiary(),
	},
	content: {
		padding: sizes.space[12],
		gap: sizes.space[8],
	},
	headingRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	heading: {
		fontSize: typography.styles.heading.sizes.base(),
		fontWeight: typography.styles.heading.fontWeight(),
		color: colors.text.default.default(),
	},
	description: {
		fontSize: typography.styles.body.sizes.xsmall(),
		color: colors.text.default.secondary(),
	},
    rewards: {
		flexDirection: "row",
		gap: sizes.space[8],
		alignItems: "center",
	},
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: sizes.space[8],
    },
	rewardItem: {
		position: "relative",
	},
	rewardBox: {
		position: "absolute",
		bottom: -sizes.space[4],
		right: -sizes.space[4],
		width: sizes.space[16],
		height: sizes.space[16],
		backgroundColor: colors.background.brand.default(),
		borderRadius: sizes.radius.circle,
		justifyContent: "center",
		alignItems: "center",
	},
	rewardText: {
		fontSize: typography.styles.body.sizes.xsmall(),
		fontWeight: typography.styles.body.fontWeights.bold(),
		color: colors.text.default.inverse(),
	},
});
