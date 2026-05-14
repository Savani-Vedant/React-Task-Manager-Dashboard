import { useState } from 'react'

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()

    if (!trimmedTitle) {
      return
    }

    onAddTask({
      title: trimmedTitle,
      description: trimmedDescription,
    })

    setTitle('')
    setDescription('')
  }

  return (
    <section className="card">
      <h2>Add Task</h2>
      <p className="form-helper">Add a quick task now and organize details later.</p>
      <form className="task-form" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Task title *</span>
          <input
            aria-label="Task title"
            maxLength={80}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Learn React hooks"
            required
            type="text"
            value={title}
          />
        </label>

        <label className="form-field">
          <span>Description</span>
          <textarea
            aria-label="Task description"
            maxLength={240}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="What is the next concrete step?"
            rows="3"
            value={description}
          />
        </label>

        <button className="btn" type="submit">
          Add task
        </button>
      </form>
    </section>
  )
}

export default TaskForm
