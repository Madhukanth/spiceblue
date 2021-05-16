import axios from "axios";

// Setting default baseURL and header
axios.defaults.baseURL = "https://stage.api.sloovi.com";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.REACT_APP_TOKEN}`;

export const getUser = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/user",
    });

    return { error: null, ...res.data.results };
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export const getTasks = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/task/lead_58be137bfde045e7a0c8d107783c4598",
    });

    return { error: null, ...res.data.results };
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export const postTask = async (body) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/task/lead_58be137bfde045e7a0c8d107783c4598",
      data: body,
    });

    return { error: null, ...res.data.results };
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export const getTask = async (taskID) => {
  try {
    const res = await axios({
      method: "GET",
      url: `/lead_58be137bfde045e7a0c8d107783c4598/${taskID}`,
    });

    return { error: null, ...res.data };
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export const putTask = async (taskID, body) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `/task/lead_58be137bfde045e7a0c8d107783c4598/${taskID}`,
      data: body,
    });

    return { error: null, ...res.data };
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export const deleteTask = async (taskID) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `/task/lead_58be137bfde045e7a0c8d107783c4598/${taskID}`,
    });

    return { error: null, ...res.data };
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};
