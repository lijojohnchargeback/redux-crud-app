import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskCreate, taskList } from "../store/action/task";
const Task = () => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const dispatch = useDispatch();
  const taskStore = useSelector((state) => state.task);
  const { loading, tasks, task } = taskStore;
  const handleSubmit = async () => {
    const formData = { name, description };
    dispatch(taskCreate(formData));
    // dispatch(taskList());
    setName("");
    setDescription("");
  };
  React.useEffect(() => {
    let testinString = "This is just for test";
    dispatch(taskList(testinString));
  }, []);
  return (
    <Fragment>
      <h3>Create Task</h3>
      <input
        style={{ marginBottom: 20, height: 30 }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        style={{ marginBottom: 20, height: 30 }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Create</button>
      <h2> Task List</h2>
      {loading ? (
        <h1>This list is loading</h1>
      ) : (
        tasks.map((item) => {
          return (
            <Fragment key={item._id}>
              <h4>{item.name}</h4>
              {item.description}
            </Fragment>
          );
        })
      )}
    </Fragment>
  );
};

export default Task;
