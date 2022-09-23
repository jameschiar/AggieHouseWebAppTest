import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useUser } from "../context/UserProvider";

import FAQInfo from "../components/FAQ";
import Tutorials from "../components/Tutorials";
import ResourceLinks from "../components/ResourceLinks";
import BoardInfo from "../components/Contact";

import NavBar from "../components/NavBar.jsx";
import "./css/Resources.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function Resources() {
  const [value, setValue] = React.useState(0);
  const [deleteState, toggleDeleteState] = useState(false);
  const { users, userFirebaseData } = useUser();

  const isAdmin = () => {
    return userFirebaseData?.role === "admin";
  };
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <main className="body">
      <NavBar />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            fullWidth
            allowScrollButtonsMobile
          >
            <Tab label="Contacts" {...a11yProps(0)} />
            <Tab label="Resources" {...a11yProps(1)} />
            <Tab label="FAQs" {...a11yProps(2)} />
            <Tab label="Tutorials" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <h2>Contact Info</h2>
          <BoardInfo deleteState={deleteState} />
          {isAdmin() && (<button
            className="addButton"
            onClick={() => {
              toggleDeleteState(!deleteState);
            }}
          >
            Delete Contact
          </button>)}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h2> Here are the links to Resources in the Aggie House Drive </h2>
          <ResourceLinks deleteState={deleteState} />
          {isAdmin() && (<button
            className="addButton"
            onClick={() => {
              toggleDeleteState(!deleteState);
            }}
          >
            Delete Resource
          </button>)}
        </TabPanel>
        <TabPanel value={value} index={2}>
          <h2>FAQs</h2>
          <FAQInfo deleteState={deleteState} />
          {isAdmin() && (<button
            className="addButton"
            onClick={() => {
              toggleDeleteState(!deleteState);
            }}
          >
            Delete FAQ
          </button>)}
        </TabPanel>
        <TabPanel value={value} index={3}>
          <h2> Click on the tutorial you want to view: </h2>
          <Tutorials deleteState={deleteState} />
          {isAdmin() && (<button
            className="addButton"
            onClick={() => {
              toggleDeleteState(!deleteState);
            }}
          >
            Delete Tutorial
          </button>)}
        </TabPanel>
      </Box>
    </main>
  );
}
