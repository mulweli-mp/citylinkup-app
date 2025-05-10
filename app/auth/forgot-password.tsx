import PrimaryButton from "@/components/general/PrimaryButton";
import { ThemedText } from "@/components/general/ThemedText";
import { ThemedTextInput } from "@/components/general/ThemedTextInput";
import { ThemedView } from "@/components/general/ThemedView";
import { DEVICE_HEIGHT } from "@/constants/Dimensions";
import { useThemeColor } from "@/hooks/useThemeColor";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

export default function Login() {
	const colors = useThemeColor();
	const [phoneNumber, setPhoneNumber] = useState("");

	const onResetPassword = () => {
		alert("Feature Coming Soon");
	};
	const onBack = () => {
		router.back();
	};

	return (
		<ThemedView>
			<ScrollView
				contentContainerStyle={styles.scrollContainer}
				style={styles.container}
			>
				<View style={styles.logoContainer}>
					<Image
						source={require("@/assets/images/logo.png")}
						style={styles.logoStyle}
					/>
				</View>
				<ThemedText type="title">
					Enter your phone number to reset password
				</ThemedText>
				<ThemedTextInput
					placeholder="Phone Number"
					Icon={
						<FontAwesome name="phone" size={24} color={colors.foreground} />
					}
					value={phoneNumber}
					onChangeText={setPhoneNumber}
				/>
				<PrimaryButton
					title="Reset Password"
					onPress={onResetPassword}
					style={{
						marginTop: 20,
					}}
				/>
				<View style={styles.goBackSection}>
					<ThemedText type="link" onPress={onBack}>
						Back to login
					</ThemedText>
				</View>
			</ScrollView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		height: DEVICE_HEIGHT,
		width: "100%",
		// backgroundColor: "green",
	},
	scrollContainer: {
		alignItems: "center",
	},
	logoContainer: {
		height: DEVICE_HEIGHT * 0.4,
		width: "100%",
		// backgroundColor: "pink",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	logoStyle: {
		height: 200,
		width: 200,
	},
	goBackSection: {
		height: DEVICE_HEIGHT * 0.04,
		width: "90%",
		// backgroundColor: "red",
		justifyContent: "center",
		alignItems: "center",
	},
});
