// return array of appointments in an array with booking information
const getAppointmentsForDay = function(state, day) {

  let emptyArray = [];
  const filteredDay = state.days.filter(itemBooking => {
    return itemBooking.name === day;
  });

  if (filteredDay.length === 0) {
    return filteredDay;
  } else {
    filteredDay[0].appointments.forEach(appointmentsItem => {
      for (let id in state.appointments) {
        if (appointmentsItem === Number(id)) {
          emptyArray.push(state.appointments[id]);
        }
      }
    });
  }
  return emptyArray;
};

// returns student and interviewer details
const getInterview = function(state, interview) {
  if (interview) {
    const interviewerID = interview.interviewer;
    const interviewerCat = state.interviewers;
    const interviewDetails = interviewerCat[interviewerID];
    return { "student": interview.student, "interviewer": interviewDetails }
  } else {
    return null;
  }
};

// returns interviewier details for the selected interviewer
const getInterviewersForDay = function(state, day) {

  const emptyArray = [];
  const filteredDay = state.days.filter(itemBooking => {
    return itemBooking.name === day;
  });

  if (filteredDay.length === 0) {
    return [];
  } else {
    filteredDay[0].interviewers.forEach(interviewNum => {
      for (let id in state.interviewers) {
        if (interviewNum === Number(id)) {
          emptyArray.push(state.interviewers[id]);
        }
      }
    }
    );
  }
  return emptyArray;
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay }