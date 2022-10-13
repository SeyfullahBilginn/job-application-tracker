/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import ApplicationService from "Services/ApplicationService";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "Contexts/AuthContext";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch, useSelector } from "react-redux";
import { getApplications } from "features/applicationsSlice";
import AddJobAppPopup from "./AddJobAppPopup";
import "./Home.css";
import GeneralPopup from "../Popups/GeneralPopup";

export default function Home() {
  const [isAddJobPopupOpen, setIsAddJobPopupOpen] = useState(false);
  const [deletePopup, setDeletePopup] = useState({
    isOopen: false,
    deletedId: null,
  });
  const { userCookie } = useAuth();

  const { applications, error, isLoading } = useSelector((store) => store.applications);
  const dispatch = useDispatch();

  function getJobApps() {
    dispatch(getApplications(userCookie.user.id));
  }

  function deleteApp() {
    ApplicationService.deleteApp(deletePopup.deletedId)
      .then((res) => setDeletePopup({ ...deletePopup, isOpen: false }))
      .catch((err) => {});
  }

  useEffect(async () => {
    await getJobApps();
  }, [deletePopup.isOpen]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error.isError) {
    return (
      <div>
        Error occured
        {error.message}
      </div>
    );
  }
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
              {applications &&
                applications.map((app, index) => (
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
