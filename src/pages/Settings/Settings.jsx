import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import UpperNavigationBack from "../../components/Navigation/UpperNavigationBack";
import MenuItem from "../../components/Navigation/MenuItem";
import Button from "../../components/Buttons/Button";
import { sizes } from "../../utils/design";
import UserContext from "../../utils/authentication";

export default function Settings({ navigation }) {
	const { user } = useContext(UserContext);

	return (
		<View style={styles.screen}>
			<UpperNavigationBack
				type="back"
				heading="Settings"
				showNext={false}
				showBack={true}
			/>
			<View style={styles.container}>
				<View>
					<MenuItem
						icon="user"
						title="Account"
						description="Username, Email"
                        onPress={() => navigation.navigate("Account", {user})}
					/>
					<MenuItem
						icon="key"
						title="Reset Password"
						description="Password Management"
                        onPress={() => navigation.navigate("ResetPassword")}
					/>
					<MenuItem
						icon="headphones"
						title="Support"
						description="Questions, Feedback"
                        onPress={() => navigation.navigate("Support")}
					/>
				</View>
				<Button
					variant="tertiary"
					state="default"
					size="medium"
					label="Delete Account"
					leftIcon={false}
					rightIcon={false}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	container: {
		flex: 1,
		justifyContent: "space-between",
		paddingHorizontal: sizes.space[8],
		paddingVertical: sizes.space[16],
	},
});
