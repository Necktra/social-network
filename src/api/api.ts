import axios from "axios"
import { PhotosType, ProfileType } from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "e7da8bc7-fe26-4fcc-96fb-8aca7e2700ec"
    }
});

// type followResponseType = {
//     // data: {photos: PhotosType}
//     resultCode: ResultCodesEnum
//     // messages: Array<string>
// }

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

type savePhotoResponseType = {
    data: {photos: PhotosType}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(response => {
            return response.data
        });
    },

    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(response => {
            return response.data
        });
    },

    updateStatus(status: string) {
        return instance.put<BaseStatusResponseType>(`profile/status`, {
            status: status
        }).then(response => {
            return response.data
        });
    },

    savePhoto(photoFile: any) {
        let formData = new FormData();
        formData.append("image", photoFile);
        return instance.put<savePhotoResponseType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data
        });
    },

    saveProfile(profile: ProfileType) {
        return instance.put<BaseStatusResponseType>(`profile`, profile).then(response => {
            return response.data
        });;
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10,
}

type MeResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: { userId: number }
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}

type BaseStatusResponseType = {
    data?: {}
    resultCode: ResultCodesEnum
    messages?: Array<string>
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(response => {
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
        return instance.delete<BaseStatusResponseType>(`auth/login`)
            .then(response => {
                return response.data
            });
    },
}

type GetCaptchaUrlResponseType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`).then(response => {
            return response.data
        });
    }
}