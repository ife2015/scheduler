
const getAppointmentsForDay = function(state, day) {

  let emptyArray = [];
  const filteredDay = state.days.filter(itemBooking => {
    return itemBooking.name === day; 
  });
  
  if(filteredDay.length === 0) {
    return filteredDay;
  } else {
    filteredDay[0].appointments.forEach(appointmentsItem => {
      for(let id in state.appointments) {
        if(appointmentsItem === Number(id)) {
          emptyArray.push(state.appointments[id]);
        }
      }
    });
  }
  return emptyArray;
};

const getInterview = function(state, interview) {
  
  if(interview) {
    const interviewerID = interview.interviewer; 
    const interviewerCat = state.interviewers;
    const interviewDetails = interviewerCat[interviewerID.toString()]; 
    return {"student": interview.student, "interviewer": interviewDetails}
  } else {
    return null;
  }

}

const getInterviewersForDay = function(state, day) {

  let emptyArray = [];
  const filteredDay = state.days.filter(itemBooking => {
    return itemBooking.name === day; 
  });
  
  if(filteredDay.length === 0) {
    return filteredDay;
  } else {
    filteredDay[0].appointments.forEach(appointmentsItem => {
      for(let id in state.appointments) {
        if(appointmentsItem === Number(id)) {
          emptyArray.push(state.appointments[id]);
        }
      }
    });
  }
  return emptyArray;
};

export {getAppointmentsForDay, getInterview, getInterviewersForDay}