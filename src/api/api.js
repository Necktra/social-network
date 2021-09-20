import axios from "axios"

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

    follow(userId) {
        return instance.post(`follow/${userId}`).then(response => {
            return response.data
        });
    },

    unfollow(userId) {
        return instance.delete(`follow/${userId}`).then(response => {
            return response.data
        });
    },

    getProfile(userId) {
        return instance.get(`profile/${userId}`);
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`).then(response => {
            return response.data
        });
    }
}