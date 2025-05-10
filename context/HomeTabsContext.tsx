import { createContext, ReactNode, useState } from "react";

type ContextType = {
	activeTab: ActiveTabType;
	updateActiveTab: (newData: ActiveTabType) => void;
	refreshBeneficiaryTab: boolean;
	onRefreshBeneficiaryTab: () => void;
	refreshTransactionsTab: boolean;
	onRefreshTransactionsTab: () => void;
};

export type ActiveTabType = "Account" | "Rides" | "Home";

export const HomeTabsContext = createContext<ContextType>({
	activeTab: "Home",
	updateActiveTab: () => {},
	refreshBeneficiaryTab: false,
	onRefreshBeneficiaryTab: () => {},
	refreshTransactionsTab: false,
	onRefreshTransactionsTab: () => {},
});

type ProviderProps = {
	children: ReactNode;
};

export const HomeTabsProvider = ({ children }: ProviderProps) => {
	const [activeTab, setActiveTab] = useState<ActiveTabType>("Home");
	const [refreshBeneficiaryTab, setRefreshBeneficiaryTab] = useState(false);
	const [refreshTransactionsTab, setRefreshTransactionsTab] = useState(false);

	const updateActiveTab = (newData: ActiveTabType) => {
		setActiveTab(newData);
	};

	const onRefreshBeneficiaryTab = () => {
		setRefreshBeneficiaryTab(true);
		setTimeout(() => {
			setRefreshBeneficiaryTab(false);
		}, 3000);
	};

	const onRefreshTransactionsTab = () => {
		setRefreshTransactionsTab(true);
		setTimeout(() => {
			setRefreshTransactionsTab(false);
		}, 3000);
	};

	return (
		<HomeTabsContext.Provider
			value={{
				activeTab,
				updateActiveTab,
				refreshBeneficiaryTab,
				onRefreshBeneficiaryTab,
				refreshTransactionsTab,
				onRefreshTransactionsTab,
			}}
		>
			{children}
		</HomeTabsContext.Provider>
	);
};
