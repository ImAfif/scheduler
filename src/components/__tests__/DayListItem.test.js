import React from "react";
import "components/Application";
import Axios from "axios";
import { getInterview } from "../../helpers/selectors"
import { render, cleanup } from "@testing-library/react";

import state from "../../../stories/index";

import DayListItem from "components/DayListItem";



afterEach(cleanup);

// it("renders without crashing", () => {
//   render(<DayListItem />);
// });

// it("renders 'no spots remaining' when there are 0 spots", () => {
//   const { getByText } = render(<DayListItem name="Monday" spots={0} />);
//   expect(getByText("no spots remaining")).toBeInTheDocument();
// });

// it("renders '1 spot remaining' when there is 1 spot", () => {
//   const { getByText } = render(<DayListItem name="Monday" spots={1} />);
//   expect(getByText("1 spot remaining")).toBeInTheDocument();
// });

// it("renders '2 spots remaining' when there are 2 spots", () => {
//   const { getByText } = render(<DayListItem name="Monday" spots={2} />);
//   expect(getByText("2 spots remaining")).toBeInTheDocument();
// });

it("getInterview returns an object with the interviewer data", async () => {

    const days = Axios.get(`http://localhost:8001/api/days`);
    const appointments = Axios.get(`http://localhost:8001/api/appointments`);
    const interviewers = Axios.get(`http://localhost:8001/api/interviewers`);
    
   const response = await Promise.all([days, appointments, interviewers])
    const state = {
          day: "Monday",
          days: response[0].data,
          appointments: response[1].data,
          interviewers: response[2].data,
          }
  const result = getInterview(state, state.appointments["4"].interview);

  expect(result).toEqual(
    expect.objectContaining({
      student: expect.any(String),
      interviewer: expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        avatar: expect.any(String)
      })
    })
  );
});

it("getInterview returns null if no interview is booked", async ()  => {
    const days = Axios.get(`http://localhost:8001/api/days`);
    const appointments = Axios.get(`http://localhost:8001/api/appointments`);
    const interviewers = Axios.get(`http://localhost:8001/api/interviewers`);
    
   const response = await Promise.all([days, appointments, interviewers])
    const state = {
          day: "Monday",
          days: response[0].data,
          appointments: response[1].data,
          interviewers: response[2].data,
          }
  const result = getInterview(state, state.appointments["3"].interview);
  expect(result).toBeNull();
});