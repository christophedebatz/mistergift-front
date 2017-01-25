import config from '../config'

const Events = {
    get() {
        return fetch(config.url('events'))
    },

    findEventById(eventId) {
        let promise = getEventById(eventId)

        return promise
            .then((event) => {
                this.onChange(true)
                return event
            }, (err) => {
                this.onChange(false)
                return Promise.reject(err)
            })
    },

    createEvent(name) {
        let promise = createEvent(name)

        return promise
            .then((event) => {
                this.onChange(true)
                return event
            }, (err) => {
                this.onChange(false)
                return Promise.reject(err)
            })
    },

    onChange() {}
}

function getEventById(eventId) {
    let req = new Request(config.url('events') + '/' + eventId, { method: 'GET', body: eventId })

    return fetch(req)
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
}

function createEvent(name) {
    let data = new URLSearchParams()

    data.set('name', name)

    let req = new Request(config.url('events'), { method: 'POST', body: data })

    return fetch(req)
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
}

export default Events
