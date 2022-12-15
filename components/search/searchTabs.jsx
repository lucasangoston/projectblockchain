import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { PostList } from '../home/post/PostList';
import { SearchProfilesResults } from './searchProfilesResults';
import { SearchPublicationsResults } from './searchPublicationsResults';

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SearchTabs({profileName, profilesResults, publicationWord, publicationsResults}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ ml: '2rem' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Profiles" {...a11yProps(0)} />
          <Tab label="Publications" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <SearchProfilesResults name={profileName} results={profilesResults}></SearchProfilesResults>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SearchPublicationsResults name={publicationWord} results={publicationsResults}></SearchPublicationsResults>
      </TabPanel>
    </Box>
  );
}
