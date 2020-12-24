import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    console.log("AddItemForm called")
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addTask();
        }
    }

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }


    return <div>
        <TextField
            size={"small"}
            variant={"outlined"}
            error={!!error}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            label={"Title"}
            helperText={error}
        />
        {/*<button onClick={addTask}>+</button>*/}
        <IconButton color="primary" onClick={addTask}>
            <AddBox/>
        </IconButton>
        {/*{error && <div className="error-message">{error}</div>}*/}
    </div>
})
export default AddItemForm;
