import config from '../config'

const Users = {
    findUserById(userId) {
        let promise = getUserById(userId)

        return promise
            .then((event) => {
                this.onChange(true)
                return event
            }, (err) => {
                this.onChange(false)
                return Promise.reject(err)
            })
    }

}

function getUserById(userId) {
    let req = new Request(config.url('users') + '/' + userId, { method: 'GET', body: userId })

    return fetch(req)
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
}

export default Users
