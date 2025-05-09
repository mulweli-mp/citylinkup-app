import { Colours } from "@/constants/Colours";

export function useThemeColour() {
	// const theme = useColorScheme() ?? "light";
	const theme = "light";

	return Colours[theme];
}
