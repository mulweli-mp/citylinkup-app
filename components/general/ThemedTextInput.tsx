import { ThemedText } from "@/components/general/ThemedText";
import { DEVICE_HEIGHT } from "@/constants/Dimensions";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Entypo } from "@expo/vector-icons";
import React, { JSX, useState } from "react";
import {
	InputModeOptions,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

type Props = {
	placeholder: string;
	value: string;
	onChangeText: (value: string) => void;
	Icon: JSX.Element;
	inputMode?: InputModeOptions;
	passwordInput?: boolean;
};

export function ThemedTextInput({
	placeholder,
	value,
	onChangeText,
	Icon,
	inputMode,
	passwordInput,
}: Props) {
	const colors = useThemeColor();

	const [hidePassword, setHidePassword] = useState(true);
	const toogleHodePassword = () => {
		setHidePassword((prev) => !prev);
	};

	return (
		<View
			style={[
				styles.inputMain,
				{
					marginTop: value ? 20 : 10,
				},
			]}
		>
			{value && (
				<View
					style={[
						styles.inputTitleSection,
						{
							backgroundColor: colors.background,
						},
					]}
				>
					<ThemedText type="subtitle">{placeholder}</ThemedText>
				</View>
			)}
			<View style={styles.inputContainer}>
				<View style={styles.iconSection}>{Icon}</View>
				<TextInput
					style={[
						styles.textInputStyle,
						{
							color: colors.foreground,
						},
					]}
					placeholder={placeholder}
					placeholderTextColor={"grey"}
					value={value}
					onChangeText={(text) => onChangeText(text)}
					inputMode={inputMode}
					secureTextEntry={passwordInput ? hidePassword : false}
				/>

				{passwordInput && (
					<TouchableOpacity
						style={styles.iconSection}
						onPress={toogleHodePassword}
					>
						{hidePassword ? (
							<Entypo name="eye" size={24} color={colors.foreground} />
						) : (
							<Entypo
								name="eye-with-line"
								size={24}
								color={colors.foreground}
							/>
						)}
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	inputMain: {
		// backgroundColor: "red",
	},
	inputContainer: {
		height: DEVICE_HEIGHT * 0.07,
		width: "90%",
		borderColor: "grey",
		borderWidth: 1,
		borderRadius: 7,
		flexDirection: "row",
	},
	iconSection: {
		height: "100%",
		width: "15%",
		// backgroundColor: "blue",
		justifyContent: "center",
		alignItems: "center",
	},
	textInputStyle: {
		// backgroundColor: "pink",
		flex: 1,
		paddingHorizontal: 10,
		fontSize: 18,
	},

	inputTitleSection: {
		position: "absolute",
		minHeight: 30,
		top: -30 / 2,
		left: 10,
		zIndex: 1,
		padding: 5,
	},
});
