import { useEffect, useState } from 'react'

function parseStoredValue(value, fallbackValue) {
  try {
    return value ? JSON.parse(value) : fallbackValue
  } catch {
    return fallbackValue
  }
}

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    const item = window.localStorage.getItem(key)
    return parseStoredValue(item, initialValue)
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue))
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
