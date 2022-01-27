


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


  const filteredDay = state.days.filter((weekday) => weekday.name === day)[0]; 



  if (!filteredDay) {
    return [];
  }
  filteredDay.interviewers.forEach((interviewer) => {
    const matchedInterviewer = state.interviewers[interviewer]; 

    if (matchedInterviewer) {
      filteredInterviewers.push(matchedInterviewer);
    }
  });

  console.log(filteredInterviewers)

  return filteredInterviewers;
}