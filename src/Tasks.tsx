import React, {ChangeEvent, useState} from 'react';
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
                    <li key={el.id}><input type="checkbox" checked={el.isChecked}/> <span>{el.title}</span>
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

                <Button
                    disabled={inputValue.length === 0 || inputValue.length > 20}
                    title={'+'}
                    onclick={() => {
                        handelAddTask(inputValue)
                        setInputValue('')
                    }}/>
                {inputValue.length > 10 && inputValue.length <= 20 &&
                    <div className={'warning'}>Length more than 10 characters is prohibited!</div>}
                {inputValue.length > 20 && <div className={'error'}>Messaged too long!</div>}

            </div>
            {ulArr}
            <div>
                <Button title={'All'} onclick={() => handelFilter('all')}/>
                <Button title={'Active'} onclick={() => handelFilter('active')}/>
                <Button title={'Completed'} onclick={() => handelFilter('completed')}/>

            </div>
        </div>
    );
};

