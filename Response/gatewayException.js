class DomainError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}

class gatewayException extends DomainError {
    constructor(code, msg, status) {
        super(code)
        this.data = { code, msg, status }
    }
    toResponse() {
        let respModel = {}
        respModel = { ...this.data.code }
        if (this.data.msg !== '') {
            respModel.errorCause = this.data.msg
        }
        return {
            statusCode: this.data.status,
            body: respModel,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
    }
}

export default gatewayException