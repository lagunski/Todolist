import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}

export const Task = React.memo ((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId);
    }
    const changeTaskTitle =useCallback ((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    },[props.changeTaskTitle, props.task.id, props.todolistId])

    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>

        <Checkbox color={"primary"}
                  onChange={onChangeHandler}
                  checked={props.task.isDone}/>
        <EditableSpan title={props.task.title} changeValue={changeTaskTitle}/>
        {/*<button onClick={onClickHandler}>x</button>*/}
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})