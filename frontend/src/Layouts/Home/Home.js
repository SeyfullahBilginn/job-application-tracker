/* eslint-disable react/no-array-index-key */
import Drawer from "Drawer/Drawer";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Container } from "@mui/material";
import Header from "Header/Header";
import ApplicationService from "Services/ApplicationService";
import { useAuth } from "Contexts/AuthContext";
import Card from "./Card";
import AddJobAppPopup from "./AddJobAppPopup";

export default function Home() {
  const [isAddJobPopupOpen, setIsAddJobPopupOpen] = useState(false);
  const [jobApps, setJobApps] = useState([]);
  const { userCookie } = useAuth();

  function getJobApps() {
    ApplicationService.getApps(userCookie.user.id)
      .then((res) => res.json().then((result) => setJobApps(result)))
      .catch((error) => console.log(error));
  }

  useEffect(async () => {
    await getJobApps();
  }, []);

  return (
    <div>
      {isAddJobPopupOpen && (
        <AddJobAppPopup closePopup={() => setIsAddJobPopupOpen(false)} text="Add Job Application" />
      )}
      <Box sx={{ flexGrow: 1 }}>
        <Button variant="outlined" onClick={() => setIsAddJobPopupOpen(true)}>
          add job application
        </Button>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {jobApps.map((app, index) => (
            <Grid item xs={4} sm={4} md={4} key={index}>
              <Card
                companyName={app.company_name}
                position={app.position}
                location={app.location}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
