import React,{ useState} from 'react'
import './Create.css'
import axios from "axios"

export default function Create({ createTask }) {
    const [task, setTask] = useState('');

    const handleInputChange = (e) => {
        setTask(e.target.value);
    };
    
    const handleAddTask = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/add" , {task:task})
        if (task.trim() !== '') {
                createTask(task);
                setTask('');
        }
    };

    return (
        <div>
            <form onSubmit={handleAddTask}>
                <input
                    className='inputField'
                    type="text"
                    value={task}
                    placeholder='Enter a task'
                    onChange={handleInputChange}
                />
                <button className='addButton' type='submit'>Add</button>
            </form>
        </div>
    )
}
