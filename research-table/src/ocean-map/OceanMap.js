import { MapContainer, TileLayer, Polygon, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Grid2 as Grid, Checkbox, FormControlLabel, FormGroup, Typography, Button, Box } from '@mui/material';
import { useEffect, useRef, useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';

const OceanMap = ({ selectedResearch, researchData, storedElementList, beforeUnmount }) => {

    const [oceans, setOceans] = useState([]);
    const getOceans = () => {
        fetch(process.env.PUBLIC_URL + '/oceans.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((oceans) => {
                setOceans(oceans)
            })
    }

    const [elements, setElements] = useState([]);

    const getElements = () => {
        fetch(process.env.PUBLIC_URL + '/elements.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((elements) => {
                if (storedElementList.length > 0) {
                    elements = elements.map(element => {
                        storedElementList.every(storedElement => {
                            if (element.name === storedElement.name) {
                                element = structuredClone(storedElement)
                                return false
                            }
                            else {
                                return true
                            }
                        })
                        return element
                    })
                    setCheckedElements(storedElementList)
                }
                setElements(elements);
            })
    }

    const [oceanData, setOceanData] = useState([]);
    const [allStudies, setAllStudies] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);

    const [checkedElements, setCheckedElements] = useState([]);
    const elementsRef = useRef(checkedElements)

    useEffect(() => {
        //Executes As component loads
        if (oceans.length === 0) {
            getOceans()
        }
        if (elements.length === 0) {
            getElements()
        }

        //Executes As component is removed
        return () => {
            // Component is unmounting, send data back to parent
            beforeUnmount(elementsRef.current);
        };
    }, []);


    // useEffect(() => {
    //     setAllStudies(false)
    // }, [researchData]);

    // useEffect(() => {
    //     elements.forEach(element => {
    //         element.checked = allStudies
    //         element.types?.forEach(type => {
    //             type.checked = allStudies
    //             type.methods?.forEach(method => {
    //                 method.checked = allStudies
    //             })
    //         })
    //     })
    //     //setCheckedElements(allStudies ? elements : [])
    // }, [allStudies]);
    // useEffect(() => {
    //     setCheckedElements(storedElementList)
    // }, [storedElementList]);

    useEffect(() => {
        elementsRef.current = checkedElements;
        setOceanData(filterResearchData(researchData))
    }, [checkedElements]);

    const handleSelectAllChange = (isChecked) => {
        setAllStudies(isChecked)
        setIndeterminate(false)
        elements.forEach(element => {
            element.checked = isChecked
            element.types?.forEach(type => {
                type.checked = isChecked
                type.methods?.forEach(method => {
                    method.checked = isChecked
                })
            })
        })
        setCheckedElements(isChecked ? elements : [])
    }

    const handleCheckboxChange = (element, index, type = null, method = null) => {
        if (type == null) {
            element.checked = !element.checked
            //check total and soluble with all methodologies
            element.types?.forEach(type => {
                type.checked = element.checked
                type.methods?.forEach(method => {
                    method.checked = element.checked
                })
            });
        }
        else if (type != null) {
            if (method == null) {
                type.checked = !type.checked
                if (type.checked) {
                    element.checked = true
                }
                type.methods?.forEach(method => {
                    method.checked = type.checked
                });
            }
            else if (method != null) {
                method.checked = !method.checked
                if (method.checked) {
                    type.checked = true
                    element.checked = true
                }
            }
        }
        setCheckedElements(elements.filter(element => element.checked))
        //setOceanData(filterResearchData(researchData))
    };

    function filterResearchData(researchData) {
        let filteredData = []
        oceans.forEach(function (ocean) {
            ocean.studies = 0
        });

        if (checkedElements.length > 0 && checkedElements.length === elements.length) {
            setIndeterminate(false)
            setAllStudies(true)
        }
        else if (checkedElements.length === 0) {
            setIndeterminate(false)
            setAllStudies(false)
        }
        else {
            setIndeterminate(true)
            setAllStudies(false)
        }

        researchData.forEach(research => {
            let numberOfStudies = filteredData.length
            checkedElements.every(element => {
                //if (element.checked) {
                if (research[element.name] || research[element.name] > 0) {
                    if (element.types != undefined) {
                        element.types.every(type => {
                            if (type.name == research["Solubility"] && type.checked) {
                                if (type.methods != undefined) {
                                    type.methods.every(method => {
                                        if (research["Methodology"]?.includes(method.name) && method.checked) {
                                            filteredData.push(research)
                                            return false;//Breaks the loop once paper has a matching leaching methodology
                                        }
                                        return true;
                                    });
                                }
                                else {
                                    filteredData.push(research)
                                    return false;//Breaks the loop once paper has a matching solubility data
                                }
                            }
                            return true;
                        });
                    }
                    else {
                        filteredData.push(research)
                        return false//Breaks the loop once paper has one matching element
                    }
                }
                if (filteredData.length > numberOfStudies) {
                    return false//Breaks the loop and moves to next paper
                }
                return true;
                // }
                // else {
                //     return true;//continues to the next element
                // }
            });
            if (filteredData.length > numberOfStudies) {
                oceans.forEach(function (ocean) {
                    ocean.studies += research["Ocean"] != undefined ? research["Ocean"].includes(ocean.name) : 0
                });
            }
        })
        return filteredData;
    }
    // useEffect(() => {
    //     // This will be executed when checkbox changes
    //     let filteredData = []
    //     oceans.forEach(function (ocean) {
    //         ocean.studies = 0
    //     });
    //     researchData.forEach(research => {
    //         let numberOfStudies = filteredData.length
    //         elements.every(element => {
    //             if (element.checked) {
    //                 if (research[element.name] || research[element.name] > 0) {
    //                     if (element.types != undefined) {
    //                         element.types.every(type => {
    //                             if (type.name == research["Solubility"] && type.checked) {
    //                                 if (type.methods != undefined) {
    //                                     type.methods.every(method => {
    //                                         if (research["Methodology"]?.includes(method.name) && method.checked) {
    //                                             filteredData.push(research)
    //                                             return false;//Breaks the loop once paper has a matching leaching methodology
    //                                         }
    //                                         return true;
    //                                     });
    //                                 }
    //                                 else {
    //                                     filteredData.push(research)
    //                                     return false;//Breaks the loop once paper has a matching solubility data
    //                                 }
    //                             }
    //                             return true;
    //                         });
    //                     }
    //                     else {
    //                         filteredData.push(research)
    //                         return false//Breaks the loop once paper has one matching element
    //                     }
    //                 }
    //                 if (filteredData.length > numberOfStudies) {
    //                     return false//Breaks the loop and moves to next paper
    //                 }
    //                 return true;
    //             }
    //             else {
    //                 return true;
    //             }
    //         });
    //         if (filteredData.length > numberOfStudies) {
    //             oceans.forEach(function (ocean) {
    //                 ocean.studies += research["Ocean"] != undefined ? research["Ocean"].includes(ocean.name) : 0
    //             });
    //         }
    //     })
    //     setOceanData(filteredData)
    // }, [elements]);

    const showResearchTable = (oceanName, studies) => event => {
        if (studies > 0) {
            let research = oceanData.filter(x => x["Ocean"]?.includes(oceanName))
            selectedResearch(research)
        }
        else {
            alert("There are no studies for selected criteria")
        }
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <Grid size={{ sm: 3, xs: 12, md: 2 }} style={{
                    height: '85vh',
                    overflowY: 'scroll',
                    textAlign: "left"
                }}>
                    <FormGroup>
                        <Button
                            variant="contained"
                            size="medium"
                            style={{ width: '80%', marginBottom: "10px", textAlign: "left" }}
                            onClick={(event) => handleSelectAllChange(false)}
                            endIcon={<ClearIcon />}>
                            Reset Selection
                        </Button>
                        <FormControlLabel
                            control={
                                <Checkbox checked={allStudies}
                                    indeterminate={indeterminate}//checkedElements.length > 0 && checkedElements.length !== elements.length
                                    onChange={(event) => handleSelectAllChange(event.target.checked)} />//setAllStudies(!allStudies)
                            }
                            label="Select All" />
                        <Grid container>
                            {elements.map((element, index) => {
                                return (
                                    <Grid
                                        size={{ sm: 12, xs: 12, md: 12 }}
                                        key={element.name}>
                                        <FormControlLabel label={element.name} control={
                                            <Checkbox
                                                checked={element.checked}
                                                onChange={(event) => handleCheckboxChange(element, index)}
                                            />
                                        } />
                                        {element.types?.map((type) => (
                                            <div key={type.name}>
                                                <FormControlLabel style={{ marginLeft: "10px" }} label={type.name} control={
                                                    <Checkbox
                                                        checked={type.checked}
                                                        value={type.name}
                                                        onChange={(event) => handleCheckboxChange(element, index, type)}
                                                    />
                                                } />
                                                {type.methods?.map((method) => (
                                                    <div key={method.name}>
                                                        <FormControlLabel style={{ marginLeft: "20px" }} label={method.name} control={
                                                            <Checkbox
                                                                checked={method.checked}
                                                                value={method.name}
                                                                onChange={(event) => handleCheckboxChange(element, index, type, method)}
                                                            />
                                                        } />
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </FormGroup>
                </Grid>
                <Grid size={{ sm: 9, xs: 12, md: 10 }} style={{
                    height: '85vh',
                    aspectRatio: '1.75 / 1', // Maintain world map proportions (W:H ≈ 2:1)
                    boxShadow: '0 0 2px rgba(255, 255, 255, 1)',
                    borderRadius: '2px',
                    overflowY: 'none'
                }}
                >
                    {/* <div > */}
                    <Typography style={{ fontWeight: "bold" }}>Each tooltip shows number of studies done for that ocean. Double click on the tooltip to see studies for that ocean</Typography>
                    <MapContainer
                        center={[0, 0]}
                        zoom={2}
                        minZoom={2}
                        maxZoom={2}
                        style={{ height: '110%', width: '100%', backgroundColor: "#ffffff !important" }}
                        worldCopyJump={false}
                        maxBounds={[[-90, -180], [90, 180]]}
                        maxBoundsViscosity={1.0}
                    >
                        <TileLayer
                            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="© OpenStreetMap contributors"
                            noWrap={true}
                        />
                        {oceans.map((ocean, index) => (
                            <Polygon
                                key={index}
                                positions={ocean.coordinates}
                                pathOptions={{ color: ocean.color, fillOpacity: 0.3 }}
                            >
                                <Tooltip permanent direction="center" interactive={true} style={{ cursor: "pointer" }}>
                                    <span onDoubleClick={showResearchTable(ocean.name, ocean.studies)} style={{ cursor: "pointer" }}>
                                        <strong>{ocean.name} : {ocean.studies}</strong>
                                    </span>
                                </Tooltip>
                            </Polygon>
                        ))}
                    </MapContainer>
                </Grid>
            </Grid>
        </Box>
    );
};

export default OceanMap;