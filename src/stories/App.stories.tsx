import React from 'react'
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
import App from "../app/App";


export default {
    title: 'App stories',
    component: App,
    decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]
}

export const AppBaseExample = (props: any) => {
    return (<App demo={false}/>)
}
