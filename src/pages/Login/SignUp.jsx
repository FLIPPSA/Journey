import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, typography, sizes } from "../../utils/design";
import Logo from "../../components/Brand/Logo";
import InputField from "../../components/Inputs/InputField";
import Link from "../../components/Navigation/Link";
import CheckboxField from "../../components/Inputs/CheckboxField";
import Button from "../../components/Buttons/Button";
import Divider from "../../components/Utility/Divider";
import Socials from "../../components/Icons/Socials";

export default function SignUp({ navigation }) {
    

	return (
		<View style={styles.container}>
			<Logo showText={false} />

			<Text style={styles.signUpText}>Sign Up</Text>

			<View style={styles.mainContent}>
            <InputField
					state="Default"
					valueType="default"
					hasLabel={true}
					label="Full Name"
				/>

				<InputField
					state="Default"
					valueType="default"
					hasLabel={true}
					label="Email"
				/>

				<InputField
					state="default"
					valueType="default"
					hasLabel={true}
					label="Password"
					rightIcon={"eye-off"}
				/>

				<Link
					variant="Brand"
					state="Default"
					size="Medium"
					label="Forgot Password?"
				/>
				<View style={styles.checkBox}>
					<CheckboxField
						state="Default"
						checked={true}
						label="Remember Me"
						hasDescription={false}
					/>
					<Text>Hey</Text>
				</View>
			</View>

			<Button
				variant="primary"
				state="default"
				size="medium"
				label="Log In"
			/>

			<View style={styles.socialContainer}>
				<View style={styles.continueWith}>
					<Divider />
					<Text>or continue with</Text>
					<Divider />
				</View>
				<View styles={styles.socialsContainer}>
					<Socials type={"Facebook"} />
					<Socials type={"Google"} />
				</View>
			</View>

			<View style={styles.accountContainer}>
				<Text>Don't have an account?</Text>
				<Link
					variant="Brand"
					state="Default"
					size="Medium"
					label="Sign Up"
					onPress={() => navigation.navigate("SignUp")}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: sizes.space[32],
		paddingHorizontal: sizes.space[16],
	},
	signUpText: {
		fontSize: typography.styles.titlePage.sizes.base(),
		fontFamily: typography.styles.titlePage.fontFamily(),
		fontWeight: typography.styles.titlePage.fontWeight(),
	},
	mainContent: {
		alignItems: "flex-end",
		gap: sizes.space[16],
	},
	checkBox: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		alignSelf: "flex-start",
	},
	socialContainer: {
		gap: sizes.space[16],
	},
	continueWith: {
		flexDirection: "row",
		alignItems: "center",
		gap: sizes.space[8],
	},
	socialsContainer: {
		flexDirection: "row",
	},
	accountContainer: {
		flexDirection: "row",
		gap: sizes.space[8],
	},
});
