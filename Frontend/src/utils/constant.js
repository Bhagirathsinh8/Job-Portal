const BASE_API_URL = "http://localhost:5000/api";
// const BASE_API_URL = "https://tksf97sz-5000.inc1.devtunnels.ms/api";

export const ROUTES = {
    BASE: BASE_API_URL,
    
    //Authentication Endpoints
    AUTH: `${BASE_API_URL}/auth`,
    SIGNUP_ENDPOINT: `${BASE_API_URL}/auth/signup`,
    LOGIN_ENDPOINT: `${BASE_API_URL}/auth/login`,
    LOGOUT_ENDPOINT: `${BASE_API_URL}/auth/logout`,
};

export const PATH = {
    HOME :"/",
    SIGNUP: "/signup", 
    LOGIN: "/login",
    JOBS :"/jobs",
    BROWSER:"/browser",
    PROFILE :"/profile",
    ADMIN_DASHBOARD:"/admin"
}
