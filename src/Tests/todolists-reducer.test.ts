
import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    FilterValuesType, removeTodolistAC,
    setTodolistsAC,
    TodolistDomainType,
    todolistsReducer
} from "../features/TodolistsList/todolists-reducer";

let todolistId1: string;
let todolistId2: string;

let startState: Array <TodolistDomainType> = []

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all",addedDate:'', order:0, entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate:'', order:0, entityStatus: "idle"}
    ]
})


test('correct todolist should be removed', () => {


    /*const action : RemoveTodolistActionType = {
        type: 'REMOVE-TODOLIST' as const,
        id: todolistId1
    }*/

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

/*test('correct todolist should be added', () => {


    let newTodolistTitle = "New Todolist";



    /!*const action: AddTodolistActionType = {
        type: 'ADD-TODOLIST' as const,
        title: newTodolistTitle
    }*!/

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});*/

test('correct todolist should change its name', () => {


    let newTodolistTitle = "New Todolist";


    /*const action: ChangeTodoListTitleActionType = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: todolistId2,
        title: newTodolistTitle
    };*/

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

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

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilterValue));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilterValue);
});

test('todolists should be set to the Tests', () => {


    const action = setTodolistsAC(startState)

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);

});


