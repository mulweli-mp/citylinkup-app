import { ThemedView } from "@/components/general/ThemedView";
import { DEVICE_HEIGHT } from "@/constants/Dimensions";
import { ActiveTabType } from "@/context/HomeTabsContext";
import useFontScale from "@/hooks/useFontScale";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import {
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

type props = {
	activeTab: string;
	switchTab: (tabName: ActiveTabType) => void;
};

export default function BottomTabBar(props: props) {
	const fontSizeCategory = useFontScale();

	const { activeTab, switchTab } = props;
	const colors = useThemeColor();

	const router = useRouter();
	const navigation = useNavigation();

	const toggleDrawer = () => {
		navigation.dispatch(DrawerActions.toggleDrawer());
	};

	return (
		<ThemedView
			style={[
				styles.container,
				{
					backgroundColor: colors.primary,
				},
			]}
		>
			<StatusBar backgroundColor={colors.primary} />
			<TouchableOpacity
				onPress={() => switchTab("Home")}
				style={styles.drawerIcon}
			>
				<View
					style={[
						styles.iconContainer,
						{
							backgroundColor:
								activeTab === "Home" ? colors.background : colors.primary,
						},
					]}
				>
					<FontAwesome
						name="home"
						size={24}
						color={activeTab === "Home" ? colors.primary : colors.background}
					/>
				</View>
				{fontSizeCategory !== "larger" && (
					<Text style={styles.tabNameText}>Home</Text>
				)}
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => switchTab("Rides")}
				style={styles.drawerIcon}
			>
				<View
					style={[
						styles.iconContainer,
						{
							backgroundColor:
								activeTab === "Rides" ? colors.background : colors.primary,
						},
					]}
				>
					<Feather
						name="trending-up"
						size={24}
						color={activeTab === "Rides" ? colors.primary : colors.background}
					/>
				</View>
				{fontSizeCategory !== "larger" && (
					<Text style={styles.tabNameText}>Rides</Text>
				)}
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => switchTab("Account")}
				style={styles.drawerIcon}
			>
				<View
					style={[
						styles.iconContainer,
						{
							backgroundColor:
								activeTab === "Account" ? colors.background : colors.primary,
						},
					]}
				>
					<Ionicons
						name="people"
						size={24}
						color={activeTab === "Account" ? colors.primary : colors.background}
					/>
				</View>
				{fontSizeCategory !== "larger" && (
					<Text style={styles.tabNameText}>Account</Text>
				)}
			</TouchableOpacity>
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
