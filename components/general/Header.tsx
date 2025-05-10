import { ThemedView } from "@/components/general/ThemedView";
import { DEVICE_HEIGHT } from "@/constants/Dimensions";
import { useThemeColor } from "@/hooks/useThemeColor";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { DrawerActions } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import React from "react";
import CustomStatusBar from "./CustomStatusBar";
import { ThemedText } from "./ThemedText";

type props = {
	title?: string;
	type?: "homeHeader" | "default";
	subTitle?: string | null;
	closeButton?: () => void;
};

export default function Header(props: props) {
	const { title, type, subTitle, closeButton } = props;
	const colors = useThemeColor();

	const router = useRouter();
	const navigation = useNavigation();

	const toggleDrawer = () => {
		navigation.dispatch(DrawerActions.toggleDrawer());
	};

	const onPress = () => {
		if (closeButton) {
			closeButton();
		} else if (type === "homeHeader") {
			toggleDrawer();
		} else {
			router.back();
		}
	};
	return (
		<>
			<CustomStatusBar />
			<ThemedView
				style={[
					styles.container,
					{
						backgroundColor: colors.primary,
					},
				]}
			>
				<TouchableOpacity onPress={onPress} style={styles.backArrow}>
					{type === "homeHeader" ? (
						<Ionicons name={"menu"} size={24} color={"white"} />
					) : closeButton ? (
						<AntDesign name="close" size={24} color="white" />
					) : (
						<Ionicons name="arrow-back-outline" size={24} color={"white"} />
					)}
				</TouchableOpacity>
				{title === "AppLogo" ? (
					<Image
						source={require("@/assets/images/logo.png")}
						style={{
							height: 60,
							width: 120,
						}}
						resizeMode="contain"
					/>
				) : (
					<ThemedText style={styles.titleText} type="title">
						{title}
					</ThemedText>
				)}
			</ThemedView>
			{subTitle && (
				<View
					style={[
						styles.subHeader,
						{
							backgroundColor: colors.primary,
						},
					]}
				>
					<ThemedText style={styles.headerText}>{subTitle}</ThemedText>
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		height: DEVICE_HEIGHT * 0.09,
		width: "100%",
		backgroundColor: "red",
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
		zIndex: 1,
	},
	backArrow: {
		height: "70%",
		width: DEVICE_HEIGHT * 0.07,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		left: 5,
	},
	titleText: {
		color: "white",
	},
	subHeader: {
		minHeight: DEVICE_HEIGHT * 0.05,
		width: "100%",
		paddingLeft: 20,
	},
	headerText: {
		color: "white",
		fontSize: 19,
	},
});
