import React from 'react';
import EditableSpan, {EditableSpanPropsType} from "./EditableSpan";
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";




export default {
    title: 'Todolists/EditableSpan',
    component: EditableSpan,
    argTypes: {
        changeValue: {
            description: 'Value changed'
        },
        title: {
            defaultValue: 'HTML',
            description: 'Start value to editable span'
        }
    }
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    changeValue: action('EditableSpanExample clicked'),
}