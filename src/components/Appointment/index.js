// import Appointment from "components/Appointment";
import React  from 'react';

import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Error from './Error';
import Application from 'components/Application';
import bookInterview from "../Application"

import { useVisualMode } from "../../hooks/useVisualMode";
import Status from './Status';
import Confirm from './Confirm';




// view modes available on transition
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

const Appointment = (props) => {

  // modes for the appointment view
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY );



function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };

  transition(SAVING);

  props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
}

  

  // cancel an interview
  const canceling = () => {
    transition(SAVING)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(err => transition(ERROR_DELETE, true))
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header 
        time={props.time}
      />
      {mode === EMPTY && (
        <Empty
          onAdd={() => transition(CREATE)}
        />
      )}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM, true)}
          onEdit={() => transition(EDIT)}
          
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          bookInterview={props.bookInterview}
        />
      )}
      {mode === SAVING && (
        <Status
          message="Loading"
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="DELETE?"
          onCancel={back}
          onConfirm={() => canceling()}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer}
          onCancel={back}
          onSave={save}
          name={props.interview.student}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={"Error saving"}
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Error deleting"}
          onClose={back}
        />
      )}
    </article>
  );
};

export default Appointment;