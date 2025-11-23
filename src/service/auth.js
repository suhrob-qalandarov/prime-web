import axios from'./api'

const AuthService = {
    async login (code) {
        const response = await  axios.post(`/v2/auth/code/${code}`, {},{ withCredentials: true })
        return response.data
    },

    async me (userId) {
        const response = await  axios.get(`/v1/user/${userId}`,{ withCredentials: true });
        localStorage.setItem("prime-user", JSON.stringify(response.data))
    },

    async logout () {
        await axios.post(`/v2/auth/logout`, {}, {withCredentials: true}).then(() => {
                localStorage.removeItem("prime-token")
                localStorage.removeItem("prime-user")
                localStorage.removeItem("prime-user-orders")
                localStorage.removeItem("profile-update-count")
                localStorage.removeItem("fetched-orders-date")
            }
        )
    },

    async getUserFromLS() {
        const user = localStorage.getItem("prime-user");
        if (user) {
            try {
                const parsedUser = JSON.parse(user);
                console.log("Parsed user from localStorage:", parsedUser);
                return {
                    id: parsedUser.id || null,
                    firstName: parsedUser.firstName || "Unknown",
                    phone: parsedUser.phone || "Unknown",
                    username: parsedUser.username || "Unknown",
                    roles: parsedUser.roles || [],
                    isAdmin: parsedUser.isAdmin || false
                };
            } catch (error) {
                console.error("Failed to parse prime-user:", error);
                return null;
            }
        }
        console.log("No user found in localStorage");
        return null;
    },

    async getProfileUpdateCountFromLS () {
        return parseInt(localStorage.getItem("profile-update-count") || 0)
    }
}

export default AuthService