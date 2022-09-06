import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import FAQ from "../components/FAQ";

import NavBar from "../components/NavBar.jsx";
import './css/Resources.css';

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
    'aria-controls': `tabpanel-${index}`,
  };
}

export default function Resources() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //const { faq } = useFAQ();

  return (
    <main>
    <NavBar/>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
        value={value} 
        onChange={handleChange} 
        fullWidth 
        allowScrollButtonsMobile>
          <Tab label="Board" {...a11yProps(0)} />
          <Tab label="Resources" {...a11yProps(1)} />
          <Tab label="FAQs" {...a11yProps(2)} />
          <Tab label="App Help" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Board
      </TabPanel>
      <TabPanel value={value} index={1}>
        Resources
      </TabPanel>
      <TabPanel value={value} index={2}>
        FAQs
        {/*
        {faqs.map((faq, key) => {
          return <FAQInfo faq={faq} key={key} />;
        })}
        */}
      </TabPanel>
      <TabPanel value={value} index={3}>
        Guide Videos
      </TabPanel>
    </Box>
    </main>
  );
}
