class AuthorizedAppAddRequest {
    constructor(customUserId, planId, minipayToken) {
        this.customUserId = customUserId // String
        this.planId = planId // String
        this.minipayToken = minipayToken // String
    }
}

export { AuthorizedAppAddRequest }
