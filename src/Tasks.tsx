import React, {ChangeEvent, KeyboardEventHandler, useState} from 'react';
import {FilterType, TaskType} from "./App";
import {Button} from "./Button";

type PropsType = {
    tasks: Array<TaskType>
    removeTask: (elId: string) => void
    handelAddTask: (title: string) => void
    handelFilter: (filter: FilterType) => void
}
export const Tasks = ({tasks, removeTask, handelFilter, handelAddTask}: PropsType) => {

    const [inputValue, setInputValue] = useState('')

    const handelInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const ulArr = tasks.length === 0 ?
        <span>No</span>
        : (<ul>{
            tasks.map((el) => {
                return (
                    <li><input type="checkbox" checked={el.isChecked}/> <span>{el.title}</span>
                        <Button title={'x'} onclick={() => removeTask(el.id)}/>
                    </li>
                )
            })
        }</ul>)

    return (
        <div>
            <h3>What to learn</h3>
            <div>
                <input value={inputValue}
                       onChange={handelInput}
                       onKeyUp={(e) => {
                           if (e.key === 'Enter') {
                               handelAddTask(inputValue)
                               setInputValue('')
                           }
                       }}
                />
                
                <Button title={'+'} onclick={() => {
                    handelAddTask(inputValue)
                    setInputValue('')
                }}/>
            </div>
            {ulArr}
            <div>
                <Button title={'All'} onclick={() => handelFilter('all')}/>
                <Button title={'Active'} onclick={() => ('active')}/>
                <Button title={'Completed'} onclick={() => ('completed')}/>

            </div>
        </div>
    );
};

