let Auth = {
    getToken() {
        return localStorage.token
    },

    hasToken() {
        return !!localStorage.token
    },

    loggedIn() {
        return !!this.getToken()
    }
}

export default Auth
