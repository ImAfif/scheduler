import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import Axios from "axios";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const countAvailable = (appointments) => {
    const newDays = [...state.days];
    for (let weekday of newDays) {
      if (weekday.name === state.day) {
        const appointmentIds = weekday.appointments;
        let count = 0;
        for (let id of appointmentIds) {
          if (appointments[id].interview === null) {
            count += 1;
          }
        }
        weekday.spots = count;
      }
    }

    return newDays;
  };

  // if (appointments. === null)

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    let newDays = countAvailable(appointments);

    return Axios.delete(`/api/appointments/${id}`).then(() =>
      setState({
        ...state,
        appointments,
        days: newDays,
      })
    );
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    let newDays = countAvailable(appointments);

    return Axios.put(`/api/appointments/${id}`, { interview }).then(() =>
      setState({
        ...state,
        appointments,
        days: newDays,
      })
    );
  };

  //research
  //arrow functions
  //.then axios

  const setDay = (day) => setState({ ...state, day });
  const interviewers = getInterviewersForDay(state, state.day);
  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
  useEffect(() => {
    const fetchDays = Axios.get("http://localhost:8001/api/days");
    const fetchAppointments = Axios.get(
      "http://localhost:8001/api/appointments"
    );
    const fetchInterviewers = Axios.get(
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

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" bookInterview={bookInterview} />
      </section>
    </main>
  );
}
