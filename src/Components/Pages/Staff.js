import React from "react";
import useFetch from "../../hooks/useFetch";
import Button from "../Utilities/Button";
import Card from "../Utilities/Card";
import Modal from "../Utilities/Modal";

const Staff = (props) => {

  let className = "";
  if (props.fullWidth) {
    className = "card_large";
  } else {
    className = "card_mid";
  }

  return (
    <React.Fragment>
        <Card className={className}>
            <h3>Staff</h3>
            <Button className="btn__new">New</Button>
        </Card>
    </React.Fragment>
  )
};

export default Staff;
