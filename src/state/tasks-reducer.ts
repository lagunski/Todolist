import {TasksStateType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

//action:
type ActionType =
    RemoveTaskActionType
    | AddActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | RemoveTodolistActionType
    | AddTodolistActionType


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string

}

export type AddActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string

}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    isDone: boolean
    todolistId: string

}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    id: string
    title: string
    todolistId: string

}
const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionType):TasksStateType => {
    switch (action.type) {

        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.taskId)
            return copyState
        }
        //return {...state, [action.todolistId]:state[action.todolistId].filter(task => task.id !== action.taskId)}
        case 'ADD-TASK': {
            let task: TaskType = {id: v1(), title: action.title, isDone: false}
            let copyState = {...state}
            copyState[action.todolistId] = [task, ...copyState[action.todolistId]]
            return copyState
            //return {...state, [action.todolistId] : [task, ...state[action.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id !== action.id) return task
                    else return {...task, isDone: action.isDone}
                })
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id !== action.id) return task
                    else return {...task, title: action.title}
                })
            }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case "ADD-TODOLIST": {

            return {...state, [action.todolistId]: []}
        }
        default:
            return state
    }
}

export const RemoveTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}

export const AddTaskAC = (title: string, todolistId: string): AddActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const ChangeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', id, isDone, todolistId}
}

export const ChangeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', id, title, todolistId}
}

