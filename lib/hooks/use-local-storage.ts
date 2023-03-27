import { useEffect } from 'react'
import { useState } from 'react'
const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState(initialValue)

  useEffect(() => {
    // Retrieve stored value from localStorage
    const item = window.localStorage.getItem(key)
    if (item) {
      setStoredValue(JSON.parse(item))
    }
  }, [key])

  const setValue = (value: T) => {
    // Save to state
    setStoredValue(value)
    // save to localStorage
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  return [storedValue, setValue]
}

export default useLocalStorage
