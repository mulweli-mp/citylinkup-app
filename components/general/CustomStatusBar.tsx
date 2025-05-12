import { useThemeColor } from "@/hooks/useThemeColor";
import { StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomStatusBar() {
	const insets = useSafeAreaInsets();
	const colors = useThemeColor();
	const backgroundColor =
		colors.themeName === "dark" ? "#1c1c1e" : colors.primary;

	return (
		<View
			style={{
				height: insets.top,
				width: "100%",
				backgroundColor,
				zIndex: 1,
			}}
		>
			<StatusBar barStyle={"light-content"} />
		</View>
	);
}
