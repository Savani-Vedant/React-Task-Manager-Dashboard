function Navbar({ darkMode, onToggleTheme, totalTasks, completedTasks }) {
  const pendingTasks = totalTasks - completedTasks

  return (
    <header className="navbar card">
      <div>
        <p className="eyebrow">React Task Manager</p>
        <h1>Productivity Dashboard</h1>
      </div>
      <div className="navbar-actions">
        <p className="task-stats">
          {completedTasks}/{totalTasks} completed · {pendingTasks} pending
        </p>
        <button
          aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          aria-pressed={darkMode}
          className="btn ghost"
          onClick={onToggleTheme}
          type="button"
        >
          {darkMode ? 'Light mode' : 'Dark mode'}
        </button>
      </div>
    </header>
  )
}

export default Navbar
