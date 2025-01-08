import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useRef, useState } from "react";
import { colors, typography, sizes } from "../../utils/design";
import Logo from "../../components/Brand/Logo";
import InputField from "../../components/Inputs/InputField";
import Link from "../../components/Navigation/Link";
import CheckboxField from "../../components/Inputs/CheckboxField";
import Button from "../../components/Buttons/Button";
import Divider from "../../components/Utility/Divider";
import Socials from "../../components/Icons/Socials";
import UserContext from "../../utils/authentication";
import { handleLogIn } from "../../utils/common";

export default function Login({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setUser } = useContext(UserContext);

	const passwordRef = useRef(null);
	const emailRef = useRef(null);

	return (
		<View style={styles.container}>
			<Logo showText={false} />

			<Text style={styles.loginText}>Log In</Text>

			<View style={styles.mainContent}>
				<View style={styles.inputWrapper}>
					<InputField
						ref={emailRef}
						state="Default"
						valueType="default"
						hasLabel={true}
						label="Email"
						value={email}
						onChangeText={setEmail}
					/>
				</View>
				<View style={styles.inputWrapper}>
					<InputField
						ref={passwordRef}
						state="default"
						valueType="default"
						hasLabel={true}
						label="Password"
						rightIcon={"eye-off"}
						value={password}
						onChangeText={setPassword}
					/>
				</View>
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

			<View style={styles.buttonWrapper}>
				<Button
					variant="primary"
					state="default"
					size="medium"
					label="Log In"
					onPress={async () =>
						await handleLogIn(navigation, setUser, email, password)
					}
				/>
			</View>

			<View style={styles.socialContainer}>
				<View style={styles.continueWith}>
					<Divider vertical={false} />
					<Text>or continue with</Text>
					<Divider vertical={false} />
				</View>
				<View style={styles.socialsContainer}>
					<Socials name={"Facebook"} />
					<Socials name={"Google"} />
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
	loginText: {
		fontSize: typography.styles.titlePage.sizes.base(),
		fontFamily: typography.styles.titlePage.fontFamily(),
		fontWeight: typography.styles.titlePage.fontWeight(),
	},
	mainContent: {
		alignItems: "flex-end",
		width: "100%",
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
		alignItems: "center",
		justifyContent: "flex-start",
	},
	continueWith: {
		flexDirection: "row",
		alignItems: "center",
		gap: sizes.space[8],
		width: "100%", // Ensure it spans the full width of the container
	},
	socialsContainer: {
		flexDirection: "row",
		gap: sizes.space[24],
	},
	accountContainer: {
		flexDirection: "row",
		gap: sizes.space[8],
	},
	inputWrapper: {
		flexDirection: "row",
	},
	buttonWrapper: {
		flexDirection: "row",
	},
});
