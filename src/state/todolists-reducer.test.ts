import {
    AddTodolistAC,
    AddTodolistActionType, ChangeTodolistFilterAC,
    ChangeTodoListFilterActionType, ChangeTodolistTitleAC,
    ChangeTodoListTitleActionType, FilterValuesType,
    RemoveTodolistAC, RemoveTodolistActionType, SetTodolistsAC, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';

let todolistId1: string;
let todolistId2: string;

let startState: Array <TodolistDomainType> = []

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all",addedDate:'', order:0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate:'', order:0}
    ]
})


test('correct todolist should be removed', () => {


    /*const action : RemoveTodolistActionType = {
        type: 'REMOVE-TODOLIST' as const,
        id: todolistId1
    }*/

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {


    let newTodolistTitle = "New Todolist";



    /*const action: AddTodolistActionType = {
        type: 'ADD-TODOLIST' as const,
        title: newTodolistTitle
    }*/

    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {


    let newTodolistTitle = "New Todolist";


    /*const action: ChangeTodoListTitleActionType = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: todolistId2,
        title: newTodolistTitle
    };*/

    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {


    let newFilterValue: FilterValuesType = "completed";


    /*const action: ChangeTodoListFilterActionType = {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todolistId2,
        filter: newFilterValue
    };*/

    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId2, newFilterValue));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilterValue);
});

test('todolists should be set to the state', () => {


    const action = SetTodolistsAC(startState)

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);

});


