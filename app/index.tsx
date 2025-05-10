import { ThemedView } from "@/components/general/ThemedView";
import { UserContext } from "@/context/UserContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { validateToken } from "@/services/auth-service";
import { getStoredUser } from "@/utilities/auth";
import { router } from "expo-router";
import { useContext, useEffect } from "react";
import { ActivityIndicator, Image } from "react-native";

export default function Index() {
	const colors = useThemeColor();
	const { updateUserProfile } = useContext(UserContext);

	const onMount = async () => {
		try {
			const storedUserData = await getStoredUser();
			if (storedUserData) {
				const { firstName, surname, phoneNumber, userId, authToken } =
					storedUserData;
				const tokenResult = await validateToken(authToken);
				if (tokenResult.valid) {
					updateUserProfile({ firstName, surname, phoneNumber, userId });
					router.replace("/home");
				} else {
					router.replace("/auth/login");
				}
			} else {
				router.replace("/auth/login");
			}
		} catch (error) {
			alert("Failed to fetch stored data");
			throw error;
		}
	};

	useEffect(() => {
		//This process takes miliseconds but a 1 second delay is implimented to enhance user experience
		setTimeout(() => {
			onMount();
		}, 1000);
	}, []);
	return (
		<ThemedView
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Image
				source={require("@/assets/images/logo.png")}
				style={{
					height: 200,
					width: 200,
				}}
			/>
			<ActivityIndicator size={"large"} color={colors.primary} />
		</ThemedView>
	);
}
