import React, { useEffect, useState } from "react";
import context from "./context";
function ContextProvider({ children }) {
  const [todo, setTodo] = useState([]);
  const addItem = (txt,date=Date.now()) => {
    const tempArr = [
      {
        id: Date.now(),
        task: txt,
        completed: false,
        urgent: false,
        subTask: [],
        dateTime:date
      },
      ...todo,
    ];
    console.log( tempArr);
    setTodo(tempArr);
  };

  const remItem = (id) => {
    const tempArr = todo.filter((todo) => todo.id !== id);
    setTodo(tempArr);
  };
  const updItem = (id, txt) => {
    const tempArr = todo.map((tod) => {
      if (tod.id === id) {
        return { ...tod, task: txt };
      } else {
        return tod;
      }
    });
    setTodo(tempArr);
  };
  const toggleComplete = (id) => {
    const tempArr = todo.map((tod) => {
      if (tod.id === id) {
        return { ...tod, completed: !tod.completed };
      } else {
        return tod;
      }
    });
    setTodo(tempArr);
  };
  const toggleUrgent = (id) => {
    const tempArr = todo.map((tod) => {
      if (tod.id === id) {
        return { ...tod, urgent: !tod.urgent };
      } else {
        return tod;
      }
    });
    setTodo(tempArr);
  };
  const addSubTask = (id, txt) => {
    const tempArr = todo.map((tod) => {
      if (tod.id === id) {
        console.log(tod);
        return {
          ...tod,
          subTask: [
            ...tod.subTask,
            { subId: Date.now(), subTxt: txt }
          ]
        };
        
      } else {
        return tod
      }
    });
    setTodo(tempArr)
  };
  const remSubTask = (id, subId) => {
    const tempArr = todo.map((tod) => {
      if (tod.id === id) {
        const tempo = tod.subTask.filter((to) => to.subId !== subId);

        return { ...tod, subTask: tempo };
      } else {
        return tod;
      }
    });
    setTodo(tempArr);
  };
  const editSubTask = (id, subId, txt) => {
    const tempArr = todo.map((tod) => {
      if (tod.id === id) {
        const tempo = tod.subTask.map((to) => {
          if (to.subId === subId) {
            return { ...to, subTxt: txt };
          } else {
            return to;
          }
        });
        return { ...tod, subTask: tempo };
      } else {
        return tod;
      }
    });
    setTodo(tempArr);
  };
  return (
    <context.Provider
      value={{
        todo,
        toggleComplete,
        toggleUrgent,
        updItem,
        addItem,
        remItem,
        setTodo,
        addSubTask,
        remSubTask,
        editSubTask,
      }}
    >
      {children}
    </context.Provider>
  );
}

export default ContextProvider;
