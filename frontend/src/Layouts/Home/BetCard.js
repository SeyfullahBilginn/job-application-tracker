import React from "react";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Button from "@mui/material/Button";
import PeopleIcon from "@mui/icons-material/People";
import { ButtonGroup } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  // padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function BetCard() {
  return (
    <Item style={{ marginTop: 18, backgroundColor: "RGB(250,246,250)" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid
              item
              xs
              style={{
                display: "flex",
                flexDirection: "column",
                justifyItems: "flex-start",
                justifySelf: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <Typography gutterBottom variant="subtitle1">
                Standard license
              </Typography>
              <Typography variant="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        color="red"
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <ButtonGroup fullWidth style={{ alignItems: "center" }}>
          <Button
            variant="contained"
            size="large"
            style={{ marginRight: 6, marginLeft: 6, backgroundColor: "green" }}
            endIcon={<ArrowDropUpIcon fontSize="large" />}
          >
            UP
          </Button>
          <div style={{ color: "green" }}>
            <Typography variant="button" component="div">
              19
            </Typography>
            <PeopleIcon />
          </div>
          <div style={{ color: "red" }}>
            <Typography variant="button" component="div">
              25
            </Typography>
            <PeopleIcon />
          </div>
          <Button
            variant="contained"
            size="large"
            style={{ marginRight: 6, marginLeft: 6, backgroundColor: "red" }}
            startIcon={<ArrowDropDownIcon fontSize="large" />}
          >
            Down
          </Button>
        </ButtonGroup>
      </Grid>
    </Item>
  );
}
