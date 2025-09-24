import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'
import { parse } from 'postcss';

function Todo() {

const [todoList, setTodoList] = useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")): []);
const inputRef = useRef();


//Delete ToDo
const deleteTodo = (id) => {
    setTodoList((prvTodo) => {
        return prvTodo.filter((todo) => todo.id !== id)
    })
}


//Add ToDo
const add = ()=>{
    const inputText = inputRef.current.value.trim();

    if(inputText===""){
        return null;
    }

    const newTodo = {
        id: Date.now(0),
        text: inputText,
        isComplete: false,
    }
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
}

//Mark completed
const toggle = (id)=>{
    setTodoList((prevTodo)=>{
        return prevTodo.map((todo)=>{
            if(todo.id === id){
                return {...todo, isComplete: !todo.isComplete}
            }
            return todo;
        })
    })
}

useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todoList))    
}, [todoList])

  return (
    <div className='bg-white p-7 place-self-center w-11/12 max-w-md flex flex-col min-h-[550px] rounded-xl'>

        {/* Title */}
        <div className='flex items-center mt-7 gap-2'>
            <img className='w-8' src={todo_icon} alt="" />
            <h1 className='text-3xl font-semibold'>To-Do-List</h1>
        </div>
        
        {/* Input Field */}
        <div className='flex items-center rounded-full my-7 bg-gray-200'>
            <input ref={inputRef} className='flex-1 bg-transparent border-0 outline-none h-14 pl-7 pr-2 placeholder:text-slate-600' type="text" placeholder='Add Your Task'/>

            <button onClick={add} className='bg-orange-600 rounded-full border-none w-32 h-14 text-white text-lg font-medium cursor-pointer'>Add</button>
        </div>

        {/* ToDo List */}
        <div>

            {todoList.map((item, index) => {
                return <TodoItems text={item.text} key={index} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle} />
            })}

        </div>
    </div>
  )
}

export default Todo