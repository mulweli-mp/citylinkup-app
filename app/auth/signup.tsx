import PrimaryButton from "@/components/general/PrimaryButton";
import { ThemedText } from "@/components/general/ThemedText";
import { ThemedTextInput } from "@/components/general/ThemedTextInput";
import { ThemedView } from "@/components/general/ThemedView";
import { DEVICE_HEIGHT } from "@/constants/Dimensions";
import { useThemeColour } from "@/hooks/useThemeColour";
import {
	Entypo,
	FontAwesome,
	FontAwesome6,
	Octicons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

export default function SignUp() {
	const colors = useThemeColour();
	const [phoneNumber, setPhoneNumber] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [surname, setSurname] = useState("");

	const onCreateAccount = () => {
		alert("create account function coming soon");
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

				<View style={styles.inputsSection}>
					<ThemedTextInput
						placeholder="First Name"
						Icon={
							<Octicons
								name="person-fill"
								size={24}
								color={colors.foreground}
							/>
						}
						value={firstName}
						onChangeText={setFirstName}
					/>

					<ThemedTextInput
						placeholder="Surname"
						Icon={
							<FontAwesome6
								name="people-group"
								size={24}
								color={colors.foreground}
							/>
						}
						value={surname}
						onChangeText={setSurname}
					/>
					<ThemedTextInput
						placeholder="Phone Number"
						Icon={
							<FontAwesome name="phone" size={24} color={colors.foreground} />
						}
						value={phoneNumber}
						onChangeText={setPhoneNumber}
					/>

					<ThemedTextInput
						passwordInput
						placeholder="New Password"
						Icon={<Entypo name="lock" size={24} color={colors.foreground} />}
						value={newPassword}
						onChangeText={setNewPassword}
					/>
					<ThemedTextInput
						passwordInput
						placeholder="Confirm Password"
						Icon={<Entypo name="lock" size={24} color={colors.foreground} />}
						value={confirmPassword}
						onChangeText={setConfirmPassword}
					/>
				</View>
				<View style={styles.buttonsSection}>
					<PrimaryButton title="Create Account" onPress={onCreateAccount} />
					<View style={styles.newUserSection}>
						<ThemedText type="link" onPress={onBack}>
							Already have an account? Login
						</ThemedText>
					</View>
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
		height: DEVICE_HEIGHT * 0.3,
		width: "100%",
		// backgroundColor: "pink",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	logoStyle: {
		height: 200,
		width: 200,
	},
	inputsSection: {
		minHeight: DEVICE_HEIGHT * 0.2,
		width: "100%",
		// backgroundColor: "red",
		alignItems: "center",
	},
	buttonsSection: {
		height: DEVICE_HEIGHT * 0.4,
		width: "100%",
		// backgroundColor: "grey",
		alignItems: "center",
		paddingTop: 20,
	},

	fogortPasswordSection: {
		height: DEVICE_HEIGHT * 0.04,
		width: "90%",
		// backgroundColor: "red",
		justifyContent: "center",
		alignItems: "flex-end",
	},
	newUserSection: {
		height: DEVICE_HEIGHT * 0.04,
		width: "90%",
		// backgroundColor: "red",
		justifyContent: "center",
		alignItems: "center",
	},
});
