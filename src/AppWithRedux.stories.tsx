import React from 'react';
import EditableSpan, {EditableSpanPropsType} from "./EditableSpan";
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import AppWithRedux from "./AppWithRedux";
import App from "./App";
import {ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorator";

export default {
    title: 'Todolists/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = () => <AppWithRedux />;

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {}
