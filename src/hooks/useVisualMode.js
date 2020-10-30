import React, {useState} from "react"

const useVisualMode = function(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])


  // replace current mode in history 
  // with 
  // replace 
  /* 
mode = first 
history = [first]
mode = second 
history = [first, second]
mode = third 
[first, second, third]
------
splice(0,1)
  
  */ 
  function transition(newMode, replace) {
    if(replace) {
      history.pop();
      setMode(newMode);
      setHistory([...history, newMode]);
      // history[history.length - 1] = newMode;
      // setMode(history[history.length-1])
      //console.log(history);
    } else {
      setMode(newMode)
      setHistory([...history, newMode])
    }
  };

  function back () {
    if(history.length === 1) {
      setMode(history[0]);
    } else {
      history.pop()
      setHistory(history)
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back };
}


export {useVisualMode}