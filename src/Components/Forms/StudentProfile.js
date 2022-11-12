import React from "react";
import Button from "../Utilities/Button";
import Card from "../Utilities/Card"
import styles from "./StudentProfile.module.css";
import formStyles from "./Form.module.css"
import Input from "../Utilities/Inputs/Input";

const StudentProfile = () => {
  return (
    <Card>
      <form className={styles.studentForm}> 
        <div className={styles.avatar}>
            &nbsp;
        </div>
        <div className={styles.form}>
            <div className={formStyles["form__group-inline"]}>
                <Input id="studentID" label="Student ID" type="text" placeholder="Student ID"/>
            </div>
            <div className={formStyles["form__group-inline"]}>
                <Input id="firstName" label="First Name" type="text" placeholder="First Name"/>
            </div>
            <div className={formStyles["form__group-inline"]}>
                <Input id="middleName" label="Middle Name" type="text" placeholder="Middle Name"/>
            </div>
            <div className={formStyles["form__group-inline"]}>
                <Input id="lastName" label="Last Name" type="text" placeholder="Last Name"/>
            </div>
            <div className={formStyles["form__group-inline"]}>
                <Input id="email" label="E-mail" type="email" placeholder="Email"/>
            </div>
            <div className={formStyles["form__group-inline"]}>
                <Input id="phone" label="Phone Number" type="tel" placeholder="Phone Number"/>
            </div>

            <div className={styles["footer"]}>
                <Button className="btn__primary">Save</Button>
                <Button className="btn__cancel">Cancel</Button>
            </div>
        </div>
      </form>
    </Card>
  );
};

export default StudentProfile;
