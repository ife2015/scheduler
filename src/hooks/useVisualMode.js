import { useState } from "react";

const useVisualMode = function(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace) {
    if (replace) {
      setMode(newMode);
      setHistory(history => [...history, newMode]);
    } else {
      setMode(newMode);
      setHistory([...history, newMode]);
    }
  }
  
  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length-1]);
    }
  }
  return { mode, transition, back };
};


export { useVisualMode };