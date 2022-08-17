import {
  TASK_BY_ID,
  TASK_CREATE,
  TASK_DELETE,
  TASK_EDIT,
  TASK_LIST,
} from "../types";

const initialValue = {
  tasks: [],
  task: {},
  loading: true,
};

const taskReducer = (state = initialValue, action) => {
  switch (action.type) {
    case TASK_CREATE:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case TASK_LIST:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };
    case TASK_BY_ID:
      return {};
    case TASK_EDIT:
      return {};
    case TASK_DELETE:
      return {};
    default:
      return state;
  }
};

export default taskReducer;
