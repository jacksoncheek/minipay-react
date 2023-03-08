import React from 'react'
import {
    MinipayLogin,
    MinipayAuthorizeApp,
    MinipayPostUsageEvent
} from 'minipay-react'
import 'minipay-react/dist/index.css'

class MinipayDemo extends React.Component {
    constructor(props) {
        super(props)
        this.customUserId = props.customUserId || ''
        this.planId = props.planId || ''
        this.apiKey = props.apiKey || ''

        this.state = {
            minipayToken: '',
            authorizeAppResult: '',
            postUsageEventResult: '',
            error: '',
            isLoginFlowEnabled: false,
            isAppAuthorizing: false,
            isUsageEventPosting: false
        }
    }

    isAuthorizeAppFlowEnabled() {
        return this.state.minipayToken.length > 0
    }

    isPostUsageEventFlowEnabled() {
        return this.state.minipayToken.length > 0
    }

    render() {
        return (
            <ul style={{ display: 'grid', gap: '8px' }}>
                <button
                    type='button'
                    onClick={() => {
                        this.setState({ isLoginFlowEnabled: true })
                    }}
                >
                    Start Login Flow
                </button>
                {this.state.isLoginFlowEnabled ? (
                    <MinipayLogin
                        onSuccess={(data) => {
                            this.setState({
                                minipayToken: data.token
                            })
                        }}
                        onFailure={(error) => {
                            this.setState({
                                error: error
                            })
                        }}
                    />
                ) : null}
                <p style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {this.state.minipayToken}
                </p>
                <button
                    type='button'
                    disabled={!this.isAuthorizeAppFlowEnabled()}
                    onClick={() => {
                        this.setState({ isAppAuthorizing: true })
                    }}
                >
                    Start Authorize App Flow
                </button>
                {this.state.isAppAuthorizing ? (
                    <MinipayAuthorizeApp
                        customUserId={this.customUserId}
                        planId={this.planId}
                        minipayToken={this.state.minipayToken}
                        onSuccess={(data) => {
                            this.setState({
                                isAppAuthorizing: false,
                                authorizeAppResult: data.response.successful
                                    ? 'App Authorized'
                                    : 'App Auth Failed'
                            })
                        }}
                        onFailure={(error) => {
                            this.setState({
                                isAppAuthorizing: false,
                                error: error
                            })
                        }}
                    />
                ) : null}
                <p>{this.state.authorizeAppResult}</p>
                <button
                    type='button'
                    disabled={!this.isPostUsageEventFlowEnabled()}
                    onClick={() => {
                        this.setState({ isUsageEventPosting: true })
                    }}
                >
                    Post Usage Event
                </button>
                {this.state.isUsageEventPosting ? (
                    <MinipayPostUsageEvent
                        customUserId={this.customUserId}
                        planId={this.planId}
                        apiKey={this.apiKey}
                        onSuccess={(data) => {
                            this.setState({
                                isUsageEventPosting: false,
                                postUsageEventResult: data.response.authorized
                                    ? 'Access Authorized'
                                    : 'Access Denied'
                            })
                        }}
                        onFailure={(error) => {
                            this.setState({
                                isUsageEventPosting: false,
                                error: error
                            })
                        }}
                    />
                ) : null}
                <p>{this.state.postUsageEventResult}</p>
                <p style={{ color: 'red' }}>{this.state.error}</p>
            </ul>
        )
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
                customUserId='mrconsumer'
                planId='acdaffe199af485092b8e52345b695b8'
                apiKey='eyJzYWx0IjoiNTc4YTIwNTgwYjMyNGJiZTkxNTQ4NTBiOTExYTA2ZmQiLCJ0b2tlbl9zY29wZSI6IkFQSV9LRVkiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1ZTUzNWZkMTUyOTQ0MzU2YmY5ZTg4MmJiOTcwNDNmOCIsImF1ZCI6InByb2R1Y3Rpb24ifQ.WP2L2nWXK1OzVLFErMgR8-nekDGC_ljt5G_HVbpFiyRL-Yi4h-Yr6lzA0z2Ys3nRT2Wux5Kij3bFStHMoIyzyQ'
            />
        </div>
    )
}

export default App
