import React, { useContext, useEffect } from "react";
import context from "../context";
import Items from "./items";
import Header from "./header";
import Adder from "./adder";

function UrgentTask() {
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
          <h1>Urgent Tasks</h1>
          <Adder/>
          {todo.map(
            (tod) =>
              !tod.completed && tod.urgent && <Items todo={tod} key={tod.id} />
          )}
        </div>
      </div>
    </>
  );
}

export default UrgentTask;
