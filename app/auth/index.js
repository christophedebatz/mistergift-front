import config from '..config';

let Auth = {
    login(email, password) {
        let promise

        if (this.getToken()) promise = new Promise.resolve({ token: this.getToken() })
        else promise = doLogin(email, password)

        return promise
            .then((auth) => {
                this.onChange(true)
                return auth.token
            }, (err) => {
                this.onChange(false)
                return Promise.reject(err)
            })
    },

    getToken() {
        return localStorage.token
    },

    hasToken() {
        return !!localStorage.token
    },

    logout(callback) {
        delete localStorage.token
        if (callback) callback()
        this.onChange(false)
    },

    loggedIn() {
        return !!this.getToken()
    },

    onChange() {}
}

export default Auth
