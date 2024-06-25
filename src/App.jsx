import { useContext, useEffect, useState } from "react";
import "./App.css";
import context from "./context";
import Adder from "./component/adder";
import Items from "./component/items";
import Header from "./component/header";

import { Link, NavLink, Outlet } from "react-router-dom";
function App() {
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
        <Header className="header" />
        <div className="topic">
          <h1>All Tasks</h1>
          <Outlet />
          <Adder />
          <div className="items">
            {todo.map((tod) => (
              <Items todo={tod} key={tod.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
