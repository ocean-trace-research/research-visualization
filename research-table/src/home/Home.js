import React from "react";

import { Tab, Tabs, Typography } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import Box from '@mui/material/Box';

// import OceanMap from "../ocean-map/OceanMap";
// import WorldMap from "../ocean-map/WorldMap";
//import WorldMapWithTwoRectangles from "../ocean-map/Map";
import OceanMap from "../ocean-map/NewMap"
import ExcelTable from "../table/ExcelTable";
import Overview from "../overview/Overview";

function Home() {
    const [value, setValue] = React.useState("3");
    const [ocean, setOcean] = React.useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const openResearchTable = (selectedOcean) => {
        setOcean(selectedOcean)
        setValue("2")
    }
    const selectedOcean = (selectedOcean) => {
        if (selectedOcean != "") {
            openResearchTable(selectedOcean)
        }
    }

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
                                {/* <Tab label="Introduction" value="1" /> */}
                                <Tab label="Research Table" value="2" />
                                <Tab label="Ocean Map" value="3" />
                                {/* <Tab label="Methodology" value="4" /> */}
                                {/* <Tab label="Diversity" value="5" /> */}
                                <Tab label="Important Links" value="6" />
                            </TabList>
                        </Box>
                        {/* <TabPanel value="1"></TabPanel> */}
                        <TabPanel value="2"><ExcelTable ocean={ocean} /></TabPanel>
                        <TabPanel value="3">< OceanMap selectedOcean={selectedOcean} /></TabPanel>
                        {/* <TabPanel value="4"></TabPanel> */}
                        {/* <TabPanel value="5"></TabPanel> */}
                        <TabPanel value="6"><Overview /></TabPanel>
                    </TabContext>
                </Box>

            </Box>
        </div>
    );
}

export default Home;