import { useState, useEffect } from 'react'

function getStorageValue(key, defaultValue) {
  // getting stored value
  const saved = localStorage.getItem(key)
  const initial = JSON.parse(saved)
  return initial || defaultValue
}

const useStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue)
  })

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value))
    if (key === "users") {
      console.log("key", key);
      console.log("JSON.stringify(value)", JSON.stringify(value));
    }
  }, [key, value])

  return [value, setValue]
}

export default useStorage
