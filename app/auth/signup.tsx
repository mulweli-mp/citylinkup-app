import PrimaryButton from "@/components/general/PrimaryButton";
import { ThemedText } from "@/components/general/ThemedText";
import { ThemedTextInput } from "@/components/general/ThemedTextInput";
import { ThemedView } from "@/components/general/ThemedView";
import { DEVICE_HEIGHT } from "@/constants/Dimensions";
import { UserContext } from "@/context/UserContext";
import { useThemeColour } from "@/hooks/useThemeColour";
import { registerUser } from "@/services/auth-service";
import { setStoredUser, StoredUserType } from "@/utilities/auth";
import {
	Entypo,
	FontAwesome,
	FontAwesome6,
	Octicons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, View } from "react-native";

export default function SignUp() {
	const colors = useThemeColour();

	const { updateUserProfile } = useContext(UserContext);

	const [phoneNumber, setPhoneNumber] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [surname, setSurname] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const onCreateAccount = async () => {
		// Trim to avoid whitespace issues
		const trimmedFirstName = firstName.trim();
		const trimmedSurname = surname.trim();
		const trimmedPhone = phoneNumber.trim();
		const trimmedPassword = newPassword;
		const trimmedConfirmPassword = confirmPassword;

		// Basic field validations
		if (
			!trimmedFirstName ||
			!trimmedSurname ||
			!trimmedPhone ||
			!trimmedPassword ||
			!trimmedConfirmPassword
		) {
			Alert.alert("Validation Error", "All fields are required.");
			return;
		}

		// Phone number validation (basic, 10-13 digits)
		const phoneRegex = /^[0-9]{10,13}$/;
		if (!phoneRegex.test(trimmedPhone)) {
			Alert.alert("Validation Error", "Enter a valid phone number.");
			return;
		}

		// Password match
		if (trimmedPassword !== trimmedConfirmPassword) {
			Alert.alert("Validation Error", "Passwords do not match.");
			return;
		}

		// Password length
		if (trimmedPassword.length < 6) {
			Alert.alert(
				"Validation Error",
				"Password must be at least 6 characters long."
			);
			return;
		}

		// If all validations pass, proceed to register
		try {
			const data = {
				first_name: trimmedFirstName,
				surname: trimmedSurname,
				phone_number: trimmedPhone,
				password: trimmedPassword,
			};

			const result = await registerUser(data);
			const { first_name, surname, phone_number, user_id } = result.user;
			const userData = {
				firstName: first_name,
				surname,
				phoneNumber: phone_number,
				userId: user_id,
			};
			const userDataToStore: StoredUserType = {
				...userData,
				authToken: result.token,
			};
			updateUserProfile(userData);
			setStoredUser(userDataToStore);
			router.replace("/home");

			console.log(result);
		} catch (error: any) {
			Alert.alert(
				"Error",
				error.response?.data?.error || "Registration failed"
			);
		} finally {
			setIsLoading(false);
		}
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
					<PrimaryButton
						title="Create Account"
						onPress={onCreateAccount}
						isLoading={isLoading}
					/>
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
