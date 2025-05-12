import { ThemedView } from "@/components/general/ThemedView";
import { DEVICE_HEIGHT } from "@/constants/Dimensions";
import { ActiveTabType } from "@/context/HomeTabsContext";
import useFontScale from "@/hooks/useFontScale";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import {
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

type Props = {
	activeTab: string;
	switchTab: (tabName: ActiveTabType) => void;
};

const tabItems = [
	{
		key: "Home",
		label: "Home",
		icon: (color: string) => (
			<FontAwesome name="home" size={24} color={color} />
		),
	},
	{
		key: "Rides",
		label: "Rides",
		icon: (color: string) => (
			<Feather name="trending-up" size={24} color={color} />
		),
	},
	{
		key: "Account",
		label: "Account",
		icon: (color: string) => <Ionicons name="people" size={24} color={color} />,
	},
];

export default function BottomTabBar({ activeTab, switchTab }: Props) {
	const fontSizeCategory = useFontScale();
	const colors = useThemeColor();

	const backgroundColor =
		colors.themeName === "dark" ? "#1c1c1e" : colors.primary;
	const activeIconContainerBgColour =
		colors.themeName === "dark" ? "rgba(27, 23, 23, 0.8)" : "white";

	const renderTab = (
		key: ActiveTabType,
		label: string,
		icon: (color: string) => React.ReactNode
	) => {
		const isActive = activeTab === key;
		const containerColor = isActive ? activeIconContainerBgColour : undefined;
		const iconColor = isActive ? colors.primary : "white";

		return (
			<TouchableOpacity
				key={key}
				onPress={() => switchTab(key)}
				style={styles.drawerIcon}
			>
				<View
					style={[styles.iconContainer, { backgroundColor: containerColor }]}
				>
					{icon(iconColor)}
				</View>
				{fontSizeCategory !== "larger" && (
					<Text style={styles.tabNameText}>{label}</Text>
				)}
			</TouchableOpacity>
		);
	};

	return (
		<ThemedView style={[styles.container, { backgroundColor }]}>
			<StatusBar backgroundColor={colors.primary} />
			{tabItems.map(({ key, label, icon }) =>
				renderTab(key as ActiveTabType, label, icon)
			)}
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		height: DEVICE_HEIGHT * 0.09,
		width: "100%",
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	drawerIcon: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 5,
	},
	iconContainer: {
		height: DEVICE_HEIGHT * 0.05,
		width: DEVICE_HEIGHT * 0.05,
		borderRadius: (DEVICE_HEIGHT * 0.05) / 2,
		justifyContent: "center",
		alignItems: "center",
	},
	tabNameText: {
		fontSize: 11,
		color: "white",
	},
});
