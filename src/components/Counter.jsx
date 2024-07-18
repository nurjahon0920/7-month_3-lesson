import React, { useState } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  useDocumentTitle(count);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default Counter;
