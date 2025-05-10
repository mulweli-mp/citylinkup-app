import { HomeTabsProvider } from "@/context/HomeTabsContext";
import { UserProvider } from "@/context/UserContext";
import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<UserProvider>
			<HomeTabsProvider>
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				></Stack>
			</HomeTabsProvider>
		</UserProvider>
	);
}
