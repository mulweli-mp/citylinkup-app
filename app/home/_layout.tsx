import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import CustomDrawer from "@/components/navigation/CustomDrawer";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
	const colorScheme = useColorScheme();

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Drawer
					screenOptions={{
						headerShown: false,
					}}
					drawerContent={() => <CustomDrawer />}
				>
					<Drawer.Screen
						name="index"
						options={{
							drawerLabel: "Home",
							title: "Home",
						}}
					/>
				</Drawer>
			</GestureHandlerRootView>
		</ThemeProvider>
	);
}
