const config = {
    "api": {
        "url": "https://api.mistergift.io"
    },
    "auth": {
        "path": "/authenticate"
    },
    "register": {
        "path": "/users"
    },
    "preregister": {
        "path": "/landing"
    },
    "events": {
        "path": "/events"
    },
    "users": {
        "path": "/"
    }

}

config.url = function (service) {
    if (!service in this) throw new Error('MISSING_SERVICE_CONFIG')
    return `${this.api.url}${this[service].path}`
}

export default config