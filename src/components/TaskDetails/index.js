import {useContext, useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import TaskContext from '../TaskContext'
import './index.css'

function TaskDetails() {
  const {tasks, editTask, changeTaskStatus, setShowNotification} = useContext(
    TaskContext,
  )
  const {id} = useParams()
  const history = useHistory()
  const requiredTask = tasks.find(task => task.id === id)
  const [task, setTask] = useState(null)

  useEffect(() => {
    const foundTask = tasks.find(eachTask => eachTask.id === id)
    setTask(foundTask)
  }, [tasks, id])

  if (task === null) {
    return <div>Loading task details...</div>
  }

  if (!task) {
    return <div>No Tasks Available</div>
  }

  const handleSave = event => {
    event.preventDefault()
    const updatedTask = {
      ...task,
      name: event.target.elements.name.value,
      description: event.target.elements.description.value,
      dueDate: event.target.elements.dueDate.value,
    }
    editTask(updatedTask)
    setShowNotification(true)
    history.push('/')
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  return (
    <div className="task-details">
      <h2>Task Details</h2>
      <form onSubmit={handleSave}>
        <label htmlFor="taskName" className="label">
          Task name:
        </label>
        <input
          type="text"
          name="name"
          id="taskName"
          defaultValue={requiredTask.name}
          required
        />
        <label htmlFor="taskDescription" className="label">
          Task Description:
        </label>
        <input
          type="text"
          name="description"
          id="taskDescription"
          defaultValue={requiredTask.description}
          required
        />
        <label htmlFor="dueDate" className="label">
          Due Date:
        </label>
        <input
          type="date"
          name="dueDate"
          id="dueDate"
          defaultValue={requiredTask.dueDate}
          required
        />
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
        <div>
          <button type="submit" id="save-button">
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              history.push('/')
            }}
            id="back-button"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskDetails
