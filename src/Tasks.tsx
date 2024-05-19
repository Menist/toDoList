import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
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
    const [error, setError] = useState<string | null>(null)
    const isDisabled = inputValue.length === 0 || inputValue.length > 20
    const handelInput = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        setInputValue(e.currentTarget.value)
    }
    const addTaskHandler = () => {

        if (inputValue.trim() !== '') {
            handelAddTask(inputValue.trim())
        } else {
            setError('Title is required!')
        }

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
                    <li key={el.id}><input onChange={checkedHandler} type="checkbox" checked={el.isChecked}/>
                        <span>{el.title}</span>
                        <Button title={'x'} onclick={removeTaskHandler}/>
                    </li>
                )
            })

        }</ul>)

    const handleAddTaskOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (inputValue.trim() === '') {
                setError('error')
            } else {
                handelAddTask(inputValue.trim())
                setInputValue('')
            }
        }
    }

    return (
        <div>
            <h3>What to learn</h3>
            <div>
                <input className={error ? 'error-border' : ''}
                       value={inputValue}
                       onChange={handelInput}
                       onKeyUp={handleAddTaskOnEnter}
                />
                <Button
                    disabled={isDisabled}
                    title={'+'}
                    onclick={addTaskHandler}/>

                {inputValue.length > 10 && inputValue.length <= 20 &&
                    <div className={'warning'}>Length more than 10 characters is prohibited!</div>}
                {inputValue.length > 20 && <div className={'error'}>Messaged too long!</div>}
                {error && <div className={'error'}>{error}</div>}
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

