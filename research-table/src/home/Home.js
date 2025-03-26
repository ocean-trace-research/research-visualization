import React from "react";

import { Tab, Tabs, Typography } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import Box from '@mui/material/Box';

import OceanMap from "../ocean-map/OceanMap";
import WorldMap from "../ocean-map/WorldMap";
import ExcelTable from "../table/ExcelTable";
import Overview from "../overview/Overview";

function Home() {
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="Home">
            <Box>
                {/* <Typography variant="h4" sx={{ marginY: "5px", textAlign: "left" }}><a
                href="https://scor-int.org/group/reducing-uncertainty-in-soluble-aerosol-trace-element-deposition-rusted/" 
                target="_blank">RUSTED Research Repository</a></Typography> */}
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Research Table" value="1" />
                                <Tab label="Important Links" value="2" />
                                {/* <Tab label="Ocean Map" value="3" /> */}
                            </TabList>
                        </Box>
                        <TabPanel value="1"><ExcelTable /></TabPanel>
                        <TabPanel value="2"><Overview /></TabPanel>
                        {/* <TabPanel value="3">< WorldMap /></TabPanel> */}
                    </TabContext>
                </Box>

            </Box>
        </div>
    );
}

export default Home;