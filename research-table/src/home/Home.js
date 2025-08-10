import { Tab, Box } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import * as XLSX from "xlsx";
import React, { useState, useEffect } from "react";

import OceanMap from "../ocean-map/OceanMap"
import ExcelTable from "../table/ExcelTable";
import Overview from "../overview/Overview";

function Home() {
    const [researchData, setResearchData] = useState([]);
    const [oceanData, setOceanData] = useState([]);
    const [activeTab, setActiveTab] = useState("2");
    const [ocean, setOcean] = useState("");
    const[checkedElements, setCheckedElements] = useState([])

    //Fetch data from excel file
    useEffect(() => {
        const filePath = process.env.PUBLIC_URL + "/mapped_studies.xlsx";
        fetch(filePath)
            .then(response => response.arrayBuffer())
            .then(buffer => {
                const workbook = XLSX.read(buffer, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const parsedData = XLSX.utils.sheet_to_json(sheet)
                setResearchData(parsedData)
                setOceanData(parsedData)
            })
            .catch(error => console.error("Error loading Excel file:", error));
    }, []);

    //display data from selected ocean and elements
    const selectedResearch = (selectedResearch) => {
        openResearchTable(selectedResearch)
    }
    const openResearchTable = (selectedResearch) => {
        setOceanData(selectedResearch)
        setActiveTab("3")
    }

    //show all data on table
    const showFullData = (showFullData) => {
        if (showFullData) {
            openResearchTable(researchData)
        }
    }
    
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const getCheckedElements = (elementList) => {
        setCheckedElements(elementList)
    }

    return (

        <div className="Home">
            <Box>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={activeTab}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                {/* <Tab label="Introduction" value="1" /> */}
                                <Tab label="Ocean Map" value="2" />
                                <Tab label="Research Table" value="3" />
                                {/* <Tab label="Methodology" value="4" /> */}
                                {/* <Tab label="Diversity" value="5" /> */}
                                <Tab label="Important Links" value="6" />
                            </TabList>
                        </Box>
                        {/* <TabPanel value="1"></TabPanel> */}
                        <TabPanel value="2"><OceanMap selectedResearch={selectedResearch} researchData={researchData} storedElementList={checkedElements} beforeUnmount={getCheckedElements}/></TabPanel>
                        <TabPanel value="3"><ExcelTable showFullData={showFullData} researchData={oceanData} /></TabPanel>
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