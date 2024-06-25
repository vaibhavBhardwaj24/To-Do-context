import React, { useContext,useEffect } from "react";
import context from "../context";
import Items from "./items";
import Header from "./header";
import './styles/taskLeft.css'
import Adder from "./adder";
function TaskLeft() {
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
      <div className="main">
        <Header />
        <div className="topic">
          <h1>Remaining Tasks</h1>
          <Adder/>
          {todo.map(
            (tod) => !tod.completed && <Items todo={tod} key={tod.id} />
          )}
        </div>
      </div>
    </>
  );
}

export default TaskLeft;
