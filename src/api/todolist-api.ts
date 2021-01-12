import axios from 'axios'
import React from 'react'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'ee9ed3e3-edf2-4816-99c4-fed9295b0347'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}


type ResponseType<D={}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export type TaskType = {

    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}


type GetTasksResponseType = {
    error: string | null,
    totalCount: number,
    items: TaskType []
}

export type UpdateTaskModel = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}


export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{item: TodolistType}>>(`todo-lists/`, {title: title})
        return promise
    },
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>('todo-lists')
        return promise
    },
    deleteTodolist(id: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${id}`)
        return promise
    },
    getTasks(todolistId:string){
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId:string, taskId:string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId:string, taskId:string, model: UpdateTaskModel){
        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    createTask(todolistId:string, taskTitle:string){
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },
}
