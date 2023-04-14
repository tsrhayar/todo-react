import React from "react";

const Tasks = ({
  tasks,
  handleUpdateTaskStatus,
  handleDeleteTask,
  handleUpdateTaskTitle,
  handleUpdateTaskDate,
  handleEditTask,
  handleConfirmEditTask,
}) => {
  return (
    <tbody className="table-group-divider">
      {!tasks.length ? (
        <tr>
          <td colSpan={4} className="text-center">
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
                  style={{ width: 80 }}
                  className={`badge rounded-pill text-bg-${
                    task.status === "todo" ? "secondary" : task.status === "active" ? "info" : "success"
                  }`}
                >
                  {task.status === "todo" ? "À faire" : task.status === "active" ? "En cours" : "Terminé"}
                </span>
              )}
            </td>
            <td>
              {task.isEdited ? (
                <button className="btn btn-success btn-sm me-2" onClick={() => handleConfirmEditTask(task.id)}>
                  Confirmer
                </button>
              ) : (
                <>
                  <button className="btn btn-primary btn-sm me-2" onClick={() => handleEditTask(task.id)}>
                    Modifier
                  </button>
                  <button className="btn btn-danger btn-sm " onClick={() => handleDeleteTask(task.id)}>
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
