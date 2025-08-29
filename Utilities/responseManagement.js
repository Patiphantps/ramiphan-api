import gatewayException from "../Response/gatewayException.js"
import errCode from "../Response/errorCode.js"

function exToResponse(ex, type = null) {
    const rawResponse = createRawResponse(ex)
    return convertRawResponseToResponseType(rawResponse, type)
}

function createRawResponse(ex) {
    let responseData = ''
    try {
        responseData = ex.toResponse()
    } catch {
        let err = new gatewayException(errCode.internal_err, ex.message, 500)
        responseData = err.toResponse()
    }
    let rawResponse = JSON.parse(JSON.stringify(responseData))
    return rawResponse
}

function convertRawResponseToResponseType(res) {
    var resTmp = {
        statusCode: res.statusCode,
        headers: res.headers,
        body: {
            status: {
                status_code: res.body.returnCode,
                message_th: res.body.returnDescTH,
                message_en: res.body.returnDesc,
                error_cause: res.body.errorCause,
                system_code: res.body.systemCode
            }
        }
    }
    return resTmp
}

function dataToResponse(data) {
    let resTmp
    if (Object.keys(data).length !== 0) {
        data = toSnakeCase(data)
        resTmp = {
            statusCode: 200,
            body: {
                status: {
                    status_code: errCode.success.returnCode,
                    message_th: errCode.success.returnDescTH,
                    message_en: errCode.success.returnDesc
                },
                data
            }
        }
    } else {
        resTmp = {
            statusCode: 200,
            body: {
                status: {
                    status_code: errCode.success.returnCode,
                    message_th: errCode.success.returnDescTH,
                    message_en: errCode.success.returnDesc
                }
            }
        }
    }
    return resTmp
}

function toSnakeCase(data) {
    let outData
    if (Array.isArray(data)) {
        outData = []
        for (const [, value] of Object.entries(data)) {
            if (typeof value === 'object') {
                outData.push(toSnakeCase(value))
            } else {
                outData.push(value)
            }
        }
    } else {
        outData = {}
        for (const [key, value] of Object.entries(data)) {
            if (typeof value === 'object') {
                outData[key.replace(/(?<=.{1})(?<![A-Z])[A-Z](?![A-Z])/g, (m) => '_' + m).toLowerCase()] = toSnakeCase(value)
            } else {
                outData[key.replace(/(?<=.{1})(?<![A-Z])[A-Z](?![A-Z])/g, (m) => '_' + m).toLowerCase()] = value
            }
        }
    }
    return outData
}

function toCamelCase(data) {
    let outData
    if (Array.isArray(data)) {
        outData = []
        for (const [, value] of Object.entries(data)) {
            if (typeof value === 'object') {
                outData.push(toCamelCase(value))
            } else {
                outData.push(value)
            }
        }
    } else {
        outData = {}
        for (const [key, value] of Object.entries(data)) {
            if (typeof value === 'object') {
                outData[key.replace(/_([a-z])/g, (c0, c1) => c1.toUpperCase()).replace("Th", 'TH').replace("En", "EN")] = toCamelCase(value)
            } else {
                outData[key.replace(/_([a-z])/g, (c0, c1) => c1.toUpperCase()).replace("Th", 'TH').replace("En", "EN")] = value
            }
        }
    }
    return outData
}

export default {
    exToResponse,
    dataToResponse,
    toSnakeCase,
    toCamelCase
}