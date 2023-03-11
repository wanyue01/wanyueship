import { useState, useEffect } from "react";

function useDebounce(value: string, delay: number = 300) {
  const [debounceValue, setDebounceVaule] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceVaule(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    }
  }, [value, delay]);
  return debounceValue;
}

export default useDebounce;