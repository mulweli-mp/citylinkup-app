import { useThemeColour } from "@/hooks/useThemeColour";
import { StyleSheet, Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
	lightColor?: string;
	darkColor?: string;
	type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
	allowFontScaling?: boolean;
};

export function ThemedText({
	style,
	lightColor,
	darkColor,
	type = "default",
	allowFontScaling,
	...rest
}: ThemedTextProps) {
	const colors = useThemeColour();

	return (
		<Text
			allowFontScaling={allowFontScaling === false ? false : true}
			style={[
				{ color: colors.foreground },
				type === "default" ? styles.default : undefined,
				type === "title" ? styles.title : undefined,
				type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
				type === "subtitle" ? styles.subtitle : undefined,
				type === "link" ? styles.link : undefined,
				style,
			]}
			{...rest}
		/>
	);
}

const styles = StyleSheet.create({
	default: {
		lineHeight: 24,
	},
	defaultSemiBold: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: "600",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},
	subtitle: {
		fontWeight: "bold",
		fontSize: 16,
	},
	link: {
		lineHeight: 30,
		fontSize: 16,
		color: "#0a7ea4",
		textDecorationLine: "underline",
	},
});
