/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import routes from "routes";
import { Grid } from "@mui/material";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "Contexts/AuthContext";
import { useDrawer } from "../Contexts/DashboardContext";
import "./Drawer.css";

const drawerWidth = 180;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const MyDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  })
);

export default function Drawer({ children }) {
  const theme = useTheme();
  // const [open, setOpen] = React.useState(false);
  const { open, setOpen } = useDrawer();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = React.useState(location.pathname.split("/")[1]);
  const { userCookie } = useAuth();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setActiveIndex(location.pathname.split("/")[1]);
  }, [location]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ backgroundColor: "#A8A4CE" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <MyDrawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "#A8A4CE",
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {routes.map((item, index) => {
            if ((userCookie.user || !item.isLoggedIn) && item.isInLeftBar) {
              return (
                <ListItem
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                >
                  <NavLink
                    // disablePadding
                    to={item.route}
                    color="yellow"
                    className="link"
                    style={{ display: "block", paddingLeft: 16 }}
                    onClick={() => {
                      setActiveIndex(item.route);
                    }}
                  >
                    <div
                      className="link-text"
                      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                    >
                      <ListItemIcon
                        color="white"
                        sx={{
                          color: "RGB(250,250,250)",
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                    </div>
                  </NavLink>
                </ListItem>
              );
            }
            return null;
          })}
        </List>
      </MyDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
