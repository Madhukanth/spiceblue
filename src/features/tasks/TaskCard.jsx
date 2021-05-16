import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import PencilIcon from "../../assets/pencil.svg";
import TaskForm from "./TaskForm";
import { updateTask, removeTask } from "./taskSlice";
import { putTask, deleteTask } from "./tasksAPI";
import { toSeconds } from "./utils";

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

  const saveTask = async (data) => {
    const body = {
      assigned_user: data.selectedUser,
      task_date: data.task_date,
      task_time: toSeconds(data.task_time),
      is_completed: 0,
      time_zone: new Date().getTimezoneOffset() * 60,
      task_msg: data.task_msg,
    };
    const res = await putTask(task.id, body);
    if (res.error) {
      alert("Failed to update the task");
      return;
    }

    setOpen(false);
    dispatch(updateTask({ ...data, id: task.id }));
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
        <img className="user-icon" src={task.user_icon} alt="" />
        <div className="text-container">
          <p className="desc">{task.task_msg}</p>
          <p className="date">{task.task_date.split("-").join("/")}</p>
        </div>
      </div>

      <button className="edit-icon" onClick={() => setOpen(true)}></button>
    </Wrapper>
  );
}

export default TaskCard;
