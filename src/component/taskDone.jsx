import React, { useContext ,useEffect} from 'react'
import context from '../context'
import Items from './items'
import Header from './header'
import './styles/taskDone.css'
import Adder from './adder'

function TaskDone() {
  
    // const {todo}=useContext(context)
    const { todo, setTodo } = useContext(context);
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodo(todos);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);
  return (
    <>
    <div className='main' >
    <Header/>
    <div className="topic">
      <h1>Completed Tasks</h1>
      <Adder/>
    {todo.map((tod)=>(
        tod.completed&&<Items todo={tod} key={tod.id}/>
    ))}
    </div>
    </div>
    </>
  )
}

export default TaskDone