import { UserProvider } from "@/context/UserContext";
import { useThemeColour } from "@/hooks/useThemeColour";
import { Stack } from "expo-router";

export default function RootLayout() {
	const colors = useThemeColour();

	return (
		<UserProvider>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			></Stack>
		</UserProvider>
	);
}
