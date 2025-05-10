import { Colors } from "@/constants/Colors";

export function useThemeColor() {
	// const theme = useColorScheme() ?? "light";
	const theme = "light";

	return Colors[theme];
}
