import { ThemedText } from "@/components/general/ThemedText";
import { ThemedView } from "@/components/general/ThemedView";

export default function Account() {
	return (
		<ThemedView
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<ThemedText>Account Screen</ThemedText>
		</ThemedView>
	);
}
