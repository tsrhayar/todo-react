import React from "react";

const Tasks = ({
  tasks,
  handleUpdateTaskStatus,
  handleDeleteTask,
  handleUpdateTaskTitle,
  handleUpdateTaskDate,
  handleEditTask,
  handleConfirmEditTask,
  handleAddUser,
  handleAddUserToTask,
  setUser,
  handleDeleteUser,
}) => {
  return (
    <tbody className="table-group-divider">
      {!tasks.length ? (
        <tr>
          <td colSpan={5} className="text-center">
            Pas de taches
          </td>
        </tr>
      ) : (
        tasks.map((task, index) => (
          <tr key={index}>
            {task.isEdited ? (
              <>
                <td>
                  <input
                    type="text"
                    value={task.titleTask}
                    onChange={(e) => handleUpdateTaskTitle(task.id, e.target.value)}
                    className="form-control form-control-sm"
                    id="task-name"
                    placeholder="Nom du tache"
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={task.dateTask}
                    onChange={(e) => handleUpdateTaskDate(task.id, e.target.value)}
                    className="form-control form-control-sm"
                    id="task-name"
                    placeholder="Nom du tache"
                  />
                </td>
              </>
            ) : (
              <>
                <td>{task.titleTask}</td>
                <td>{task.dateTask}</td>
              </>
            )}
            <td>
              {task.users.map((user, userIndex) => (
                <div key={userIndex}>
                  <span className="badge rounded-pill text-bg-dark" style={{ minWidth: 150 }}>
                    {user}
                  </span>
                  {task.isEdited && (
                    <span
                      className="badge rounded-pill text-bg-danger ms-1 cursor-pointer"
                      onClick={() => handleDeleteUser(task.id, user)}
                    >
                      Supprimer
                    </span>
                  )}
                </div>
              ))} {
                !task.users.length && !task.isEdited && <span> -- </span>
              }
              {task.isAddUser && task.isEdited  ? (
                <div className="row mt-1">
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e) => setUser(e.target.value)}
                    />
                  </div>
                  <div className="col-4">
                    <button className="btn btn-outline-success btn-sm" onClick={() => handleAddUser(task.id)}>
                      Confirmer
                    </button>
                  </div>
                </div>
              ) : (
                task.isEdited && (
                  <span
                    className="badge rounded-pill text-bg-success ms-1 cursor-pointer"
                    onClick={() => handleAddUserToTask(task.id)}
                  >
                    Ajouter
                  </span>
                )
              )}
            </td>
            <td>
              {task.isEdited ? (
                <select
                  className="form-select form-select-sm"
                  defaultValue={task.status}
                  value={task.status}
                  onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}
                >
                  <option value="todo">À faire</option>
                  <option value="active">En cours</option>
                  <option value="completed">Terminé</option>
                </select>
              ) : (
                <span
                  style={{
                    width: 80,
                    backgroundColor:
                      task.status === "todo" ? "#4fc8c0" : task.status === "active" ? "#f89899" : "#f16eb0",
                  }}
                  className={`badge rounded-pill`}
                >
                  {task.status === "todo" ? "À faire" : task.status === "active" ? "En cours" : "Terminé"}
                </span>
              )}
            </td>
            <td>
              {task.isEdited ? (
                <button className="btn btn-success btn-sm me-2" style={{backgroundColor:"#5b790f"}} onClick={() => handleConfirmEditTask(task.id)}>
                  Confirmer
                </button>
              ) : (
                <>
                  <button className="btn btn-success btn-sm me-2" style={{backgroundColor:"#5b790f"}} onClick={() => handleEditTask(task.id)}>
                    Modifier
                  </button>
                  <button className="btn btn-secondary btn-sm"  style={{backgroundColor:"#252f38"}}  onClick={() => handleDeleteTask(task.id)}>
                    Supprimer
                  </button>
                </>
              )}
            </td>
          </tr>
        ))
      )}
    </tbody>
  );
};

export default Tasks;
