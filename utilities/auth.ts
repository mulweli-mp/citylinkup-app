import * as SecureStore from "expo-secure-store";

export type StoredUserType = {
	firstName: string;
	surname: string;
	phoneNumber: string;
	userId: string;
	authToken: string;
};
export const getStoredUser = async () => {
	try {
		const result = await SecureStore.getItemAsync("userData");
		return result ? JSON.parse(result) : null;
	} catch (error) {
		return null;
	}
};

export const setStoredUser = async (userData: StoredUserType | null) => {
	try {
		await SecureStore.setItemAsync("userData", JSON.stringify(userData));
	} catch (error) {
		throw error;
	}
};
