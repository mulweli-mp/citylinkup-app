import { createContext, ReactNode, useState } from "react";

type UserProfileType = {
	firstName: string;
	surname: string;
	phoneNumber: string;
	userId: string;
};

type UserContextType = {
	userProfile: UserProfileType;
	updateUserProfile: (newData: Partial<UserProfileType>) => void;
};

export const initialData = {
	firstName: "",
	surname: "",
	phoneNumber: "",
	userId: "",
};

export const UserContext = createContext<UserContextType>({
	userProfile: initialData,
	updateUserProfile: () => {},
});

type UserProviderProps = {
	children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
	const [userProfile, setUserProfile] = useState<UserProfileType>(initialData);

	const updateUserProfile = (newData: Partial<UserProfileType>) => {
		setUserProfile((prevProfile) => ({ ...prevProfile, ...newData }));
	};

	return (
		<UserContext.Provider value={{ userProfile, updateUserProfile }}>
			{children}
		</UserContext.Provider>
	);
};
