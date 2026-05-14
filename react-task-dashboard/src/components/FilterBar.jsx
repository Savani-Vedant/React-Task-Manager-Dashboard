const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Pending', value: 'pending' },
]

function FilterBar({
  filter,
  onFilterChange,
  searchTerm,
  onSearchChange,
  filteredCount,
}) {
  return (
    <section className="card">
      <h2>Search and Filter</h2>
      <div className="filter-grid">
        <div className="search-row">
          <input
            aria-label="Search tasks"
            className="search-input"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by title or description"
            type="search"
            value={searchTerm}
          />
          {searchTerm ? (
            <button
              className="btn ghost clear-btn"
              onClick={() => onSearchChange('')}
              type="button"
            >
              Clear
            </button>
          ) : null}
        </div>

        <div className="filter-buttons" role="group" aria-label="Filter tasks">
          {FILTERS.map((option) => (
            <button
              aria-pressed={filter === option.value}
              key={option.value}
              className={`btn ${filter === option.value ? 'active' : 'ghost'}`}
              onClick={() => onFilterChange(option.value)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <p className="results-count">Showing {filteredCount} task(s)</p>
    </section>
  )
}

export default FilterBar
