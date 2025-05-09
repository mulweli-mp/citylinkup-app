import { View, type ViewProps } from "react-native";

import { useThemeColour } from "@/hooks/useThemeColour";

export type ThemedViewProps = ViewProps & {
	lightColor?: string;
	darkColor?: string;
};

export function ThemedView({
	style,
	lightColor,
	darkColor,
	...otherProps
}: ThemedViewProps) {
	const colors = useThemeColour();

	return (
		<View
			style={[{ backgroundColor: colors.background }, style]}
			{...otherProps}
		/>
	);
}
