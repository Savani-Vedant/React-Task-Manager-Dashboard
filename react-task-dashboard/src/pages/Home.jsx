import { useEffect, useMemo, useState } from 'react'
import FilterBar from '../components/FilterBar'
import Navbar from '../components/Navbar'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import useLocalStorage from '../hooks/useLocalStorage'
import { fetchMotivationalQuote } from '../services/quoteService'

function Home() {
  const [tasks, setTasks] = useLocalStorage('task-manager.tasks', [])
  const [darkMode, setDarkMode] = useLocalStorage('task-manager.darkMode', false)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [quote, setQuote] = useState({
    text: 'Small steps daily become strong habits over time.',
    author: 'Productivity Note',
  })
  const [isQuoteLoading, setIsQuoteLoading] = useState(true)
  const [quoteError, setQuoteError] = useState('')

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks],
  )

  const filteredTasks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return tasks.filter((task) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'completed' && task.completed) ||
        (filter === 'pending' && !task.completed)

      const taskText = `${task.title} ${task.description}`.toLowerCase()
      const matchesSearch = taskText.includes(normalizedSearch)

      return matchesFilter && matchesSearch
    })
  }, [filter, searchTerm, tasks])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const loadQuote = async () => {
    setIsQuoteLoading(true)
    setQuoteError('')

    try {
      const nextQuote = await fetchMotivationalQuote()
      setQuote(nextQuote)
    } catch {
      setQuoteError('Quote unavailable right now. Stay focused and keep moving.')
    } finally {
      setIsQuoteLoading(false)
    }
  }

  useEffect(() => {
    let cancelled = false

    const loadInitialQuote = async () => {
      try {
        const nextQuote = await fetchMotivationalQuote()
        if (!cancelled) {
          setQuote(nextQuote)
          setQuoteError('')
        }
      } catch {
        if (!cancelled) {
          setQuoteError('Quote unavailable right now. Stay focused and keep moving.')
        }
      } finally {
        if (!cancelled) {
          setIsQuoteLoading(false)
        }
      }
    }

    loadInitialQuote()

    return () => {
      cancelled = true
    }
  }, [])

  const handleAddTask = ({ title, description }) => {
    const nextTask = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      createdAt: Date.now(),
    }

    setTasks((previousTasks) => [nextTask, ...previousTasks])
  }

  const handleDeleteTask = (taskId) => {
    setTasks((previousTasks) => previousTasks.filter((task) => task.id !== taskId))
  }

  const handleToggleComplete = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const handleEditTask = (taskId, updates) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              ...updates,
              updatedAt: Date.now(),
            }
          : task,
      ),
    )
  }

  return (
    <main className="dashboard-shell">
      <Navbar
        completedTasks={completedTasks}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((previous) => !previous)}
        totalTasks={tasks.length}
      />

      <section className="card quote-panel" aria-live="polite">
        <div>
          <p className="eyebrow">Motivational quote</p>
          <blockquote>{isQuoteLoading ? 'Loading quote...' : quote.text}</blockquote>
          <p className="quote-author">- {quote.author}</p>
          {quoteError ? <p className="quote-error">{quoteError}</p> : null}
        </div>
        <button className="btn ghost" onClick={loadQuote} type="button">
          Refresh quote
        </button>
      </section>

      <section className="content-layout">
        <aside className="left-column">
          <TaskForm onAddTask={handleAddTask} />
        </aside>

        <section className="right-column">
          <FilterBar
            filter={filter}
            filteredCount={filteredTasks.length}
            onFilterChange={setFilter}
            onSearchChange={setSearchTerm}
            searchTerm={searchTerm}
          />

          <TaskList
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
            onToggleComplete={handleToggleComplete}
            tasks={filteredTasks}
          />
        </section>
      </section>
    </main>
  )
}

export default Home
