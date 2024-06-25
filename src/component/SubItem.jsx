import React, { useContext, useState } from "react";
import context from "../context";
import "./styles/SubItem.css";
function SubItem(props) {
  const { addSubTask, remSubTask, editSubTask } = useContext(context);
  const [subTaak, setSubTask] = useState("");

  return (
    <div className="suba">
      <input
        className="input"
        type="text"
        value={subTaak}
        placeholder="Add sub tasks"
        onChange={(e) => {
          setSubTask(e.target.value);
        }}
        disabled={props.comp}
      />

      <button
        className="bho"
        onClick={() => {
          addSubTask(props.id, subTaak);
          setSubTask("");
        }}
        disabled={props.comp}
      >
        +
      </button>
      <div className="scroll">
        {props.subTodo.map((tood) => (
          <p className="subi" key={tood.subId}>
            {tood.subTxt}
            <button
              // style={{ height: "2em", width: "2em", fontSize: "small"  }}
              className="butt2"
              onClick={() => {
                remSubTask(props.id, tood.subId);
              }}
              disabled={props.comp}
            >
              X
            </button>
          </p>
        ))}
      </div>
    </div>
  );
}

export default SubItem;
