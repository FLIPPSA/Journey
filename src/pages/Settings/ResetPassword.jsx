import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import UpperNavigationBack from "../../components/Navigation/UpperNavigationBack";
import Button from "../../components/Buttons/Button";
import InputField from "../../components/Inputs/InputField";
import { sizes } from "../../utils/design";

export default function ResetPassword() {
	const currentPasswordRef = useRef(null);
	const newPasswordRef = useRef(null);
	const reEnterNewPasswordRef = useRef(null);

	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [reEnterNewPassword, setReEnterNewPassword] = useState("");

	return (
		<View style={styles.container}>
			<UpperNavigationBack
				type="back"
				heading="Settings"
				showBack={true}
			/>

			<View style={styles.mainContentContainer}>
				<View style={styles.inputWrapper}>
					<InputField
						ref={currentPasswordRef}
						state="Default"
						valueType="default"
						hasLabel={true}
						label="Enter Current Password"
						value={currentPassword}
						editable={false}
						onChangeText={setCurrentPassword}
					/>
				</View>
				<View style={styles.inputWrapper}>
					<InputField
						ref={newPasswordRef}
						state="Default"
						valueType="default"
						hasLabel={true}
						label="Enter New Password"
						value={newPassword}
						editable={false}
						onChangeText={setNewPassword}
					/>
				</View>
				<View style={styles.inputWrapper}>
					<InputField
						ref={reEnterNewPasswordRef}
						state="Default"
						valueType="default"
						hasLabel={true}
						label="Enter New Password"
						value={reEnterNewPassword}
						editable={false}
						onChangeText={setReEnterNewPassword}
					/>
				</View>

				<View style={styles.buttonWrapper}>
					<Button
						variant="primary"
						state="default"
						size="medium"
						label="Set New Password"
						onPress={async () =>
							await handleLogIn(
								navigation,
								setUser,
								email,
								password
							)
						}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
	mainContentContainer: {
		gap: sizes.space[16],
		paddingVertical: sizes.space[16],
		paddingHorizontal: sizes.space[8],
	},
	inputWrapper: {
		flexDirection: "row",
		width: "100%",
	},
	buttonWrapper: {
        marginTop: sizes.space[16],
		flexDirection: "row",
	},
});
