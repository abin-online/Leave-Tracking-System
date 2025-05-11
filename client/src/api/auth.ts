import { type FormData as User } from "../entities/user";
import api from "./axiosInterceptors";
import { authRoutes } from "./endPoints";
import { type FormData } from "../entities/user";

export const userSignup = async (userData: User) => {
    try {
        const response = await api.post(authRoutes.signup, userData)
        return response.data
    } catch (error: any) {
        console.error('Error during signup request:', error.message);
        
        // If error is from API response, return the error details
        if (error.response) {
            console.error('API Response Error:', error.response.data);
            return error.response.data; // This could contain status and error messages from the API
        }

        // Return a generic error message if no response from API
        console.error('Unknown Error:', error);
    }
}

export const userLogin = async ({
    email,
    password,
    role,
}: {
    email: string;
    password: string;
    role: string;
}) => {
    try {
        const response = await api.post(authRoutes.loginUser, { email, password, role })
        return response.data
    } catch (error: any) {
        return error
    }
}

export const verifyOtp = async (email: string, otp: string) => {
    try {
        const response = await api.post(authRoutes.verifyOtp, { email, otp })
        return response.data
    } catch (error: any) {
        return error
    }
}


export const managerSignup = async (formData: FormData) => {
    try {
        const response = await api.post(authRoutes.managerSignup, formData)
        return response.data
    } catch (error: any) {
        return error
    }
}


export const managerLogin = async ({
    email,
    password,
    role,
}: {
    email: string;
    password: string;
    role: string;
}) => {
    try {
        const response = await api.post(authRoutes.managerLogin, { email, password, role })
        return response.data
    } catch (error: any) {
        return error
    }
}

export const approveManager = async (managerId: string) => {
    try {
        const response = await api.put(authRoutes.approveManager, { managerId })
        return response.data
    } catch (error: any) {
        return error
    }
}


export const adminLogin = async ({
    email,
    password,
    role,
}: {
    email: string;
    password: string;
    role: string;
}) => {
    try {
        const response = await api.post(authRoutes.adminLogin, { email, password, role })
        return response.data
    } catch (error: any) {
        return error
    }
}