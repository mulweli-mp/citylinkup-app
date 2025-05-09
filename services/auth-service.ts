import axios from "axios";

const AUTH_URL = `${process.env.EXPO_PUBLIC_BASE_URL}/auth`;

export type RegistrationType = {
	first_name: string;
	surname: string;
	phone_number: string;
	password: string;
};
export type LoginType = {
	phone_number: string;
	password: string;
};

export const registerUser = async (userData: RegistrationType) => {
	const API_URL = `${AUTH_URL}/register`;

	try {
		const response = await axios.post(API_URL, userData);
		return response.data;
	} catch (error: any) {
		console.log("Registration failed:", error.response?.data || error.message);
		throw error;
	}
};

export const loginUser = async (userData: LoginType) => {
	const API_URL = `${AUTH_URL}/login`;

	try {
		const response = await axios.post(API_URL, userData);
		return response.data;
	} catch (error: any) {
		console.log("Login failed:", error.response?.data || error.message);
		throw error;
	}
};

export const validateToken = async (token: string) => {
	const API_URL = `${AUTH_URL}/validate`;

	try {
		const response = await axios.get(API_URL, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data; // { valid: true, user: { userId: ... } }
	} catch (error: any) {
		console.log(
			"Token validation failed:",
			error.response?.data || error.message
		);
		throw error;
	}
};
