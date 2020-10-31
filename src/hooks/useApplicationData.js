import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayListItem from "components/DayListItem"

function useApplicationData () {
  
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
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);
  
  function bookInterview(id, interview) {
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
        setState({ ...state, appointments });
        console.log(appointment.id);
        /*
          if(appointment.id){
          <DayListItem 
          key = {item.id}
          name={item.name} 
          spots={item.spots - 1} 
          selected={item.name === props.day}
          setDay={props.setDay}  
        />
          }
        
        */
      })
  }

  function cancelInterview(id) {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`);
  }

  return {state, setDay, bookInterview, cancelInterview };
}


export {useApplicationData}