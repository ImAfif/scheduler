import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [], 
    appointments: {}, 
    interviewers: {}, 
    cancelInterview: {},
  });

 
  const setDay = (day) => setState((prev) => ({ ...prev, day })); 

  useEffect(() => {
    const fetchDays = axios.get("http://localhost:8001/api/days");
    const fetchAppointments = axios.get(
      "http://localhost:8001/api/appointments"
    );
    const fetchInterviewers = axios.get(
      "http://localhost:8001/api/interviewers"
    );

    Promise.all([
      Promise.resolve(fetchDays),
      Promise.resolve(fetchAppointments),
      Promise.resolve(fetchInterviewers),
    ])
      .then((response) => {
        setState((prev) => ({
          ...prev,
          days: response[0].data,
          appointments: response[1].data,
          interviewers: response[2].data,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = copyDayState(state.days, appointments);

    return axios
      .put(`/api/appointments/${id}`, appointment) 
      .then(() => {
        setState({ ...state, appointments, days }); 
      });
  }


  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = copyDayState(state.days, appointments);

    return axios
      .delete(`/api/appointments/${id}`) 
      .then(() => {
        setState({ ...state, appointments, days }); 
      });
  }


  function updateSpots(day, appointments) {
    let counter = 0;
    day.appointments.forEach((id) => {
      if (appointments[id].interview === null) {
        counter++;
      }
    });
    return counter;
  }

  function copyDayState(days, appointments) {
    const dayArray = days.map((day) => {
      return { ...day, spots: updateSpots(day, appointments) };
    });
    return dayArray;
  }

  return { state, setState, setDay, bookInterview, cancelInterview };
}