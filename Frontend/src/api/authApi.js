import { ROUTES } from "@/utils/constant";
import axiosInstance from "./axiosInstance";


export const login = (credentials) =>{
    return axiosInstance.post(ROUTES.LOGIN_ENDPOINT,credentials)
}

export const signup = (data) =>{
    return axiosInstance.post(ROUTES.SIGNUP_ENDPOINT,data)
}