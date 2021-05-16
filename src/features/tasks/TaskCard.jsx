import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import PencilIcon from "../../assets/pencil.svg";
import TaskForm from "./TaskForm";
import { updateTask, removeTask } from "./taskSlice";
import { putTask, deleteTask } from "./tasksAPI";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  .details-container {
    display: flex;
    align-items: center;

    .user-icon {
      height: 35px;
      width: 35px;
      border-radius: 3px;
      object-fit: cover;
    }

    .text-container {
      margin: 0 10px;

      .desc {
        font-size: 15px;
        font-weight: 500;
        text-transform: capitalize;
        margin: 0;
      }

      .date {
        margin: 0;
        color: red;
        font-size: 11px;
      }
    }
  }

  .edit-icon {
    background-image: url(${PencilIcon});
    background-position: center;
    background-size: 12px 12px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background-repeat: no-repeat;
    border-radius: 4px;
    background-color: white;
    cursor: pointer;
    height: 25px;
    width: 25px;
  }
`;

function TaskCard({ task }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const saveTask = async (task) => {
    const body = {
      assigned_user: task.user,
      task_date: task.date,
      task_time: task.time,
      is_completed: 0,
      time_zone: new Date().getTimezoneOffset() * 60,
      task_msg: task.decsription,
    };
    const res = await putTask(task.id, body);
    if (res.error) {
      alert("Failed to update the task");
      return;
    }

    dispatch(updateTask(task));
  };

  const handleDelete = async (taskID) => {
    const res = await deleteTask(taskID);
    if (res.error) {
      alert("Failed to delete the task");
      return;
    }

    dispatch(removeTask(taskID));
  };

  if (open) {
    return (
      <TaskForm
        defaultValues={task}
        handleCancel={() => setOpen(false)}
        handleSave={saveTask}
        handleDelete={handleDelete}
      />
    );
  }

  return (
    <Wrapper>
      <div className="details-container">
        <img
          className="user-icon"
          src="https://www.diethelmtravel.com/wp-content/uploads/2016/04/bill-gates-wealthiest-person.jpg"
          alt=""
        />
        <div className="text-container">
          <p className="desc">{task.description}</p>
          <p className="date">{task.date}</p>
        </div>
      </div>

      <button className="edit-icon" onClick={() => setOpen(true)}></button>
    </Wrapper>
  );
}

export default TaskCard;
