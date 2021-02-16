import React, {useReducer, useState} from 'react';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, FilterValuesType,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api";



export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolist] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate:'', order:0},
        {id: todolistId2, title: "What to buy", filter: "all",  addedDate:'', order:0}
    ])
    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, description: '',
                todoListId: todolistId1, startDate:'', deadline:'', addedDate:'', order:0, priority:TaskPriorities.Low  },
            {id: v1(), title: "JS", status: TaskStatuses.Completed, description: '',
                todoListId: todolistId1, startDate:'', deadline:'', addedDate:'', order:0, priority:TaskPriorities.Low}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, description: '',
                todoListId: todolistId2, startDate:'', deadline:'', addedDate:'', order:0, priority:TaskPriorities.Low},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, description: '',
                todoListId: todolistId2, startDate:'', deadline:'', addedDate:'', order:0, priority:TaskPriorities.Low}
        ]
    });


    function removeTask(id: string, todolistId: string) {

        const action = RemoveTaskAC(id, todolistId)
        dispatchToTasks(action)
    }

    function addTask(title: string, todolistId: string) {

        const action = AddTaskAC({
            description: '',
        title: title,
        status: TaskStatuses.New,
        priority: 0,
        startDate: '',
        deadline: '',
        id: 'id exists',
        todoListId: todolistId,
        order: 0,
        addedDate: ''})
        dispatchToTasks(action)
    }

    function changeTaskTitle(id: string, title: string, todolistId: string) {

        const action = ChangeTaskTitleAC(id, title, todolistId)
        dispatchToTasks(action)

    }

    function changeStatus(id: string, status: TaskStatuses, todolistId: string) {

        const action = ChangeTaskStatusAC(id, status, todolistId)
        dispatchToTasks(action)
    }


    function changeFilter(value: FilterValuesType, todolistId: string ) {

        const action = ChangeTodolistFilterAC(todolistId, value)
        dispatchToTodolist(action)
    }

    function changeTodoListTitle( todolistId: string, title: string,) {

        const action = ChangeTodolistTitleAC(todolistId, title)
        dispatchToTodolist(action)
    }

    function removeTodolist(id: string) {

        const action = RemoveTodolistAC(id)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    function addTodoList(title: string) {


        const action = AddTodolistAC({
            id:v1(),
            addedDate: '',
            order: 0,
            title: title
        })
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

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
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed);
                            }

                            return <Grid item>
                                <Paper elevation={5} style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
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


export default AppWithReducers;
