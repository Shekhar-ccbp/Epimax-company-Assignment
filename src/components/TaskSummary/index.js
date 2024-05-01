import {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import TaskContext from '../TaskContext'
import './index.css'

function TaskSummary() {
  const {tasks} = useContext(TaskContext)
  const history = useHistory()

  const taskCounts = {
    total: tasks.length,
    notStarted: tasks.filter(task => task.status === 'Not started').length,
    inProgress: tasks.filter(task => task.status === 'In Progress').length,
    completed: tasks.filter(task => task.status === 'Completed').length,
  }

  return (
    <div className="task-summary">
      <h2>Task Summary</h2>
      <div>
        <div>
          <p>Total Tasks</p>
          <span className="count">{taskCounts.total}</span>
        </div>
        <div>
          <p>Not Started</p>
          <span className="count">{taskCounts.notStarted}</span>
        </div>
        <div>
          <p>In Progress</p>
          <span className="count">{taskCounts.inProgress}</span>
        </div>
        <div>
          <p>Completed</p>
          <span className="count">{taskCounts.completed}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          history.push('/')
        }}
      >
        Back
      </button>
    </div>
  )
}

export default TaskSummary
