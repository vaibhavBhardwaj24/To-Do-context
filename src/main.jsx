import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextProvider from "./contextProvider.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskDone from "./component/taskDone.jsx";
import UrgentTask from "./component/urgentTask.jsx";
import TaskLeft from "./component/taskLeft.jsx";
import TaskToday from "./component/taskToday.jsx";
const router = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="completedTask" element={<TaskDone />} />
      <Route path="urgentTask" element={<UrgentTask />} />
      <Route path="taskLeft" element={<TaskLeft />} />
      <Route path="today" element={<TaskToday/>}/>
    </Routes>
  </BrowserRouter>
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      {/* <App /> */}
      {router}
    </ContextProvider>
  </React.StrictMode>
);
