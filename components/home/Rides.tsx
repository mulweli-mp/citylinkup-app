import { ThemedText } from "@/components/general/ThemedText";
import { ThemedView } from "@/components/general/ThemedView";

export default function Rides() {
	return (
		<ThemedView
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<ThemedText>Rides Screen</ThemedText>
		</ThemedView>
	);
}
