import {useState} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import TaskList from './components/TaskList'
import TaskDetails from './components/TaskDetails'
import TaskSummary from './components/TaskSummary'
import TaskContext from './components/TaskContext'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [showNotification, setShowNotification] = useState(false)

  const addTask = newTask => {
    setTasks([...tasks, newTask])
  }

  const editTask = updatedTask => {
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task,
    )
    setTasks(updatedTasks)
  }

  const deleteTask = taskId => {
    const updatedTasks = tasks.filter(task => task.id !== taskId)
    setTasks(updatedTasks)
  }

  const changeTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? {...task, status: newStatus} : task,
    )
    setTasks(updatedTasks)
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        deleteTask,
        changeTaskStatus,
        showNotification,
        setShowNotification,
      }}
    >
      <BrowserRouter>
        <div className="app-container">
          <h1>Task Management App</h1>
          <div className="content-container">
            <Switch>
              <Route path="/" exact component={TaskList} />
              <Route path="/task/:id" component={TaskDetails} />
              <Route path="/summary" component={TaskSummary} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </TaskContext.Provider>
  )
}

export default App
