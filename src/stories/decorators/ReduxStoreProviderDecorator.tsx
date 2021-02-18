import * as React from 'react'
import {v1} from 'uuid'
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";
import {tasksReducer} from "../../features/TodolistsList/tasks-reducer";
import {todolistsReducer} from "../../features/TodolistsList/todolists-reducer";
import {AppRootStateType} from "../../app/store";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {appReducer} from "../../app/app-reducer";
import thunkMiddleware from "redux-thunk";




const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all",  addedDate:'', order:0, entityStatus: "idle"},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate:'', order:0, entityStatus: "idle"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, description: '',
                todoListId: "todolistId1", startDate:'', deadline:'', addedDate:'', order:0, priority:TaskPriorities.Low},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, description: '',
                todoListId: "todolistId1", startDate:'', deadline:'', addedDate:'', order:0, priority:TaskPriorities.Low}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, description: '',
                todoListId: "todolistId2", startDate:'', deadline:'', addedDate:'', order:0, priority:TaskPriorities.Low},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, description: '',
                todoListId: "todolistId2", startDate:'', deadline:'', addedDate:'', order:0, priority:TaskPriorities.Low}
        ]
    },
    app: {
        error: null,
        status: "idle"
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunkMiddleware));



export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
)