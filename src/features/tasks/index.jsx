import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import TaskForm from "./TaskForm";
import { addTask, selectTasks, setTasks } from "./taskSlice";
import TaskCard from "./TaskCard";
import { postTask, getTasks } from "./tasksAPI";
import { toSeconds } from "./utils";

const MainContainer = styled.div`
  width: 350px;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    align-items: center;
    height: 30px;
    background: white;
    justify-content: space-between;

    .heading-text {
      font-size: 12px;
      padding: 10px;
    }

    .add-button {
      height: 100%;
      width: 30px;
      font-size: 20px;
      cursor: pointer;
      border: none;
      opacity: 0.8;
      background: white;
      border-left: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
`;

function Task() {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTasks = async () => {
    const res = await getTasks();
    if (res.error) {
      alert("Failed to fetch tasks");
      return;
    }

    const result = [];
    for (let key in res.results) {
      result.push(res.results[key]);
    }

    dispatch(setTasks(result));
  };

  const handleAdd = async (data) => {
    const body = {
      assigned_user: "user_979f2358c7554c809d0d688943b8966b",
      task_date: data.date,
      task_time: toSeconds(data.time),
      is_completed: 0,
      time_zone: new Date().getTimezoneOffset() * 60,
      task_msg: data.description,
    };
    const res = await postTask(body);
    if (res.error) {
      alert("Failed to add the task");
      return;
    }

    dispatch(addTask({ ...data, id: res.id }));
  };

  return (
    <MainContainer>
      <div className="header">
        <div className="heading-text">
          <p>TASKS {tasks.length}</p>
        </div>

        <button className="add-button" onClick={() => setOpen(true)}>
          +
        </button>
      </div>

      {open && (
        <TaskForm handleSave={handleAdd} handleCancel={() => setOpen(false)} />
      )}

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </MainContainer>
  );
}

export default Task;
