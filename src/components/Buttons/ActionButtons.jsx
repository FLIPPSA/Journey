import { StyleSheet, Text, View } from "react-native";
import { sizes } from "../../utils/design";
import Button from "./Button";

export default function ActionButtons({ button1Text, button2Text, onApprovePress, onDenyPress, approveLoading, denyLoading }) {
	return (
		<View style={styles.container}>
			<Button
				variant="primary"
				state="default"
				size="small"
				label={"Approve"}
                onPress={onApprovePress}
                isLoading={approveLoading}
			/>
			<Button
				variant="tertiary"
				state="default"
				size="medium"
				label={"Deny"}
                onPress={onDenyPress}
                isLoading={denyLoading}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: sizes.space[8],
        flexDirection: 'row',
        flex: 1,
	},
});
