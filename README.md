# React Task Manager Dashboard

A lightweight task manager dashboard built with React and Vite. Manage tasks with an intuitive UI, filter and add tasks, and persist them in local storage.

## Demo

- Live locally: run the app with `npm run dev` and open the URL shown by Vite.

## Features

- Create, edit and delete tasks
- Filter tasks by status or search text
- Responsive dashboard layout with task cards
- Persist tasks using a `useLocalStorage` hook

## Tech Stack

- React (Vite)
- JavaScript (ESLint)
- CSS for styling

## Quick Start

1. Install dependencies

```bash
npm install
```

2. Run the dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview production build

```bash
npm run preview
```

## Project Structure

- `index.html` — Vite entry
- `src/main.jsx` — React entry
- `src/App.jsx` — App root
- `src/components/` — UI components (FilterBar, Navbar, TaskCard, TaskForm, TaskList)
- `src/hooks/useLocalStorage.js` — localStorage helper hook
- `src/pages/Home.jsx` — main dashboard page
- `src/services/quoteService.js` — example service

## Usage

- Open the dashboard and use the form to add tasks.
- Use the filter bar to search or filter by status.
- Tasks are stored in browser localStorage and will persist between reloads.

## Notes

- This project is a simple demo/dashboard intended for learning and small projects.


