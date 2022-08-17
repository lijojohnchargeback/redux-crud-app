//create

import axios from "axios";
import {
  TASK_BY_ID,
  TASK_CREATE,
  TASK_DELETE,
  TASK_EDIT,
  TASK_LIST,
} from "../types";

export const taskCreate = (formData) => async (dispatch) => {
  const res = await axios.post("http://localhost:8000/api/create", formData);
  dispatch({
    type: TASK_CREATE,
    payload: res.data,
  });
};
// list
export const taskList = (testinString) => async (dispatch) => {
  const res = await axios.get("http://localhost:8000/api/list");
  dispatch({
    type: TASK_LIST,
    payload: res.data,
    sting: testinString,
  });
};

// task by id

export const taskByid = (id) => async (dispatch) => {
  const res = await axios.get(`http://localhost:8000/api/task/${id}`);
  dispatch({
    type: TASK_BY_ID,
    payload: res.data,
    id: id,
  });
};

//edit
export const taskEdit = (id, formData) => async (dispatch) => {
  const res = await axios.put(`http://localhost:8000/api/task/${id}`, formData);
  dispatch({
    type: TASK_EDIT,
    payload: res.data,
  });
};

//delete
export const taskDelete = (id) => async (dispatch) => {
  const res = await axios.put(`http://localhost:8000/api/task/${id}`);
  dispatch({
    type: TASK_DELETE,
    payload: res.data,
  });
};
