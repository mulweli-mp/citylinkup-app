import {
	AntDesign,
	Entypo,
	FontAwesome5,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import {
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";

import { ThemedText } from "@/components/general/ThemedText";
import { ThemedView } from "@/components/general/ThemedView";
import { DEVICE_HEIGHT } from "@/constants/Dimensions";
import { ActiveTabType, HomeTabsContext } from "@/context/HomeTabsContext";
import { initialData, UserContext } from "@/context/UserContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { setStoredUser } from "@/utilities/auth";
import { JSX, useContext } from "react";
import CustomStatusBar from "../general/CustomStatusBar";

type MenuOption = {
	optionName: string;
	key: string;
	navigationScreen?: any;
	icon: JSX.Element;
	params?: Record<"selectedTab", ActiveTabType>;
};

const appVersion = "1.0.0";

export default function CustomDrawer() {
	const colors = useThemeColor();
	const { userProfile, updateUserProfile } = useContext(UserContext);
	const { updateActiveTab } = useContext(HomeTabsContext);

	const menuOptions: MenuOption[] = [
		{
			optionName: "Home",
			key: "home",
			navigationScreen: "/home",
			icon: (
				<MaterialCommunityIcons
					name="home-heart"
					size={32}
					color={colors.primary}
				/>
			),
			params: { selectedTab: "Home" },
		},

		{
			optionName: "My Rides",
			key: "rides",
			icon: <FontAwesome5 name="car" size={24} color={colors.primary} />,
		},
		{
			optionName: "Support",
			key: "support",
			icon: (
				<MaterialIcons name="wifi-calling-3" size={24} color={colors.primary} />
			),
		},
		{
			optionName: "Safety",
			key: "help",
			navigationScreen: "/home/on-boarding",
			icon: <AntDesign name="Safety" size={24} color={colors.primary} />,
		},

		{
			optionName: "Sign Out",
			key: "sign-out",
			icon: <MaterialIcons name="logout" size={24} color={colors.primary} />,
		},
	];

	const switchTab = (tabName: ActiveTabType) => {
		updateActiveTab(tabName);
	};

	const onLogOut = () => {
		updateUserProfile(initialData);
		setStoredUser(null);
		router.replace("/auth/login");
	};
	return (
		<ThemedView style={styles.container}>
			<CustomStatusBar />
			<View style={styles.profileContainer}>
				<Image
					source={require("@/assets/images/default-profile.jpg")}
					style={styles.profileImage}
				/>
				<View style={styles.profileDetails}>
					<ThemedText style={styles.detailsText}>
						{userProfile.firstName} {userProfile.surname}
					</ThemedText>
					<ThemedText style={styles.usernameText}>
						{userProfile.surname}
					</ThemedText>
				</View>
			</View>
			<ScrollView
				style={styles.scrollViewContainer}
				contentContainerStyle={styles.scrollContentContainer}
			>
				{menuOptions.map(
					({ optionName, key, icon, navigationScreen, params }, index) => (
						<TouchableOpacity
							onPress={() => {
								if (key === "sign-out") {
									onLogOut();
								} else {
									router.navigate({
										pathname: navigationScreen,
									});

									if (params) {
										switchTab(params.selectedTab);
									}
								}
							}}
							key={key + index}
							style={[
								styles.menuButton,
								{
									backgroundColor:
										colors.themeName == "light" ? "white" : colors.background,
								},
							]}
						>
							{icon}
							<ThemedText style={styles.menuTitleText}>{optionName}</ThemedText>
							<Entypo
								name="chevron-small-right"
								size={24}
								color={colors.primary}
							/>
						</TouchableOpacity>
					)
				)}
			</ScrollView>
			<View style={styles.appVersionContainer}>
				<ThemedText style={styles.versionText}>{appVersion}</ThemedText>
			</View>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	scrollViewContainer: {
		width: "100%",
	},
	scrollContentContainer: {
		paddingBottom: 20,
	},
	menuButton: {
		minHeight: DEVICE_HEIGHT * 0.06,
		width: "95%",
		marginTop: 7,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 15,
		borderRadius: 5,
		// backgroundColor: "white",
		elevation: 1,
		alignSelf: "center",
	},
	menuTitleText: {
		fontWeight: "bold",
		fontSize: 17,
		marginLeft: 10,
		flex: 1,
	},
	profileContainer: {
		minHeight: DEVICE_HEIGHT * 0.09,
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
	},
	profileImage: {
		backgroundColor: "grey",
		height: DEVICE_HEIGHT * 0.04,
		width: DEVICE_HEIGHT * 0.04,
		borderRadius: (DEVICE_HEIGHT * 0.04) / 2,
		marginLeft: 15,
		marginRight: 5,
	},
	profileDetails: {
		justifyContent: "center",

		flex: 1,
	},
	detailsText: {
		fontWeight: "bold",
	},
	appVersionContainer: {
		width: "95%",
		height: 60,
		marginTop: 10,
	},
	versionText: {
		fontSize: 10,
		margin: 7,
	},
	usernameText: {
		fontWeight: "500",
	},
});
