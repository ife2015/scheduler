import { useState, useEffect } from "react";
import axios from 'axios';

function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then(all => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  // updates the spots on the nav in real-time
  const updateSpot = function(day, days, keyword) {
    if (keyword === "less") {
      for (let dayDetail of days) {
        if (dayDetail.name === day) {
          dayDetail.spots -= 1;
        }
      }
    }

    if (keyword === "more") {
      for (let dayDetail of days) {
        if (dayDetail.name === day) {
          dayDetail.spots += 1;
        }
      }
    }
  };

  // put/save intereview details
  function bookInterview(id, interview, isEdit) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({ ...state, appointments });

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        if (isEdit) {
          setState({ ...state, appointments });
        } else {
          setState({ ...state, appointments });
          updateSpot(state.day, state.days, "less");
          setState({ ...state, appointments });
        }
      });
  }

  // permanently deletes interview details
  function cancelInterview(id) {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        updateSpot(state.day, state.days, "more");
        setState({ ...state });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}


export { useApplicationData };