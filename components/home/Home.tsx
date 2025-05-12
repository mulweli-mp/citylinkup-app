import { CustomStatusBar, ThemedView } from "@/components/general";
import { darkMapStyle } from "@/constants/DarkMapStyle";
import { DEVICE_HEIGHT } from "@/constants/Dimensions";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import MapView, { Region } from "react-native-maps";

export default function Home() {
	const colors = useThemeColor();
	const backgroundColor =
		colors.themeName === "dark"
			? "rgba(27, 23, 23, 0.8)"
			: "rgba(255,255,255,0.8)";
	const [region, setRegion] = useState<Region | null>(null);

	const navigation = useNavigation();

	const toggleDrawer = () => {
		navigation.dispatch(DrawerActions.toggleDrawer());
	};

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch("https://ipwho.is/");
				const data = await res.json();

				if (!data.success)
					throw new Error(data.message || "Location fetch failed");

				const lat = parseFloat(data.latitude);
				const lon = parseFloat(data.longitude);

				setRegion({
					latitude: lat,
					longitude: lon,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				});
			} catch (err) {
				console.error("Failed to fetch location from IP:", err);
				// fallback to Gauteng
				setRegion({
					latitude: -26.088391,
					longitude: 28.048364,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				});
			}
		})();
	}, []);

	return (
		<>
			<CustomStatusBar />
			<ThemedView style={styles.container}>
				<TouchableOpacity
					style={[
						styles.menuButton,
						{
							backgroundColor,
						},
					]}
					onPress={toggleDrawer}
				>
					<Ionicons name={"menu"} size={24} color={colors.primary} />
				</TouchableOpacity>
				{region ? (
					<MapView
						style={styles.map}
						initialRegion={region}
						provider="google"
						customMapStyle={
							colors.themeName === "dark" ? darkMapStyle : undefined
						}
					/>
				) : (
					<View style={styles.container}>
						<ActivityIndicator size={"large"} color={colors.primary} />
					</View>
				)}
			</ThemedView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	map: {
		width: "100%",
		height: "100%",
	},
	menuButton: {
		height: DEVICE_HEIGHT * 0.07,
		width: DEVICE_HEIGHT * 0.07,
		borderRadius: (DEVICE_HEIGHT * 0.07) / 2,
		// backgroundColor: "rgba(255,255,255,0.8)",
		position: "absolute",
		top: 10,
		left: 10,
		zIndex: 1,
		justifyContent: "center",
		alignItems: "center",
		elevation: 10, // Android only
		shadowColor: "#000", // iOS
		shadowOffset: { width: 0, height: 5 }, // iOS
		shadowOpacity: 0.2, // iOS
		shadowRadius: 10, // iOS
	},
});
