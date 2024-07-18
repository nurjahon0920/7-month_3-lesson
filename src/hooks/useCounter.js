import { useState } from "react";

const useCounter = (initialCount) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setCount((prev) => prev - 1);
  };

  const reset = () => {
    setCount(initialCount);
  };

  return [count, increment, decrement, reset];
};

export default useCounter;
