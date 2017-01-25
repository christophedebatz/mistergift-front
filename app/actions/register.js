import config from '../config'

const Register = {
    register(data) {
        let body = JSON.stringify(data);

        let req = new Request(config.url('register'), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body
        })

        return fetch(req)
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    }
}

export default Register
