import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {RootStateType} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {
    AppBar,
    Button, CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {logoutTC} from "../features/Login/auth-reducer";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<RootStateType, RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch()
    const isInitialized = useSelector<RootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        debugger
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>

                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Logout</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Switch>
                        <Route exact path={"/"} render={() => <TodolistsList demo={demo}/>}/>
                        <Route path={"/login"} render={() => <Login/>}/>

                        {/*<Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                        <Redirect from={'*'} to={'/404'}/>*/}
                    </Switch>
                </Container>
            </div>
        </BrowserRouter>
    )
}

export default App
