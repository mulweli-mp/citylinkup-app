import { useEffect, useState } from "react";
import { AccessibilityInfo, PixelRatio } from "react-native";

type FontSizeCategory = "smaller" | "normal" | "larger";

const getFontSizeCategory = (scale: number): FontSizeCategory => {
	if (scale < 1) return "smaller";
	if (scale === 1) return "normal";
	return "larger";
};

const useFontScale = () => {
	const [fontSizeCategory, setFontSizeCategory] = useState<FontSizeCategory>(
		getFontSizeCategory(PixelRatio.getFontScale())
	);

	useEffect(() => {
		const updateFontScale = () => {
			setFontSizeCategory(getFontSizeCategory(PixelRatio.getFontScale()));
		};

		const subscription = AccessibilityInfo.addEventListener(
			"screenReaderChanged",
			updateFontScale
		);

		return () => {
			subscription?.remove();
		};
	}, []);

	return fontSizeCategory;
};

export default useFontScale;
