import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    title: string
    changeValue: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanType) => {
    console.log("EditableSpan called")
    const [editMode, setEditMode] = useState<boolean>(true)
    const [title, setTitle] = useState<string>(props.title)

    const activetedEditMode = () => {
        setEditMode(true)
    }
    const deActivetedEditMode = () => {
        setEditMode(false)
        props.changeValue(title)
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return (editMode
            ? <TextField
                size={"small"}
                variant={"outlined"}
                value={title}
                onBlur={deActivetedEditMode}
                autoFocus={true}
                onChange={onChangeTitle}
            />
            : <span onDoubleClick={activetedEditMode}>{props.title}</span>
    )
})


export default EditableSpan;
