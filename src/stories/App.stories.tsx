import React from 'react'
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
import App from "../app/App";


export default {
    title: 'App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppBaseExample = (props: any) => {
    return (<App demo={true}/>)
}
