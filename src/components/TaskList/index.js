import {useContext} from 'react'
import {Link} from 'react-router-dom'
import TaskContext from '../TaskContext'
import './index.css'

function TaskList() {
  const {
    tasks,
    addTask,
    editTask,
    deleteTask,
    changeTaskStatus,
    showNotification,
  } = useContext(TaskContext)

  return (
    <div className="task-list-container">
      <h1>Task List</h1>
      <Link to="/summary">
        <p className="view-summary">View summary</p>
      </Link>
      <form
        onSubmit={e => {
          e.preventDefault()
          const newTask = {
            id: Date.now().toString(),
            name: e.target.elements.name.value,
            description: e.target.elements.description.value,
            dueDate: e.target.elements.dueDate.value,
            status: 'Not Started',
          }
          addTask(newTask)
        }}
      >
        <input type="text" name="name" placeholder="Enter Name" required />
        <input
          type="text"
          name="description"
          placeholder="Enter Description"
          required
        />

        <input type="date" name="dueDate" required />
        <div className="add-button">
          <button type="submit">Add Task</button>
        </div>
      </form>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className="task-item-container ">
            <div className="task-details-top-section">
              <div className="task-description-container">
                <div>
                  <Link to={`/task/${task.id}`}>
                    <p className="task-name">{task.name}</p>
                  </Link>
                </div>
                <div>
                  <p>{task.description}</p>
                </div>
                <div>
                  <p className={`task-status ${task.status}`}>{task.status}</p>
                </div>
              </div>

              <div className="action-container">
                <button
                  type="button"
                  onClick={() => changeTaskStatus(task.id, 'Not started')}
                  className="action-button"
                >
                  Not Started
                </button>
                <button
                  type="button"
                  onClick={() => changeTaskStatus(task.id, 'In Progress')}
                  className="action-button"
                >
                  In Progress
                </button>
                <button
                  type="button"
                  onClick={() => changeTaskStatus(task.id, 'Completed')}
                  className="action-button"
                >
                  Completed
                </button>
              </div>
            </div>

            <div>
              <Link to={`/task/${task.id}`}>
                <button type="button" onClick={() => editTask(task)}>
                  Edit
                </button>
              </Link>
              <button
                type="button"
                onClick={() => deleteTask(task.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showNotification && (
        <div className="notification">Successfully saved!</div>
      )}
    </div>
  )
}

export default TaskList
