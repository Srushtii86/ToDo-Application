import React,{ useEffect, useState } from 'react'
import Create from './Create'
import './Home.css'
import { BsFillTrashFill } from 'react-icons/bs';
import axios from "axios"


export default function Home() {
    const [todos,setTodos] = useState([]);


    const createTask = (task)=>{
        let newTodos = [...todos, task];
        setTodos(newTodos);
    }

    useEffect(()=>{
        axios.get('http://localhost:3001/todos')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    },[])

    const handleCheck = (id)=>{
        let currentTodo = todos.find(todo=> todo._id === id);
        axios.put(`http://localhost:3001/update/${id}`, { done: !currentTodo.done })
        .then(result=>{
            setTodos(todos.map(todo => todo._id === id ? result.data : todo));
            console.log("Success changing done parameter");
        })
        .catch(err=>console.log(err))
    }

    const handleDelete = (id)=>{
        axios.delete(`http://localhost:3001/delete/${id}`)
        .then(()=>setTodos(todos.filter(todo => todo._id !== id)))
        .catch(err=>console.log(err))
    }

    return (
    <div className='homeContainer'>
        <h1 style={{color:'#33484d'}}>ToDo List</h1>
        <Create createTask={createTask}/>
        {
            todos.length === 0
            ?
            <div style={{color:'#3d655d'}}><h3>No Tasks created yet</h3></div>
            :
            todos.map((todo, index)=>(
                <div className='task' style={{color:'black'}} key={index}>
                    <div className='checkbox'>
                        <input 
                            className='iconCheck' 
                            type="checkbox" 
                            onClick={ () => handleCheck(todo._id)} 
                        />
                        <div className='text '> {todo.task} </div>
                    </div>
                    <div>
                        <span><BsFillTrashFill className='icon' onClick={()=>handleDelete(todo._id)}/></span>
                    </div>
                </div>
            ))
        }
    </div>
  )
}
