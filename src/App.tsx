import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Tasks} from "./Tasks";

export type TaskType = {
    isChecked: boolean
    title: string
    id: string
}
export type FilterType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTask] = useState<Array<TaskType>>([
        {isChecked: true, title: 'html', id: v1()},
        {isChecked: true, title: 'html', id: v1()},
        {isChecked: false, title: 'html', id: v1()},
        {isChecked: false, title: 'html', id: v1()}
    ])

    const [filter, setFilter] = useState<FilterType>('all')

    let copyFilterArr = [...tasks]

    if (filter === 'active') {
        copyFilterArr = tasks.filter(el => !el.isChecked)
    }
    if (filter === 'completed') {
        copyFilterArr = tasks.filter(el => el.isChecked)
    }

    console.log('hello')
    const handelFilter = (filter: FilterType) => {
        setFilter(filter)
    }
    const removeTask = (elId: string) => {
        const remove = tasks.filter(el => el.id !== elId)
        setTask(remove)
    }
    const handelAddTask = (title: string) => {
        const task = {isChecked: false, title, id: v1()}
        setTask([task,...tasks])
    }

    return (
        <div className="App">
            <Tasks tasks={copyFilterArr}
                   removeTask={removeTask}
                   handelFilter={handelFilter}
                   handelAddTask={handelAddTask}
            />
        </div>
    );
}

export default App;
