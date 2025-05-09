import { ThemedView } from "@/components/general/ThemedView";
import { useThemeColour } from "@/hooks/useThemeColour";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image } from "react-native";

export default function Index() {
	const colors = useThemeColour();

	useEffect(() => {
		//To do:
		//Add a function to check if the user is logged out or not
		setTimeout(() => {
			const isSignedIn = false;

			if (isSignedIn) {
				router.replace("./home");
			} else {
				router.replace("./auth/login");
			}
		}, 2000);
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
