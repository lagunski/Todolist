import React, {ChangeEvent, useState, KeyboardEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";
import { Task } from './Task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTodoListTitle: (title: string, todolistId: string) => void

    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void

}

export const Todolist = React.memo((props: PropsType) => {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id]);

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.id)
    }, [props.changeTodoListTitle, props.id])


    const removeTodolist = useCallback(() => props.removeTodolist(props.id), [props.removeTodolist, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

    let tasksForTodolist = props.tasks;

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} changeValue={changeTodoListTitle}/>
            {/*<button onClick={removeTodolist}>x</button>*/}
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => <Task
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    task={t}
                    removeTask={props.removeTask}
                    todolistId={props.id}
                    key={t.id}
                />)
            }
        </div>
        <div>
            <Button size={"small"}
                    variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}
                    color="default">All
            </Button>
            <Button size={"small"}
                    variant={props.filter === 'active' ? "contained" : "text"}
                    onClick={onActiveClickHandler}
                    color={"primary"}>Active
            </Button>
            <Button size={"small"}
                    variant={props.filter === 'completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler}
                    color={"secondary"}>Completed
            </Button>
        </div>
    </div>
})




