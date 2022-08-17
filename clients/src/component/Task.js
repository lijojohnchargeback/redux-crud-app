import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  taskByid,
  taskCreate,
  taskDelete,
  taskEdit,
  taskList,
} from "../store/action/task";
const Task = () => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [showEdit, setShowEdit] = React.useState(false);
  const [editId, setEditId] = React.useState("");
  const dispatch = useDispatch();
  const taskStore = useSelector((state) => state.task);
  const { loading, tasks, task } = taskStore;
  const handleSubmit = async () => {
    const formData = { name, description };
    dispatch(taskCreate(formData));
    setName("");
    setDescription("");
  };

  React.useEffect(() => {
    let testinString = "This is just for test";
    dispatch(taskList(testinString));
  }, []);

  const handleEdit = async (item) => {
    dispatch(taskByid(item._id));
    setShowEdit(true);
    setEditId(item._id);
  };
  React.useEffect(() => {
    task.name && setName(task.name);
    task.description && setDescription(task.description);
  }, [task]);
  const handleEditSubmit = () => {
    const formData = { name, description };
    dispatch(taskEdit(editId, formData));
    setName("");
    setDescription("");
  };
  const handleDelete = (id) => {
    dispatch(taskDelete(id));
  };
  return (
    <Fragment>
      <h3>Create Task</h3>
      <input
        style={{ marginBottom: 20, height: 30 }}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="title"
      />
      <br />
      <input
        style={{ marginBottom: 20, height: 30 }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="description"
      />
      <br />
      {showEdit ? (
        <button onClick={() => handleEditSubmit()}>Edit</button>
      ) : (
        <button onClick={handleSubmit}>Create</button>
      )}
      <h2> Task List</h2>
      {loading ? (
        <h1>This list is loading</h1>
      ) : (
        tasks.map((item) => {
          return (
            <Fragment key={item._id}>
              <h4>{item.name}</h4>
              {item.description}
              <button
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  marginLeft: 20,
                }}
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </Fragment>
          );
        })
      )}
    </Fragment>
  );
};

export default Task;
