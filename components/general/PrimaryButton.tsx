import {
	ActivityIndicator,
	StyleProp,
	StyleSheet,
	Text,
	TouchableOpacity,
	ViewStyle,
} from "react-native";

import { DEVICE_HEIGHT, DEVICE_WIDTH } from "@/constants/Dimensions";
import { useThemeColor } from "@/hooks/useThemeColor";

type propsType = {
	onPress: () => void;
	title: string;
	isLoading?: boolean;
	type?: "small";
	style?: StyleProp<ViewStyle>;
};

export default function PrimaryButton(props: propsType) {
	const { onPress, title, isLoading, style } = props;

	const colors = useThemeColor();

	return (
		<TouchableOpacity
			onPress={onPress}
			style={[
				styles.container,
				{
					backgroundColor: colors.primary,
				},
				style,
			]}
			disabled={isLoading}
		>
			{isLoading ? (
				<ActivityIndicator size={"small"} color={"white"} />
			) : (
				<Text style={styles.titleText}>{title}</Text>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 10,
		paddingHorizontal: 5,
		textAlign: "center",
		borderRadius: 50,
		width: DEVICE_WIDTH * 0.9,
		height: DEVICE_HEIGHT * 0.07,
	},
	titleText: {
		fontWeight: "700",
		color: "white",
		fontSize: 17,
	},
});
