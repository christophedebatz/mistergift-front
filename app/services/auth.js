import config from '../config'

const Auth = {
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

function doLogin(email, password) {
    let data = new URLSearchParams()

    data.set('email', email)
    data.set('password', password)

    let req = new Request(config.url('auth'), { method: 'POST', body: data })

    return fetch(req)
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((json) => ({ token: json.payload.session.token, expiresAt: json.payload.session.expireAt }))
}

export default Auth
