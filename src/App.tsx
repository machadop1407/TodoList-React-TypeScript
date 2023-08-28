import React, { FC, ChangeEvent, useState } from "react";
import "./App.css";
import TodoTask from "./Components/TodoTask";
import { ITask } from "./Interfaces";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDealine] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>(
    JSON.parse(localStorage.getItem("items") || "[]")
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDealine(new Date(event.target.value).getTime());
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    const newToDoList = [...todoList, newTask];
    setTodoList(newToDoList);
    setTask("");
    localStorage.setItem("items", JSON.stringify(newToDoList));
    setDealine(new Date().getTime());
  };

  const completeTask = (taskNameToDelete: string): void => {
    const newTasks = todoList.filter((task) => {
      return task.taskName != taskNameToDelete;
    });
    setTodoList(newTasks);
    localStorage.setItem("items", JSON.stringify(newTasks));
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Item..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="date"
            name="deadline"
            // value={deadline}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
};

export default App;
