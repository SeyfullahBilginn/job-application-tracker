/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import Drawer from "Drawer/Drawer";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Container } from "@mui/material";
import Header from "Header/Header";
import ApplicationService from "Services/ApplicationService";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "Contexts/AuthContext";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Card from "./Card";
import AddJobAppPopup from "./AddJobAppPopup";
import "./Home.css";
import GeneralPopup from "../Popups/GeneralPopup";

export default function Home() {
  const [isAddJobPopupOpen, setIsAddJobPopupOpen] = useState(false);
  const [deletePopup, setDeletePopup] = useState({
    isOopen: false,
    deletedId: null,
  });
  const [jobApps, setJobApps] = useState([]);
  const { userCookie } = useAuth();

  function getJobApps() {
    ApplicationService.getApps(userCookie.user.id)
      .then((res) => res.json().then((result) => setJobApps(result)))
      .catch((error) => console.log(error));
  }

  function deleteApp() {
    ApplicationService.deleteApp(deletePopup.deletedId)
      .then((res) => setDeletePopup({ ...deletePopup, isOpen: false }))
      .catch((error) => console.log(error));
  }

  useEffect(async () => {
    await getJobApps();
  }, [deletePopup.isOpen]);

  return (
    <div>
      {isAddJobPopupOpen && (
        <AddJobAppPopup closePopup={() => setIsAddJobPopupOpen(false)} text="Add Job Application" />
      )}
      {deletePopup.isOpen && (
        <GeneralPopup
          close={() => setDeletePopup({ ...deletePopup, isOpen: false })}
          success={() => {
            deleteApp();
          }}
          text="Add Job Application"
        />
      )}
      <Box sx={{ flexGrow: 1 }}>
        <Button variant="outlined" onClick={() => setIsAddJobPopupOpen(true)}>
          add job application
        </Button>
        <div className="tableArea">
          <table id="customers">
            <thead>
              <tr>
                <th>Index</th>
                <th style={{ width: "25%" }}>Company</th>
                <th style={{ width: "25%" }}>Position</th>
                <th style={{ width: "25%" }}>Location</th>
                <th style={{ width: "10%" }}>Expected Salary</th>
                <th style={{ width: "10%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobApps.map((app, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{app.company_name}</td>
                  <td>{app.position}</td>
                  <td>{app.location}</td>
                  <td>{app.expected_salary}</td>
                  <td id="actions">
                    <div
                      type="button"
                      onClick={() => setDeletePopup({ isOpen: true, deletedId: app.id })}
                    >
                      <HighlightOffIcon id="deleteIcon" />
                    </div>
                    <EditIcon id="editIcon" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
    </div>
  );
}
