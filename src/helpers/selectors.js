


export function getAppointmentsForDay(state, day) {

  const filteredAppointments = [];

  const filteredDay = state.days.filter((weekday) => weekday.name === day)[0]; 
  if (!filteredDay) {
    return [];
  }

  filteredDay.appointments.forEach((appointment) => {
    const matchedAppointment = state.appointments[appointment]; 
    if (matchedAppointment) {
      filteredAppointments.push(matchedAppointment);
    }
  });

  return filteredAppointments;
}



export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let interviewer = state.interviewers[interview.interviewer]; 
  return { ...interview, interviewer }; 
}

export function getInterviewersForDay(state, day) {
  const filteredInterviewers = [];


  const filteredInterviewer = state.days.filter((weekday) => weekday.name === day)[0]; 

  if (!filteredInterviewer) {
    return [];
  }
  filteredInterviewer.appointments.forEach((appointment) => {
    const matchedInterviewer = state.appointments[appointment]; 
    if (matchedInterviewer) {
      filteredInterviewers.push(matchedInterviewer);
    }
  });

  return filteredInterviewers;
}