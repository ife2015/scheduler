import { useState } from "react"

const useVisualMode = function(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  function transition(newMode, replace) {
    if (replace) {
      //history.pop();
      console.log(history)
      setMode(newMode);
      setHistory(history => [...history, newMode]);
      console.log(history)
    } else {
      setMode(newMode)
      setHistory([...history, newMode])
    }
  };

  //["SHOW", "CONFIRM", "DELETING", "ERROR_DELETE"]
  function back() {
    if (history.length === 1) {
      console.log(history);
      setMode(history[0]);
    } else {
      history.pop()
      setHistory(history)
      if (history.includes("DELETING")) {
        setMode(history[0]);
      } else {
        setMode(history[history.length - 1]);
      }
    }
  }
  return { mode, transition, back };
}


export { useVisualMode }