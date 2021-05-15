import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";

import { getUser } from "./tasksAPI";

const MainContainer = styled.div`
  width: 330px;
  background: #e4fbff;
  padding: 10px 10px 7px 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);

  .date-time-container {
    display: flex;
    justify-content: space-between;
  }

  .flex-half {
    flex: 0.48;
  }

  .property {
    margin: 7px 0;

    .label {
      margin: 5px 0;
      font-size: 12px;
    }

    .user-input {
      width: 100%;
      height: 25px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      padding: 5px;
      border-radius: 3px;
      box-sizing: border-box;

      :focus {
        outline: none;
      }
    }
  }

  .buttons-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 50px;
    margin-top: 10px;

    button {
      height: 30px;
      cursor: pointer;
      width: 70px;
    }

    .save {
      background: #41ab41;
      border: none;
      border-radius: 3px;
      width: 70px;
      color: white;

      :hover {
        background: #54ca54;
      }
    }

    .cancel {
      background: transparent;
      border: none;
      margin: 10px;

      :hover {
        text-decoration: underline;
      }
    }
  }
`;

function TaskForm({
  defaultValues = {
    description: "",
    date: "2021-05-04",
    time: "12.00",
    user: "",
  },
  handleCancel,
  handleSave,
}) {
  const [users, setUsers] = useState([]);
  const { handleSubmit, control } = useForm({ defaultValues });

  useEffect(() => {
    initialFetch();
  }, []);

  const initialFetch = async () => {
    const res = await getUser();
    if (res.error) {
      // alert("Failed to fetch the user details");
      return;
    }

    setUsers([res]);
  };

  return (
    <MainContainer>
      <form autoComplete="off" onSubmit={handleSubmit(handleSave)}>
        <div className="property">
          <p className="label">Task Description</p>

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <input
                className="user-input"
                placeholder="Description"
                {...field}
              />
            )}
          />
        </div>

        <div className="date-time-container">
          <div className="property flex-half">
            <p className="label">Date</p>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <input className="user-input" type="date" {...field} />
              )}
            />
          </div>

          <div className="property flex-half">
            <p className="label">Time</p>
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <input className="user-input" type="time" {...field} />
              )}
            />
          </div>
        </div>

        <div className="property">
          <p className="label">Assign User</p>
          <Controller
            name="user"
            control={control}
            render={({ field }) => (
              <select className="user-input" {...field}>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.first}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        <div className="buttons-container">
          <button className="cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="save">
            Save
          </button>
        </div>
      </form>
    </MainContainer>
  );
}

export default TaskForm;
