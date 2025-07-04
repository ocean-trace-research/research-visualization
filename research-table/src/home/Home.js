import { Tab, Box } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';

import React from "react";

import OceanMap from "../ocean-map/OceanMap"
import ExcelTable from "../table/ExcelTable";
import Overview from "../overview/Overview";

function Home() {
    const [value, setValue] = React.useState("3");
    const [ocean, setOcean] = React.useState("");

    const handleChange = (event, newValue) => {
        setOcean("")
        setValue(newValue);
    };

    const openResearchTable = (selectedOcean) => {
        setOcean(selectedOcean)
        setValue("2")
    }
    const selectedOcean = (selectedOcean) => {
        // if (selectedOcean != "") {
            openResearchTable(selectedOcean)
        // }
    }

    return (

        <div className="Home">
            <Box>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Introduction" value="1" />
                                <Tab label="Research Table" value="2" />
                                <Tab label="Ocean Map" value="3" />
                                <Tab label="Methodology" value="4" />
                                <Tab label="Diversity" value="5" />
                                <Tab label="Important Links" value="6" />
                            </TabList>
                        </Box>
                        <TabPanel value="1"></TabPanel>
                        <TabPanel value="2"><ExcelTable ocean={ocean} /></TabPanel>
                        <TabPanel value="3"><OceanMap selectedOcean={selectedOcean} /></TabPanel>
                        <TabPanel value="4"></TabPanel>
                        <TabPanel value="5"></TabPanel>
                        <TabPanel value="6"><Overview /></TabPanel>
                    </TabContext>
                </Box>

            </Box>
        </div>
    );
}

export default Home;