import React, {useCallback} from 'react';
import {TaskType, Todolist} from './Todolist';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {


    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()


    const removeTask=useCallback((id: string, todolistId: string)=> {

        const action = RemoveTaskAC(id, todolistId)
        dispatch(action)
    },[dispatch])

    const addTask=useCallback((title: string, todolistId: string)=> {

        const action = AddTaskAC(title, todolistId)
        dispatch(action)
    },[dispatch])

    const changeTaskTitle=useCallback((id: string, title: string, todolistId: string)=> {

        const action = ChangeTaskTitleAC(id, title, todolistId)
        dispatch(action)

    },[dispatch])

    const changeStatus=useCallback((id: string, isDone: boolean, todolistId: string)=> {

        const action = ChangeTaskStatusAC(id, isDone, todolistId)
        dispatch(action)
    },[dispatch])


    const changeFilter=useCallback((value: FilterValuesType, todolistId: string)=> {

        const action = ChangeTodolistFilterAC(todolistId, value)
        dispatch(action)
    },[dispatch])

    const changeTodoListTitle=useCallback((todolistId: string, title: string,)=> {

        const action = ChangeTodolistTitleAC(todolistId, title)
        dispatch(action)
    },[dispatch])

    const removeTodolist=useCallback((id: string)=> {

        const action = RemoveTodolistAC(id)
        dispatch(action)

    },[dispatch])

    const addTodoList = useCallback((title: string)=> {

        const action = AddTodolistAC(title)
        dispatch(action)

    }, [dispatch])

    return (
        <div className="App">

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
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];



                            return <Grid item>
                                <Paper elevation={5} style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}


export default AppWithRedux;
