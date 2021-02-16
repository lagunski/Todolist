import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";
import {TaskPriorities, TaskStatuses} from "./api/todolist-api";


export default {
    title: 'Todolists/Task',
    component: Task,
} as Meta;

const removeCallback = action('Removed button clicked inside Task')
const changeStatusCallback = action('Status changed inside Task')
const changeTitleCallback = action('Title changed inside Task')


const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArg = {
    removeTask: removeCallback,
    changeTaskStatus: changeStatusCallback,
    changeTaskTitle: changeTitleCallback
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArg,
    task: {
        id: '1', status: TaskStatuses.Completed, title: 'CSS', description: '',
        todoListId: "todolistId1", startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
    },
    todolistId: 'todolistId1'
}

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArg,
    task: {
        id: '2', status: TaskStatuses.New, title: 'JS', description: '',
        todoListId: 'todolistId2', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
    },
    todolistId: 'todolistId2'
}

