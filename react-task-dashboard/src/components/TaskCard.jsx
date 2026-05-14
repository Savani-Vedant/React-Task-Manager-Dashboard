import { useState } from 'react'

function TaskCard({ task, onToggleComplete, onDeleteTask, onEditTask }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [editedDescription, setEditedDescription] = useState(task.description)

  const handleSave = () => {
    const nextTitle = editedTitle.trim()
    const nextDescription = editedDescription.trim()

    if (!nextTitle) {
      return
    }

    onEditTask(task.id, {
      title: nextTitle,
      description: nextDescription,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedTitle(task.title)
    setEditedDescription(task.description)
    setIsEditing(false)
  }

  const handleStartEditing = () => {
    setEditedTitle(task.title)
    setEditedDescription(task.description)
    setIsEditing(true)
  }

  return (
    <article className={`task-card ${task.completed ? 'is-complete' : ''}`}>
      {isEditing ? (
        <div className="task-edit-form">
          <label className="form-field">
            <span>Edit title</span>
            <input
              maxLength={80}
              onChange={(event) => setEditedTitle(event.target.value)}
              type="text"
              value={editedTitle}
            />
          </label>
          <label className="form-field">
            <span>Edit description</span>
            <textarea
              maxLength={240}
              onChange={(event) => setEditedDescription(event.target.value)}
              rows="2"
              value={editedDescription}
            />
          </label>
        </div>
      ) : (
        <div className="task-copy">
          <h3>
            <span className={`status-dot ${task.completed ? 'done' : 'pending'}`} />
            {task.title}
          </h3>
          {task.description ? <p>{task.description}</p> : null}
        </div>
      )}

      <div className="task-actions">
        {isEditing ? (
          <>
            <button className="btn" onClick={handleSave} type="button">
              Save
            </button>
            <button className="btn ghost" onClick={handleCancel} type="button">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="btn ghost" onClick={handleStartEditing} type="button">
              Edit
            </button>
            <button
              aria-pressed={task.completed}
              className="btn ghost"
              onClick={() => onToggleComplete(task.id)}
              type="button"
            >
              {task.completed ? 'Mark pending' : 'Mark complete'}
            </button>
          </>
        )}
        <button className="btn danger" onClick={() => onDeleteTask(task.id)} type="button">
          Delete
        </button>
      </div>
    </article>
  )
}

export default TaskCard
