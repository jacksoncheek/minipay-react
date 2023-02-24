import React from 'react'
import {
    MinipayLogin,
    MinipayAuthorizeApp,
    MinipayPostUsageEvent
} from 'minipay-react'
import 'minipay-react/dist/index.css'

const MinipayDemoState = {
    Login: 'Login',
    AuthorizeApp: 'AuthorizeApp',
    PostUsageEvent: 'PostUsageEvent',
    Complete: 'Complete'
}

class MinipayDemo extends React.Component {
    constructor(props) {
        super(props)
        this.customUserId = props.customUserId || ''
        this.planId = props.planId || ''
        this.apiKey = props.apiKey || ''

        this.state = {
            state: MinipayDemoState.Login,
            token: '',
            isAppAuthorized: false,
            isUserAuthorized: false
        }
    }

    render() {
        switch (this.state.state) {
            case MinipayDemoState.Login:
                return (
                    <MinipayLogin
                        onSuccess={(data) => {
                            this.setState({
                                state: MinipayDemoState.AuthorizeApp,
                                token: data.token
                            })
                        }}
                        onFailure={(error) => {
                            console.log(error)
                        }}
                    />
                )
            case MinipayDemoState.AuthorizeApp:
                return (
                    <MinipayAuthorizeApp
                        customUserId={this.customUserId}
                        planId={this.planId}
                        minipayToken={this.state.token}
                        onSuccess={(data) => {
                            this.setState({
                                state: MinipayDemoState.PostUsageEvent,
                                isAppAuthorized: data.successful
                            })
                        }}
                        onFailure={(error) => {
                            console.log(error)
                        }}
                    />
                )
            case MinipayDemoState.PostUsageEvent:
                return (
                    <MinipayPostUsageEvent
                        customUserId={this.customUserId}
                        planId={this.planId}
                        apiKey={this.apiKey}
                        onSuccess={(data) => {
                            this.setState({
                                state: MinipayDemoState.Complete,
                                isUserAuthorized: data.successful
                            })
                        }}
                        onFailure={(error) => {
                            console.log(error)
                        }}
                    />
                )
            case MinipayDemoState.Complete:
                console.log(this.state)
                return <label>Complete</label>
            default:
                return <label>Default</label>
        }
    }
}

function App() {
    return (
        <div
            style={{
                margin: 'auto',
                padding: 16,
                width: 400
            }}
        >
            <MinipayDemo
                customUserId='<your-custom-user-id>'
                planId='<your-plan-id>'
                apiKey='<your-api-key>'
            />
        </div>
    )
}

export default App
