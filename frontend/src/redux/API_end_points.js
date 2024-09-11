const baseUrl = import.meta.env.VITE_BACKENT_URL;

const baseAuthUrl = `${baseUrl}/api/auth`;
const baseUserUrl = `${baseUrl}/api/user`;

export const loginUrl = `${baseAuthUrl}/login`;

export const signUpUrl = `${baseAuthUrl}/signUp`;

export const registerUrl = `${baseAuthUrl}/register`;

export const logoutUrl = `${baseAuthUrl}/logout`;

export const forgotPassworUrl = `${baseAuthUrl}/forgot-password`;

export const resetPassworUrl = `${baseAuthUrl}/reset-password`;

export const profilerUrl = `${baseUserUrl}/me`;
