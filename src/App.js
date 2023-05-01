import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import Tasks from "./components/Tasks";

const initialState = JSON.parse(localStorage.getItem("tasks")) || [];
// const initialState = [
//   {
//     id: "6d8562c1-6968-4784-a368-b381d4557cdb",
//     titleTask: "Caldwell Kirkland",
//     dateTask: "2016-06-18",
//     status: "todo",
//     users: ["Taha Srhayar", "Hamza Okar", "dfdfdf gdghfg"],
//     isEdited: false,
//   },
//   {
//     id: "fbeff785-013a-474f-9545-ba1a20a5e561",
//     titleTask: "Grant Whitley",
//     dateTask: "2011-09-10",
//     status: "todo",
//     users: [],
//     isEdited: false,
//   },
// ];

function App() {
  const [tasks, setTasks] = useState(initialState);
  const [titleTask, setTitleTask] = useState("");
  const [dateTask, setDateTask] = useState("");
  const [showClass, setShowClass] = useState("all");
  const [dataToSend, setDataToSend] = useState([]);
  const [user, setUser] = useState("ahmed");

  // handle add user
  const handleAddUser = (id) => {
    if (user) {
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          task.users.push(user);
        }
        return task;
      });
      setTasks(newTasks);
      setUser("");
    }

    handleConfirmAddUserTask(id);
  };

  const handleDeleteUser = (taskId, userName) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.users = task.users.filter((e) => e !== userName);
      }
      return task;
    });
    setTasks(newTasks);

    // handleConfirmAddUserTask(id);
  };

  const handleAddTask = () => {
    if (!titleTask || !dateTask) {
      alert("Veuillez remplir les champs");
    } else {
      let id = uuid();
      const newTodo = { id, titleTask, dateTask, status: "todo", users: [], isEdited: false, isAddUser: false };
      setTasks(
        [...tasks, newTodo].sort((a, b) => {
          return b.dateTask - a.dateTask;
        })
      );
      if (showClass !== "all" && showClass !== "todo") {
        setShowClass("todo");
      }
      setTitleTask("");
      setDateTask("");
    }
  };

  const handleUpdateTaskStatus = (id, val) => {
    console.log(id, val);
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.status = val;
      }
      return task;
    });
    setTasks(newTasks);

    handleConfirmEditTask(id);
  };

  const handleUpdateTaskDate = (id, val) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.dateTask = val;
      }
      return task;
    });
    setTasks(newTasks);
  };

  const handleUpdateTaskTitle = (id, val) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.titleTask = val;
      }
      return task;
    });
    setTasks(newTasks);
  };

  const handleEditTask = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isEdited = true;
      }
      return task;
    });
    setTasks(newTasks);
  };

  const handleAddUserToTask = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isAddUser = true;
      }
      return task;
    });
    setTasks(newTasks);
  };

  const handleConfirmEditTask = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isEdited = false;
      }
      return task;
    });
    setTasks(newTasks);
  };

  const handleConfirmAddUserTask = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isAddUser = false;
      }
      return task;
    });
    setTasks(newTasks);
  };

  const handleDeleteTask = (id) => {
    const newTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(newTasks);
  };

  useEffect(() => {
    if (showClass !== "all") {
      const dataFilted = tasks.filter((e) => e.status === showClass);
      setDataToSend(dataFilted);
    } else {
      setDataToSend(tasks);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks, showClass]);

  return (
    <div className="container mt-5">
      <div className="d-flex">
        <img src="https://www.cdg.ma/themes/cdg/logo.svg" alt="" className="m-auto" />
      </div>
      <h1 className="text-center">Gestions des taches</h1>
      <div className="row">
        <div className="col-5">
          <label htmlFor="task-name" className="form-label">
            Nom du tache
          </label>
          <input
            type="text"
            value={titleTask}
            onChange={(e) => setTitleTask(e.target.value)}
            className="form-control"
            id="task-name"
            placeholder="Nom du tache"
          />
        </div>
        <div className="col-5">
          <label htmlFor="task-date" className="form-label">
            Date du tache
          </label>
          <input
            type="date"
            value={dateTask}
            onChange={(e) => setDateTask(e.target.value)}
            className="form-control"
            id="task-date"
            placeholder="Nom du tache"
          />
        </div>
        <div className="col-2">
          <div className="d-flex h-100">
            <button className="btn btn-outline-primary mt-auto w-100" onClick={handleAddTask}>
              Ajouter
            </button>
          </div>
        </div>
      </div>
      <hr />
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            style={{ width: 200 }}
            className={`nav-link ${showClass === "all" && "active"}`}
            onClick={() => setShowClass("all")}
          >
            Tous
          </button>
        </li>
        <li className="nav-item">
          <button
            style={{ width: 200 }}
            className={`nav-link ${showClass === "todo" && "active"}`}
            onClick={() => setShowClass("todo")}
          >
            À faire
          </button>
        </li>
        <li className="nav-item">
          <button
            style={{ width: 200 }}
            className={`nav-link ${showClass === "active" && "active"}`}
            onClick={() => setShowClass("active")}
          >
            En cours
          </button>
        </li>
        <li className="nav-item">
          <button
            style={{ width: 200 }}
            className={`nav-link ${showClass === "completed" && "active"}`}
            onClick={() => setShowClass("completed")}
          >
            Terminé
          </button>
        </li>
      </ul>

      <table className="table table-striped table-bordered table-hover mt-2">
        <thead className="table-dark">
          <tr>
            <th>Titre</th>
            <th>Date</th>
            <th>Personnes</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <Tasks
          tasks={dataToSend}
          handleUpdateTaskStatus={handleUpdateTaskStatus}
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
          handleUpdateTaskTitle={handleUpdateTaskTitle}
          handleUpdateTaskDate={handleUpdateTaskDate}
          handleConfirmEditTask={handleConfirmEditTask}
          handleAddUser={handleAddUser}
          setUser={setUser}
          handleAddUserToTask={handleAddUserToTask}
          handleDeleteUser={handleDeleteUser}
        />
      </table>
    </div>
  );
}

export default App;
