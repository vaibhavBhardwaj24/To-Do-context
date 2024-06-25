import React, { useContext, useEffect, useState } from "react";
import context from "../context";
import SubItem from "./SubItem";
import "./styles/items.css";
function Items(props) {
  const { toggleComplete, toggleUrgent, updItem, remItem } =
    useContext(context);
  const [edit, setEdit] = useState(false);
  const [temp, setTemp] = useState(props.todo.task);
  const [editAllowed, setEditAllowed] = useState(props.todo.completed);
  const [isUrgent, setUrgent] = useState(props.todo.urgent);
  const [sub, setSub] = useState(false);
  const [formated, setFormated] = useState("");
  const [timeLeft, setTimeLeft] = useState([]);
  const [diffs, setDiff] = useState([]);

  useEffect(() => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const newDate = new Date(props.todo.dateTime).toLocaleDateString(
      "en-US",
      options
    );
    setFormated(newDate);
    const newTime = new Date();
    // console.log(typeof(props.todo.dateTime));
    const newTime2 = new Date(props.todo.dateTime);
    const timeDiff = newTime2.getTime() - newTime.getTime();
    const diff = {
      day: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
      hour: Math.floor((timeDiff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)),
      minute: Math.floor((timeDiff % (60 * 60 * 1000)) / (60 * 1000)),
    };

    setTimeLeft(timeDiff);
    setDiff(diff);
  }, [props.todo.dateTime]);

  return (
    <>
      <div
        className="task"
        style={{
          backgroundColor: props.todo.completed
            ? "rgba(90, 235, 80, 0.2)"
            : props.todo.urgent
            ? "rgba(201, 8, 8, 0.2)"
            : "white",
          border: props.todo.completed
            ? "2px solid rgb(90, 235, 80)"
            : props.todo.urgent
            ? "2px solid rgb(201, 8, 8)"
            : "none",
        }}
      >
        <div className="time">
          {props.todo.dateTime && (
            <>
              <p>{formated}</p>
              {timeLeft > 0 ? (
                <>
                  <p >
                    {" "}
                    {diffs.day} days {diffs.hour} hours {diffs.minute} minute
                    left
                  </p>
                </>
              ) : (
                <>
                  <p
                    style={{
                      color: "rgb(201,8,8)",
                      backgroundColor: "rgb(201,8,8,0.1)",
                      paddingInline: "1%",
                      border:"1px solid rgb(201,8,8)",
                      borderRadius:"7px"
                    }}
                  >
                    Past Due Date
                  </p>
                </>
              )}
            </>
          )}
        </div>
        <div className="cont">
          <div>
            <div className="tit">
              <input
                className="inpo"
                type="text"
                value={temp}
                readOnly={!edit}
                onChange={(e) => {
                  setTemp(e.target.value);
                }}
              />
              <div className="bott">
                {edit ? (
                  <>
                    <button
                      className="DoneBtn"
                      onClick={() => {
                        updItem(props.todo.id, temp);

                        setEdit(false);
                      }}
                    >
                      <svg
                        height="3em"
                        viewBox="0 0 24.00 24.00"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        transform="rotate(0)"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke="#CCCCCC"
                          stroke-width="0.096"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M5 14L9 17L18 6"
                            stroke="#fff"
                            stroke-width="2.4"
                          ></path>{" "}
                        </g>
                      </svg>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      class="editBtn"
                      onClick={() => {
                        setTemp(props.todo.task);
                        setEdit(true);
                      }}
                      disabled={editAllowed}
                    >
                      <svg height="1em" viewBox="0 0 512 512">
                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                      </svg>
                    </button>
                  </>
                )}
                <button
                  class="bin-button"
                  onClick={() => {
                    remItem(props.todo.id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 39 7"
                    class="bin-top"
                  >
                    <line
                      stroke-width="4"
                      stroke="white"
                      y2="5"
                      x2="39"
                      y1="5"
                    ></line>
                    <line
                      stroke-width="3"
                      stroke="white"
                      y2="1.5"
                      x2="26.0357"
                      y1="1.5"
                      x1="12"
                    ></line>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 33 39"
                    class="bin-bottom"
                  >
                    <mask fill="white" id="path-1-inside-1_8_19">
                      <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                    </mask>
                    <path
                      mask="url(#path-1-inside-1_8_19)"
                      fill="white"
                      d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                    ></path>
                    <path
                      stroke-width="4"
                      stroke="white"
                      d="M12 6L12 29"
                    ></path>
                    <path stroke-width="4" stroke="white" d="M21 6V29"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 89 80"
                    class="garbage"
                  >
                    <path
                      fill="white"
                      d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="sub">
              {sub ? (
                <>
                  <SubItem
                    subTodo={props.todo.subTask}
                    id={props.todo.id}
                    comp={props.todo.completed}
                  />
                </>
              ) : (
                <div className="empty"></div>
              )}
              <button
                className="subItem"
                onClick={() => {
                  setSub(!sub);
                }}
              >
                <label className="titi">Sub Tasks</label>
              </button>
            </div>
          </div>
          <div className="but">
            <div className="container">
              {/* <p style={{padding:"1px"}}></p> */}
              Completed
              <label class="container2">
                <input
                  type="checkbox"
                  id={props.todo.id}
                  checked={props.todo.completed}
                  onChange={() => {
                    toggleComplete(props.todo.id);
                    setEditAllowed(!editAllowed);
                    console.log(props.todo.id);
                  }}
                />
                <svg viewBox="0 0 64 64" height="2em" width="2em">
                  <path
                    d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                    pathLength="575.0541381835938"
                    class="path"
                  ></path>
                </svg>
              </label>
            </div>

            <div className="container">
              Urgent
              {/* <p style={{padding:"1px"}}></p> */}
              <label class="container2">
                <input
                  type="checkbox"
                  id={props.todo.id}
                  checked={props.todo.urgent}
                  onChange={() => {
                    toggleUrgent(props.todo.id);
                  }}
                />
                <svg viewBox="0 0 64 64" height="2em" width="2em">
                  <path
                    d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                    pathLength="575.0541381835938"
                    class="path"
                  ></path>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Items;
