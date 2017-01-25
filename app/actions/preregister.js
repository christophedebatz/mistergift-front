import config from '../config'

const Preregister = {
    preregister(email) {
        let body = JSON.stringify({ email })

        let req = new Request(
            config.url('preregister'),
            {
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, 
                method: 'POST',
                mode: 'cors',
                body
            }
        )

        return fetch(req)
            .then((res) => (res.ok ? true : Promise.reject(res)))
    }
}

export default Preregister
