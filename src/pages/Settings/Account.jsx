import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import AvatarBlock from "../../components/Avatars/AvatarBlock";
import UpperNavigationBack from "../../components/Navigation/UpperNavigationBack";
import InputField from "../../components/Inputs/InputField";
import { sizes } from "../../utils/design";

export default function Account({ route  }) {
	const usernameRef = useRef(null);
	const emailRef = useRef(null);

    const { user } = route.params;


	return (
		<View style={styles.container}>
			<UpperNavigationBack
				type="back"
				heading="Account"
				showNext={false}
				showBack={true}
			/>
			<View style={styles.mainContent}>
				<AvatarBlock
					layout="centered"
					showDescription={false}
					name="Upload Image"
                    avatarUri={user.profilePicture}
				/>

				<View style={styles.inputWrapper}>
					<InputField
						ref={usernameRef}
						state="Default"
						valueType="default"
						hasLabel={true}
						label="Username"
						value={user.username}
						// onChangeText={setEmail}
					/>
				</View>
				<View style={styles.inputWrapper}>
					<InputField
						ref={emailRef}
						state="Default"
						valueType="default"
						hasLabel={true}
						label="Email"
						value={user.email}
						// onChangeText={setEmail}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
    mainContent: {
        paddingVertical: sizes.space[16],
        paddingHorizontal: sizes.space[8],
        gap: sizes.space[16],
    },
	inputWrapper: {
		flexDirection: "row",
		width: "100%",
	},
});
