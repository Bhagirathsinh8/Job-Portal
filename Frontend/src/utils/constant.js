const BASE_API_URL = "http://localhost:5000/api";

export const ROUTES = {
    BASE: BASE_API_URL,
    
    //Authentication Endpoints
    AUTH: `${BASE_API_URL}/auth`,
    SIGNUP_ENDPOINT: `${BASE_API_URL}/auth/signup`,
    LOGIN_ENDPOINT: `${BASE_API_URL}/auth/login`,
    LOGOUT_ENDPOINT: `${BASE_API_URL}/auth/logout`,
};

