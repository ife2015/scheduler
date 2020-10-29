export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day

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

}