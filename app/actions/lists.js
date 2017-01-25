import config from '../config'

const Lists = {
    get() {
        return fetch(config.url('lists'))
    }
}

export default Lists
