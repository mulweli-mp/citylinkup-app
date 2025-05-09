import { router } from "expo-router";
import { Button, Image, View } from "react-native";

export default function Index() {
	return (
		<View
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
			<Button
				title="Go To Login"
				onPress={() => router.navigate("./auth/login")}
			/>
			<Button
				title="Go To SignUp"
				onPress={() => router.navigate("./auth/signup")}
			/>
		</View>
	);
}
