// const BASE_API_URL = "http://localhost:5000/api";
// const BASE_API_URL = "https://tksf97sz-5000.inc1.devtunnels.ms/api";
// const BASE_API_URL = "https://job-portal-mrlu.onrender.com/api";
const BASE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";


export const ROUTES = {
  BASE: BASE_API_URL,

  //Authentication Endpoints
  AUTH: `${BASE_API_URL}/auth`,
  SIGNUP_ENDPOINT: `${BASE_API_URL}/auth/signup`,
  LOGIN_ENDPOINT: `${BASE_API_URL}/auth/login`,
  LOGOUT_ENDPOINT: `${BASE_API_URL}/auth/logout`,
  PROFILE_UPDATE: `${BASE_API_URL}/user/profile`,

  //Job
  GET_ALL_JOB: `${BASE_API_URL}/job`,

  //Company
  CREATE_COMPANY: `${BASE_API_URL}/company`,
  GET_ALL_COMPANY: `${BASE_API_URL}/company`,
  DELETE_COMPANY: (id) => `${BASE_API_URL}/company/${id}`,
  UPDATE_COMPANY : (companyId) => `${BASE_API_URL}/company/${companyId}`,

  
  //Job
  GET_ALL_ADMIN_JOBS: `${BASE_API_URL}/job/recruiter/my-jobs`,
  POST_JOB:`${BASE_API_URL}/job/add`,
  APPLY_JOB :`${BASE_API_URL}/applications/post`,
  GET_JOB_ID:(id) => `${BASE_API_URL}/job/${id}`,
  DELETE_JOB: (id) => `${BASE_API_URL}/job/${id}`,

  //Applicatons
  GET_ALL_APPLICANT:(id)=>`${BASE_API_URL}/job/${id}/applicants`
};

export const PATH = {
  HOME: "/",
  SIGNUP: "/signup",
  LOGIN: "/login",
  JOBS: "/jobs",
  BROWSER: "/browser",
  PROFILE: "/profile",

  ADMIN_DASHBOARD: "/admin",

  //job
  JOB_DESCRIPTION: "/job/description/:id",
  POST_JOB: "/admin/jobs/post",
  UPDATE_JOB:"/admin/job/update/:id",

  //Company
  COMPANY: "/admin/companies",
  CREATE_COMPANY: "/admin/companies/create",
};
