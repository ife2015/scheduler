import { useState, useEffect } from "react";
import axios from 'axios';

// imported functions
import { updateSpot } from "helpers/selectors.js";

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

  // put/save intereview details
  function bookInterview(id, interview, isCreate) {
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
        if(isCreate) {
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