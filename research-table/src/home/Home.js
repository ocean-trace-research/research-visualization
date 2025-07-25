import { Tab, Box } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import * as XLSX from "xlsx";
import React, { useState, useEffect } from "react";

import OceanMap from "../ocean-map/OceanMap"
import ExcelTable from "../table/ExcelTable";
import Overview from "../overview/Overview";

function Home() {
    const [researchData, setResearchData] = React.useState([]);
    const [oceanData, setOceanData] = React.useState([]);
    const [value, setValue] = React.useState("3");
    const [ocean, setOcean] = React.useState("");
    //const [checkboxData, setCheckboxData] = React.useState([]);

    const handleChange = (event, newValue) => {
        setOcean("")
        setValue(newValue);
    };

    const openResearchTable = (selectedResearch) => {
        setOceanData(selectedResearch)
        setValue("2")
    }
    const showFullData = (showFullData) => {
        if (showFullData) {
            openResearchTable(researchData)
        }
    }

    const selectedResearch = (selectedResearch) => {
        openResearchTable(selectedResearch)
    }

    useEffect(() => {
        const filePath = process.env.PUBLIC_URL + "/mapped_studies_new.xlsx";//research-visualization
        fetch(filePath)
            .then(response => response.arrayBuffer())
            .then(buffer => {
                const workbook = XLSX.read(buffer, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const parsedData = XLSX.utils.sheet_to_json(sheet)
                //const headerData = XLSX.utils.sheet_to_json(sheet, {header: 1})[0]
                //headerData.splice(0,13)
                //setCheckboxData(headerData)
                setResearchData(parsedData)
                setOceanData(parsedData)
            })
            .catch(error => console.error("Error loading Excel file:", error));
    }, []);

    return (

        <div className="Home">
            <Box>
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
                                {/* <Tab label="Feedback" value="7" href='https://agupubs.onlinelibrary.wiley.com/journal/19448007' target='_blank'/> */}
                            </TabList>
                        </Box>
                        {/* <TabPanel value="1"></TabPanel> */}
                        <TabPanel value="2"><ExcelTable showFullData={showFullData} researchData={oceanData} /></TabPanel>
                        <TabPanel value="3"><OceanMap selectedResearch={selectedResearch} researchData={researchData} /></TabPanel>
                        {/* oceanData={oceanData} checkboxData={checkboxData}*/}
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