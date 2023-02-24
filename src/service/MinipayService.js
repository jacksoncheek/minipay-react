import { Credentials } from '../model/Credentials.js'
import { AuthorizedAppAddRequest } from '../model/request/AuthorizedAppAddRequest.js'
import { AuthorizedAppPostUsageEventRequest } from '../model/request/AuthorizedAppPostUsageEventRequest.js'
import { LoginRequest } from '../model/request/LoginRequest.js'
import { post, send } from '../service/NetworkService.js'

export class RealMinipayService {
    async login({ email, password, onSuccess, onFailure }) {
        let credentials = new Credentials(email, password)
        let request = new LoginRequest(credentials)
        await send('/security/login', post, request)
            .then((data) => {
                onSuccess(data)
            })
            .catch((error) => {
                onFailure(error)
            })
    }

    async addApp({ customUserId, planId, minipayToken, onSuccess, onFailure }) {
        let request = new AuthorizedAppAddRequest(
            customUserId,
            planId,
            minipayToken
        )
        await send('/apps/add', post, request)
            .then((data) => {
                onSuccess(data)
            })
            .catch((error) => {
                onFailure(error)
            })
    }

    async postUsageEvent({
        customUserId,
        planId,
        apiKey,
        onSuccess,
        onFailure
    }) {
        let request = new AuthorizedAppPostUsageEventRequest(
            customUserId,
            planId
        )
        await send('/apps/usage', post, request, { 'X-API-Key': apiKey })
            .then((data) => {
                onSuccess(data)
            })
            .catch((error) => {
                onFailure(error)
            })
    }
}

export class FakeMinipayService {
    async login({ email, password, onSuccess, onFailure }) {
        onSuccess('login')
    }

    async addApp({ customUserId, planId, minipayToken, onSuccess, onFailure }) {
        onSuccess('addApp')
    }

    async postUsageEvent({
        customUserId,
        planId,
        apiKey,
        onSuccess,
        onFailure
    }) {
        onSuccess('postUsageEvent')
    }
}
