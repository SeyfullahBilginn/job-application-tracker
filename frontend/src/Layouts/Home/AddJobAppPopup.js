/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import { useAuth } from "Contexts/AuthContext";
import React, { useState } from "react";
import ApplicationService from "Services/ApplicationService";
import styles from "./AddJobAppPopup.module.css";

export default function AddJobAppPopup({ text, closePopup }) {
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [position, setPosition] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const { userCookie } = useAuth();

  function handleSubmit(event) {
    event.preventDefault();
    console.log(userCookie.user);
    ApplicationService.postApp({
      user_id: userCookie.user.id,
      date: "temp",
      company_name: companyName,
      location,
      position,
      expected_salary: Number(expectedSalary),
      applied_cv: "temp",
    })
      .then((res) => closePopup())
      .catch((error) => console.log(error));
  }

  return (
    <div className={styles.popup}>
      <div className={styles.popup_inner}>
        <h1>{text}</h1>
        <button onClick={closePopup}>close me</button>
        <form
          onSubmit={(event) => handleSubmit(event)}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label>
            Company Name:
            <input
              type="text"
              value={companyName}
              onChange={(text) => setCompanyName(text.currentTarget.value)}
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              value={location}
              onChange={(text) => setLocation(text.currentTarget.value)}
            />
          </label>
          <label>
            Position:
            <input
              type="text"
              value={position}
              onChange={(text) => setPosition(text.currentTarget.value)}
            />
          </label>
          <label>
            Expected Salary:
            <input
              type="text"
              value={expectedSalary}
              onChange={(text) => setExpectedSalary(text.currentTarget.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
