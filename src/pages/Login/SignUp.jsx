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
import { handleSignUp } from "../../utils/common";

export default function SignUp({ navigation }) {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setUser } = useContext(UserContext);

	const fullNameRef = useRef(null);
	const passwordRef = useRef(null);
	const emailRef = useRef(null);

	return (
		<View style={styles.container}>
			<Logo showText={false} />

			<Text style={styles.signUpText}>Sign Up</Text>

			<View style={styles.mainContent}>
				<View style={styles.inputWrapper}>
					<InputField
						ref={fullNameRef}
						state="Default"
						valueType="default"
						hasLabel={true}
						label="Full Name"
						value={username}
						onChangeText={setUsername}
					/>
				</View>
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
				</View>
			</View>

			<View style={styles.buttonWrapper}>
				<Button
					variant="primary"
					state="default"
					size="medium"
					label="SignUp"
					onPress={async () =>
						await handleSignUp(
							navigation,
							setUser,
							email,
							password,
							username
						)
					}
				/>
			</View>

			<View style={styles.socialContainer}>
				<View style={styles.continueWith}>
					<Divider />
					<Text>or continue with</Text>
					<Divider />
				</View>
				<View style={styles.socialsContainer}>
					<Socials name={"Facebook"} />
					<Socials name={"Google"} />
				</View>
			</View>

			<View style={styles.accountContainer}>
				<Text>Have an account?</Text>
				<Link
					variant="Brand"
					state="Default"
					size="Medium"
					label="Log In"
					onPress={() => navigation.navigate("Login")}
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
		alignItems: "center",
		justifyContent: "flex-start",
	},
	continueWith: {
		flexDirection: "row",
		alignItems: "center",
		gap: sizes.space[8],
		width: "100%",
	},
	socialsContainer: {
		flexDirection: "row",
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
