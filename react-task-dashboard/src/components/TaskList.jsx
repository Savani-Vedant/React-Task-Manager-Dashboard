import TaskCard from './TaskCard'

function TaskList({ tasks, onToggleComplete, onDeleteTask, onEditTask }) {
  if (!tasks.length) {
    return (
      <section className="card">
        <h2>Tasks</h2>
        <p className="empty-state">No tasks found. Add one to get started.</p>
      </section>
    )
  }

  return (
    <section className="card">
      <h2>Tasks</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
            onToggleComplete={onToggleComplete}
            task={task}
          />
        ))}
      </div>
    </section>
  )
}

export default TaskList
