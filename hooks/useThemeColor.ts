import { Colors } from "@/constants/Colors";

export function useThemeColor() {
	// const theme = useColorScheme() ?? "light";
	const theme = "light";
	// const theme = "dark";

	return Colors[theme];
}
