import React from "react";
import Button from "components/Button";

//this is a function that is exported, it is called confirm, an argument that is given is called props
export default function Confirm(props) {
  //this is the return
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">Delete the appointment?</h1>
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>
          Cancel
        </Button>
        <Button danger onClick={props.onConfirm}>
          Confirm
        </Button>
      </section>
    </main>
  );
}
