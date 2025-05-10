import { ThemedText } from "@/components/general/ThemedText";
import { ThemedView } from "@/components/general/ThemedView";

export default function Home() {
	return (
		<ThemedView
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<ThemedText>Home Screen</ThemedText>
		</ThemedView>
	);
}
