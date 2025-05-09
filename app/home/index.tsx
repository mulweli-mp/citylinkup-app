import { ThemedText } from "@/components/general/ThemedText";
import { ThemedView } from "@/components/general/ThemedView";
import { UserContext } from "@/context/UserContext";
import { router } from "expo-router";
import { useContext } from "react";
import { Button, Image } from "react-native";

export default function Home() {
	const { userProfile } = useContext(UserContext);
	const onLogOut = () => {
		router.replace("/auth/login");
	};

	return (
		<ThemedView
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Image
				source={require("@/assets/images/countryside.jpg")}
				style={{
					height: 200,
					width: 200,
					borderRadius: 200 / 2,
					marginBottom: 20,
				}}
				resizeMode="cover"
			/>
			<ThemedText type="title">
				Hello {userProfile.firstName} {userProfile.surname}
			</ThemedText>
			<ThemedText type="subtitle"> {userProfile.phoneNumber}</ThemedText>
			<Button title="Log Out" onPress={onLogOut} />
		</ThemedView>
	);
}
