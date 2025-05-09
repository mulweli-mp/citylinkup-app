import { useThemeColour } from "@/hooks/useThemeColour";
import { Stack } from "expo-router";

export default function RootLayout() {
	const colors = useThemeColour();

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				headerStyle: {
					backgroundColor: colors.background,
				},
				headerTintColor: colors.foreground,
				headerTitleStyle: {
					fontWeight: "bold",
				},
			}}
		></Stack>
	);
}
