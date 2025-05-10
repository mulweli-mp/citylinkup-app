import { BottomTabBar, Header, ThemedView } from "@/components/general";
import { useContext, useEffect } from "react";

import { Account, Home, Rides } from "@/components/home";
import { ActiveTabType, HomeTabsContext } from "@/context/HomeTabsContext";
import { useLocalSearchParams } from "expo-router";

export default function () {
	const { selectedTab } = useLocalSearchParams<{
		selectedTab: ActiveTabType;
	}>();
	const { activeTab, updateActiveTab } = useContext(HomeTabsContext);

	const switchTab = (tabName: ActiveTabType) => {
		updateActiveTab(tabName);
	};

	useEffect(() => {
		if (selectedTab) {
			updateActiveTab(selectedTab);
		}
	}, []);

	const subTitleMap: Record<ActiveTabType, string> = {
		Rides: "Rides",
		Account: "Account",
		Home: "Home",
	};

	const subTitle = subTitleMap[activeTab as ActiveTabType] || null;

	return (
		<ThemedView
			style={{
				flex: 1,
			}}
		>
			{subTitle !== "Home" && <Header title="AppLogo" type="homeHeader" />}
			{activeTab === "Home" && <Home />}
			{activeTab === "Rides" && <Rides />}
			{activeTab === "Account" && <Account />}

			<BottomTabBar activeTab={activeTab} switchTab={switchTab} />
		</ThemedView>
	);
}
