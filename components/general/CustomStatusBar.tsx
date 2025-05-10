import { useThemeColor } from "@/hooks/useThemeColor";
import { View, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomStatusBar() {
	const insets = useSafeAreaInsets();
	const colors = useThemeColor();

	return (
		<View
			style={{
				height: insets.top,
				width: "100%",
				backgroundColor: colors.primary,
				zIndex: 1,
			}}
		>
			<StatusBar barStyle={"dark-content"} />
		</View>
	);
}
