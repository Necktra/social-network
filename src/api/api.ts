import axios from "axios"
import { ProfileType } from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "e7da8bc7-fe26-4fcc-96fb-8aca7e2700ec"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data
        });
    },

    follow(userId: number) {
        return instance.post(`follow/${userId}`).then(response => {
            return response.data
        });
    },

    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(response => {
            return response.data
        });
    },

    getProfile(userId: number) {
        console.log("Use profileAPI pls");
        return profileAPI.getProfile(userId);
    }
}


export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`);
    },

    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`);
    },

    updateStatus(status: string) {
        return instance.put(`profile/status`, {
            status: status
        });
    },

    savePhoto(photoFile: any) {
        let formData = new FormData();
        formData.append("image", photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile);
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10,
}

type MyResponseType = {
    data: { id: number, email: string, login: string}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: { userId: number}
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}

export const authAPI = {
    me() {
        return instance.get<MyResponseType>(`auth/me`).then(response => {
            return response.data
        });
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, {
                email,
                password,
                rememberMe,
                captcha
            })
            .then(response => {
                return response.data
            });
    },

    logout() {
        return instance.delete(`auth/login`)
            .then(response => {
                return response.data
            });
    },
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`).then(response => {
            return response.data
        });
        // return instance.get(`security/get-captcha-url`);
    }
}