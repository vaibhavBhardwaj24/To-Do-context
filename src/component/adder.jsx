import React, { useContext, useState } from "react";
import context from "../context";
import "./styles/adder.css";
function Adder() {
  const { addItem, addSubTask } = useContext(context);
  const [taxt, setTxt] = useState("");
  const [date, setDate] = useState(new Date().setHours(23,59,59));
  return (
    <>
      <div className="search">
        <input
          className="text"
          type="text"
          value={taxt}
          onChange={(e) => {
            setTxt(e.target.value);
          }}
          placeholder="Add new task..."
        />

        <input
          className="date"
          type="datetime-local"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <button
          class="button"
          type="button"
          onClick={() => {
            addItem(taxt, date);
            setTxt("");
            setDate("");
          }}
        >
          Add
        </button>
      </div>
    </>
  );
}

export default Adder;
