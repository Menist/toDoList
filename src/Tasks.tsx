import React, {ChangeEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";
import {Button} from "./Button";

type PropsType = {
    tasks: Array<TaskType>
    removeTask: (elId: string) => void
    handelAddTask: (title: string) => void
    handelFilter: (filter: FilterType) => void
    isCheckedHandler: (e: ChangeEvent<HTMLInputElement>, id: string) => void
}
export const Tasks = ({tasks, removeTask, handelFilter, handelAddTask, isCheckedHandler}: PropsType) => {

    const [inputValue, setInputValue] = useState('')
    const isDisabled = inputValue.length === 0 || inputValue.length > 20
    const handelInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        handelAddTask(inputValue)
        setInputValue('')
    }
    const filterTaskHandlerAll = () => handelFilter('all');
    const filterTaskHandlerActive = () => handelFilter('active');
    const filterTaskHandlerCompleted = () => handelFilter('completed');
    const ulArr = tasks.length === 0 ?
        <span>No</span>
        : (<ul>{
            tasks.map((el) => {
                const removeTaskHandler = () => removeTask(el.id)
                const checkedHandler = (e: ChangeEvent<HTMLInputElement>) => isCheckedHandler(e, el.id)

                return (
                    <li key={el.id}><input onChange={checkedHandler} type="checkbox" checked={el.isChecked}/> <span>{el.title}</span>
                        <Button title={'x'} onclick={removeTaskHandler}/>
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
                           if (e.key === 'Enter' && inputValue) {
                               handelAddTask(inputValue)
                               setInputValue('')
                           }
                       }}
                />
                <Button
                    disabled={isDisabled}
                    title={'+'}
                    onclick={addTaskHandler}/>

                {inputValue.length > 10 && inputValue.length <= 20 &&
                    <div className={'warning'}>Length more than 10 characters is prohibited!</div>}
                {inputValue.length > 20 && <div className={'error'}>Messaged too long!</div>}

            </div>
            {ulArr}
            <div>
                <Button title={'All'} onclick={filterTaskHandlerAll}/>
                <Button title={'Active'} onclick={filterTaskHandlerActive}/>
                <Button title={'Completed'} onclick={filterTaskHandlerCompleted}/>
            </div>
        </div>
    );
};

