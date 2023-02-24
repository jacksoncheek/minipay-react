const host = 'https://api.minipayhq.com'
const apiVersion = '/api/v1'

export const get = 'GET'
export const post = 'POST'
export const put = 'PUT'
export const _delete = 'DELETE'

export async function send(
    path,
    method,
    body,
    optionalHeaders = {},
    queryParameters = {}
) {
    const requiredHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }

    const config = {
        method: method,
        headers: {
            ...requiredHeaders,
            ...optionalHeaders
        }
    }

    if (body && method !== get) {
        if (body?.request) {
            config.body = JSON.stringify(body.request)
        } else {
            config.body = JSON.stringify(body)
        }
    }

    if (queryParameters) {
        path += encodeQueryString(queryParameters)
    }

    return fetch(`${host}${apiVersion}${path}`, config)
        .then(async (response) => {
            if (response.ok) {
                return await response.json()
            } else {
                const message = await response.json()
                const apiError = {
                    status: response.status,
                    message: message.message
                }
                return Promise.reject(apiError)
            }
        })
        .catch((error) => {
            return Promise.reject(error)
        })
}

function encodeQueryString(params) {
    const keys = Object.keys(params)
    return keys.length
        ? '?' +
              keys
                  .map(
                      (key) =>
                          encodeURIComponent(key) +
                          '=' +
                          encodeURIComponent(params[key])
                  )
                  .join('&')
        : ''
}
