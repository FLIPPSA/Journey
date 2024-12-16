import * as React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { colors, typography, sizes } from "../../utils/design";
import TextIcon from "../Icons/TextIcon";
import Logo from "../Brand/Logo";
import IconButton from "../Buttons/IconButton";
import TextButton from "../Buttons/TextButton";

export default function UpperNavigation({ domains = [] }) {
	return (
		<View style={styles.container}>
			{/* Upper Section */}
			<View style={styles.upper}>
				<View style={styles.content}>
					{/* Logo */}
					<Logo />

					{/* Icons */}
					<View style={styles.upperIcons}>
						<TextIcon from={"Feather"} name={"bell"} number={5} />
						<TextIcon
							from={"MaterialCommunityIcons"}
							name={"treasure-chest"}
							number={"8"}
						/>
						<TextIcon from={"Feather"} name={"shopping-cart"} />
					</View>
				</View>
			</View>

			{/* Lower Section */}
			<View style={styles.lower}>
				<View style={styles.content}>
					<TextButton variant="Neutral" text="All" />
					{domains.map((domain, index) => (
						<IconButton
							key={index}
							variant="neutral"
							icon={domain.icon}
							text={domain.description}
						/>
					))}
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.background.default.default(),
		alignItems: "center",
		overflow: "hidden",
	},
	upper: {
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		paddingHorizontal: sizes.space[16],
		paddingVertical: sizes.space[8],
	},
	content: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	upperIcons: {
		gap: sizes.space[16],
		flexDirection: "row",
		alignItems: "center",
	},
	badgeText: {
		fontSize: typography.styles.subheading.sizes.small(),
		lineHeight: typography.styles.subheading.sizes.small(),
		color: colors.text.default.inverse(),
		fontFamily: typography.styles.subheading.fontFamily(),
		fontWeight: typography.styles.subheading.fontWeight(),
		textAlign: "center",
	},
	lower: {
		width: "100%",
		paddingHorizontal: sizes.space[16],
		paddingVertical: sizes.space[8],
	},
	categoryButton: {
		gap: sizes.space[2],
		maxWidth: sizes.space[64],
		borderRadius: sizes.radius.circle,
		justifyContent: "center",
		alignItems: "center",
	},
	iconContainer: {
		position: "relative",
	},
	runIcon: {
		width: sizes.space[24],
		height: sizes.space[24],
		overflow: "hidden",
	},
	categoryText: {
		fontSize: typography.styles.body.sizes.xsmall(),
		fontWeight: typography.styles.body.fontWeights.regular(),
		fontFamily: typography.styles.body.fontFamily(),
		color: colors.text.default.default(),
		textAlign: "center",
	},
	activeCategory: {
		backgroundColor: colors.background.brand.default(),
	},
});
