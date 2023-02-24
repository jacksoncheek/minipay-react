import * as React from 'react'
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider
} from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { RealMinipayService } from './service/MinipayService'

let theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#3A86FF'
        },
        secondary: {
            main: '#FF006E'
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#ECECEC'
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                outlined: {
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    borderRadius: 8
                },
                contained: {
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    borderRadius: 8
                },
                text: {
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    borderRadius: 8
                },
                textError: {
                    color: '#FF1654',
                    fontWeight: 'bold',
                    borderRadius: 8
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#263859',
                    borderRadius: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }
            }
        }
    }
})

theme = responsiveFontSizes(theme)

function LoginForm(props) {
    let _service = props.service
    let _onSuccess = props.onSuccess
    let _onFailure = props.onFailure

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [isError, setIsError] = React.useState(false)

    const onClick = () => {
        setIsLoading(true)

        _service.login({
            email: email,
            password: password,
            onSuccess: (data) => {
                setIsLoading(false)
                setIsError(false)
                setErrorMessage('')
                _onSuccess(data)
            },
            onFailure: (error) => {
                setIsLoading(false)
                setIsError(true)
                setErrorMessage(error.message)
                _onFailure(error)
            }
        })
    }

    return (
        <React.Fragment>
            <Stack
                direction='column'
                justifyContent='center'
                alignItems='flex-start'
                spacing={2}
            >
                <Grid
                    container
                    direction='row'
                    justifyContent='center'
                    alignItems='center'
                    rowSpacing={4}
                >
                    <Grid item xs={12} md={12}>
                        <Card>
                            <CardContent>
                                <Stack
                                    direction='column'
                                    justifyContent='center'
                                    alignItems='stretch'
                                    spacing={2}
                                >
                                    <Stack
                                        direction='row'
                                        justifyContent='flex-start'
                                        alignItems='center'
                                    >
                                        <Typography
                                            fontWeight='bold'
                                            variant='h4'
                                        >
                                            minipay
                                        </Typography>
                                    </Stack>
                                    <TextField
                                        id='email'
                                        label='Email Address'
                                        fullWidth
                                        required
                                        variant='outlined'
                                        type='email'
                                        disabled={isLoading}
                                        value={email}
                                        error={isError && email.length === 0}
                                        onChange={(event) => {
                                            setEmail(event.target.value || '')
                                            setIsError(false)
                                        }}
                                        sx={{
                                            borderRadius: 6,
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderRadius: 6,
                                                    borderColor: 'white'
                                                }
                                            }
                                        }}
                                    />
                                    <TextField
                                        id='password'
                                        label='Password'
                                        fullWidth
                                        required
                                        variant='outlined'
                                        type='password'
                                        disabled={isLoading}
                                        value={password}
                                        error={isError && password.length === 0}
                                        onChange={(event) => {
                                            setPassword(
                                                event.target.value || ''
                                            )
                                            setIsError(false)
                                        }}
                                        onKeyPress={(event) => {
                                            if (event.key === 'Enter') {
                                                onClick()
                                            }
                                        }}
                                        sx={{
                                            borderRadius: 6,
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderRadius: 6,
                                                    borderColor: 'white'
                                                }
                                            }
                                        }}
                                    />
                                    <Stack
                                        direction='row'
                                        justifyContent='flex-end'
                                        alignItems='center'
                                        spacing={2}
                                        sx={{ pt: 1, width: '100%' }}
                                    >
                                        <Box
                                            sx={{ m: 1, position: 'relative' }}
                                        >
                                            <Button
                                                disabled={isLoading}
                                                variant='contained'
                                                onClick={onClick}
                                                sx={{
                                                    fontWeight: 'bold',
                                                    borderRadius: 6
                                                }}
                                            >
                                                Log In
                                            </Button>
                                            {isLoading && (
                                                <CircularProgress
                                                    size={24}
                                                    sx={{
                                                        color: '#FF006E',
                                                        position: 'absolute',
                                                        top: '50%',
                                                        left: '50%',
                                                        marginTop: '-12px',
                                                        marginLeft: '-12px'
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    </Stack>
                                    <Typography
                                        fontWeight='light'
                                        variant='body2'
                                        color='#ECECEC'
                                    >
                                        By providing your Minipay login
                                        information, you allow Minipay to
                                        authorize future payments in accordance
                                        with this app's terms.
                                    </Typography>
                                    {isError && (
                                        <Typography
                                            fontWeight='bold'
                                            variant='body2'
                                            color='#FF1654'
                                        >
                                            {errorMessage}
                                        </Typography>
                                    )}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Stack>
        </React.Fragment>
    )
}

export class MinipayLogin extends React.Component {
    constructor(props) {
        super(props)
        this.service = new RealMinipayService()
        this.onSuccess =
            props.onSuccess ||
            function (data) {
                console.log(data)
            }
        this.onFailure =
            props.onFailure ||
            function (error) {
                console.log(error)
            }
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <LoginForm
                    service={this.service}
                    onSuccess={this.onSuccess}
                    onFailure={this.onFailure}
                />
            </ThemeProvider>
        )
    }
}

export class MinipayAuthorizeApp extends React.Component {
    constructor(props) {
        super(props)
        this.customUserId = props.customUserId || ''
        this.planId = props.planId || ''
        this.minipayToken = props.minipayToken || ''

        this.state = { token: this.minipayToken }

        this.service = props.service || new RealMinipayService()
        this.onSuccess =
            props.onSuccess ||
            function (data) {
                console.log(data)
            }
        this.onFailure =
            props.onFailure ||
            function (error) {
                console.log(error)
            }

        this.service.addApp({
            customUserId: this.customUserId,
            planId: this.planId,
            minipayToken: this.state.token,
            onSuccess: this.onSuccess,
            onFailure: this.onFailure
        })
    }

    render() {
        return null
    }
}

export class MinipayPostUsageEvent extends React.Component {
    constructor(props) {
        super(props)
        this.customUserId = props.customUserId || ''
        this.planId = props.planId || ''
        this.apiKey = props.apiKey || ''

        this.state = {}

        this.service = props.service || new RealMinipayService()
        this.onSuccess =
            props.onSuccess ||
            function (data) {
                console.log(data)
            }
        this.onFailure =
            props.onFailure ||
            function (error) {
                console.log(error)
            }

        this.service.postUsageEvent({
            customUserId: this.customUserId,
            planId: this.planId,
            apiKey: this.apiKey,
            onSuccess: this.onSuccess,
            onFailure: this.onFailure
        })
    }

    render() {
        return null
    }
}
