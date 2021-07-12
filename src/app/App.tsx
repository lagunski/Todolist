import React from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";
import {useSelector} from "react-redux";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {
    AppBar,
    Button,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
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
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Switch>
                        <Route exact path={"/"} render={() => <TodolistsList demo={demo}/>}/>
                        <Route path={"/login"} render={() => <Login/>}/>

                        <Route path={'*'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                        <Redirect from={'*'} to={'/404'}/>
                    </Switch>
                </Container>
            </div>
        </BrowserRouter>
    )
}
export default App
