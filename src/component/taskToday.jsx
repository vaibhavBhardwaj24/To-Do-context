import React, { useContext, useEffect } from "react";
import context from "../context";
import Items from "./items";
import Header from "./header";
import Adder from "./adder";
function TaskToday() {
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
  const today = new Date();
  // const date2=new Date()
  //   const tood=todo.filter((tod)=>{tod.dateTime.toDateString()==today.toDateString()})
  return (
    <>
      <div className="main">
        <Header />
        <div className="topic">
          <h1> Today's Tasks</h1>
          <Adder />
          {todo.map((tod) => (
            <p key={tod.id}>
              {(new Date().getDate() == new Date(tod.dateTime).getDate() &&
                new Date().getMonth() == new Date(tod.dateTime).getMonth() &&
                new Date().getFullYear() == new Date().getFullYear()) && (
                  <Items todo={tod} key={tod.id}/>
                )}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
//
export default TaskToday;
