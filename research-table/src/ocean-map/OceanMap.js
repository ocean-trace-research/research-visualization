import { MapContainer, TileLayer, Polygon, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Grid2 as Grid, Checkbox, FormControlLabel, FormGroup, Typography, Button } from '@mui/material';
import React, { useCallback, useEffect, useState } from "react";

// Ocean polygon definitions (simplified bounding boxes)
const oceans = [
    {
        name: "Central East Pacific",//Ocean
        coordinates: [[[30, -180], [-15, -180], [-15, -75], [5, -75], [30, -112], [30, -180]]],
        color: "#CC79A7",
        studies: 0//9
    },
    {
        name: "Central West Pacific",// Ocean
        coordinates: [[[30, 180], [-15, 180], [-15, 110], [30, 110], [30, 180]]],
        color: "#CC79A7",
        studies: 0//10
    },
    {
        name: "Western North Pacific",// Ocean
        coordinates: [[[60, 120], [30, 120], [30, 180], [60, 180], [60, 120]]],
        color: "#332288",
        studies: 0//10
    },
    {
        name: "Australia Pacific",// Ocean
        coordinates: [[[-15, 110], [-50, 110], [-50, 180], [-15, 180], [-15, 110]]],
        color: "#F3BC00",
        studies: 0//9
    },
    {
        name: "South Pacific",// Ocean
        coordinates: [[[-15, -180], [-50, -180], [-50, -70], [-15, -70], [-15, -180]]],
        color: "#F0E442",
        studies: 0//5
    },
    {
        name: "Eastern North Pacific",// Ocean
        coordinates: [[[60, -180], [30, -180], [30, -90], [60, -90], [60, -180]]],
        color: "#F3BC00",
        studies: 0//5
    },
    {
        name: "North Atlantic",// Ocean
        coordinates: [[[60, -90], [30, -90], [30, -5], [40, -5], [40, 0], [60, 0], [60, -90]]],
        color: "yellow",
        studies: 0//11
    },
    {
        name: "Central Atlantic",// Ocean
        coordinates: [[[30, -112], [5, -75], [-15, -75], [-15, 20], [30, 20], [30, -112]]],
        color: "#51bb57",
        studies: 0//21
    },
    {
        name: "South Atlantic",// Ocean
        coordinates: [[[-15, -70], [-50, -70], [-50, 20], [-15, 20], [-15, -70]]],
        color: "#009E73",
        studies: 0//11
    },
    {
        name: "Medeterranian, Black and Caspian Sea",// Ocean
        coordinates: [[[30, -5], [40, -5], [40, 0], [50, 0], [50, 60], [30, 60], [30, -5]]],
        color: "#000000",
        studies: 0//15
    },
    {
        name: "Bay of Bengal",
        coordinates: [[[30, 80], [0, 80], [0, 110], [30, 110], [30, 80]]],
        color: "#000000",
        studies: 0//4
    },
    {
        name: "Arabian Sea",
        coordinates: [[[30, 20], [0, 20], [0, 80], [30, 80], [30, 20]]],
        color: "#E69F00",
        studies: 0//6
    },
    {
        name: "Indian Ocean",
        coordinates: [[[0, 20], [-50, 20], [-50, 110], [0, 110], [0, 20]]],
        color: "#56B4E9",
        studies: 0//7
    },
    {
        name: "Southern Ocean",
        coordinates: [[[-50, -180], [-90, -180], [-90, 180], [-50, 180], [-50, -180]]],
        color: "#D55E00",
        studies: 0//6
    },
    {
        name: "Arctic Ocean",
        coordinates: [[[90, -180], [60, -180], [60, 180], [90, 180], [90, -180]]],
        color: "#0072B2",
        studies: 0//7
    }
];

const elements = [
    {
        name: 'Iron (Fe)', checked: true,
        types: [
            { name: "Total", checked: true },
            {
                name: "Soluble", checked: true,
                methods: [{ name: "Acid", checked: true }, { name: "Seawater", checked: true }, { name: "Pure Water", checked: true }]
            }
        ]
    },
    { name: 'Major Ions (MI)', checked: true },
    { name: 'Aluminum (Al)', checked: true },
    { name: 'Manganese (Mn)', checked: true },
    { name: 'Lead (Pb)', checked: true },
    { name: 'Zinc (Zn)', checked: true },
    { name: 'Nitrogen (N)', checked: true },
    { name: 'Vanadium (V)', checked: true },
    { name: 'Calcium (Ca)', checked: true },
    { name: 'Phosphorus (P)', checked: true },
    { name: 'Titanium (Ti)', checked: true },
    { name: 'Potassium (K)', checked: true },
    { name: 'Copper (Cu)', checked: true },
    { name: 'Sodium (Na)', checked: true },
    { name: 'Nickel (Ni)', checked: true },
    { name: 'Silicon (Si)', checked: true },
    { name: 'Magnesium (Mg)', checked: true },
    { name: 'Chromium (Cr)', checked: true },
    { name: 'Cadmium (Cd)', checked: true },
    { name: 'Cobalt (Co)', checked: true },
    { name: 'Chlorine (Cl)', checked: true },
    { name: 'Antimony (Sb)', checked: true },
    { name: 'Bromine (Br)', checked: true },
    { name: 'Scandium (Sc)', checked: true },
    { name: 'Arsenic (As)', checked: true },
    { name: 'Selenium (Se)', checked: true },
    { name: 'Thorium (Th)', checked: true },
    { name: 'Barium (Ba)', checked: true },
    { name: 'Lanthanum (La)', checked: true },
    { name: 'Samarium (Sm)', checked: true },
    { name: 'Iodine (I)', checked: true },
    { name: 'Rubidium (Rb)', checked: true },
    { name: 'Strontium (Sr)', checked: true },
    { name: 'Caesium (Cs)', checked: true },
    { name: 'Europium (Eu)', checked: true },
    { name: 'Molybdenum (Mo)', checked: true },
    { name: 'Zirconium (Zr)', checked: true },
    { name: 'Cerium (Ce)', checked: true },
    { name: 'Gallium (Ga)', checked: true },
    { name: 'Tin (Sn)', checked: true },
    { name: 'Hafnium (Hf)', checked: true },
    { name: 'Germanium (Ge)', checked: true },
    { name: 'Gold (Au)', checked: true },
    { name: 'Indium (In)', checked: true },
    { name: 'Lutetium (Lu)', checked: true },
    { name: 'Ruthenium (Ru)', checked: true },
    { name: 'Tungsten (W)', checked: true },
    { name: 'Beryllium (Be)', checked: true },
    { name: 'Yttrium (Y)', checked: true },
    { name: 'Silver (Ag)', checked: true },
    { name: 'Tantalum (Ta)', checked: true },
    { name: 'Terbium (Tb)', checked: true },
    { name: 'Ytterbium (Yb)', checked: true },
    { name: 'Uranium (U)', checked: true },
    { name: 'Niobium (Nb)', checked: true },
    { name: 'Lithium (Li)', checked: true }
]

// Fit to oceans
const FitToOceans = ({ polygons }) => {
    const map = useMap();
    const allCoords = polygons.flatMap(p => p.coordinates[0]);

    map.fitBounds(allCoords, {
        padding: [20, 20],
        maxZoom: 3,
    });

    return null;
};

const OceanMap = ({ selectedResearch, researchData }) => {
    const [hideElements, setHideElements] = useState(false);
    const [showLabel, setShowLabel] = useState("Show More Elements");
    useEffect(() => {
        setShowLabel(hideElements ? "Show Less Elements" : "Show More Elements")
    }, [hideElements]);

    const [oceanData, setOceanData] = useState([]);
    const [checkedElements, setCheckedElements] = useState([]);
    const [allStudies, setAllStudies] = useState(false);
    useEffect(() => {
        //setOceanData(researchData)
        setAllStudies(false)
    }, [researchData]);

    // function classifyByOceans() {
    //     oceans.forEach(function (ocean) {
    //         ocean.studies = oceanData.filter(x => x["Ocean"] != undefined ? x["Ocean"].includes(ocean.name) : false).length
    //     });
    // }
    // useEffect(() => {
    //     classifyByOceans()
    // }, [oceanData]);    

    useEffect(() => {
        elements.forEach(element => {
            element.checked = allStudies
            element.types?.forEach(type => {
                type.checked = allStudies
                type.methods?.forEach(method => {
                    method.checked = allStudies
                })
            })
        })
        setCheckedElements(allStudies ? elements : [])
        //setOceanData(allStudies ? researchData : [])
    }, [allStudies]);

    useEffect(() => {
        // This will be executed when the state changes
        let filteredData = []
        oceans.forEach(function (ocean) {
            ocean.studies = 0
        });
        researchData.forEach(research => {
            let numberOfStudies = filteredData.length
            checkedElements.every(element => {
                if (research[element.name] || research[element.name] > 0) {
                    if (element.types != undefined) {
                        element.types.every(type => {
                            if (type.name == research["Solubility"] && type.checked) {
                                if (type.methods != undefined) {
                                    type.methods.every(method => {
                                        if (research["Methodology"]?.includes(method.name) && method.checked) {
                                            filteredData.push(research)
                                            return false;
                                        }
                                        return true;
                                    });
                                }
                                else {
                                    filteredData.push(research)
                                    return false;
                                }
                            }
                            return true;
                        });
                    }
                    else {
                        filteredData.push(research)
                        return false
                    }
                }
                if (filteredData.length > numberOfStudies) {
                    return false
                }
                return true;
            });
            if (filteredData.length > numberOfStudies) {
                oceans.forEach(function (ocean) {
                    ocean.studies += research["Ocean"] != undefined ? research["Ocean"].includes(ocean.name) : 0
                });
            }
        })
        setOceanData(filteredData)
    }, [checkedElements]);

    const showResearch = (oceanName, studies) => event => {
        if (studies > 0) {
            let research = oceanData.filter(x => x["Ocean"]?.includes(oceanName))
            selectedResearch(research)
        }
        else {
            alert("There are no studies for selected criteria")
        }
    }
    const handleCheckboxChange = (element, index, type = null, method = null) => {
        if (type == null) {
            element.checked = !element.checked
            if (element.name == "Iron (Fe)") {
                //check total and soluble with all methodologies
                element.types?.forEach(type => {
                    type.checked = element.checked
                    type.methods?.forEach(method => {
                        method.checked = element.checked
                    })
                });
            }
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
    };

    return (
        <div>
            <div style={{
                height: '100vh',
                width: '100vw'
            }}>
                <div style={{
                    width: '100vw'
                }}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox checked={allStudies} onChange={() => setAllStudies(!allStudies)} />} label="Select All" />
                        <Grid container>
                            {elements.map((element, index) => {
                                if (hideElements || index < 12) {
                                    return (
                                        <Grid size={{ sm: 3, xs: 6, md: 2 }} key={element.name} style={{ textAlign: "left" }}>
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
                                }
                            })}
                        </Grid>
                    </FormGroup>
                    <Button sx={{ align: "left", marginTop: "10px", marginBottom: "20px" }} onClick={() => setHideElements(!hideElements)}>{showLabel}</Button>
                </div>
                <div style={{
                    width: '100vw',
                    aspectRatio: '1.75 / 1', // Maintain world map proportions (W:H ≈ 2:1)
                    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                    borderRadius: '3px',
                    overflow: 'scroll'
                }}>
                    <div><Typography style={{ fontWeight: "bold" }}>Each tooltip shows number of studies done for that ocean. Double click on the tooltip to see studies for that ocean</Typography></div>
                    <MapContainer
                        center={[0, 0]}
                        zoom={2}
                        minZoom={2}
                        maxZoom={2}
                        style={{ height: '100%', width: '100%', backgroundColor: "#ffffff !important" }}
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
                                positions={ocean.coordinates}//swapCoordinates(ocean.coordinates)
                                pathOptions={{ color: ocean.color, fillOpacity: 0.3 }}
                            >
                                <Tooltip permanent direction="center" interactive={true} style={{ cursor: "pointer" }}>
                                    <span onDoubleClick={showResearch(ocean.name, ocean.studies)} style={{ cursor: "pointer" }}>
                                        <strong>{ocean.name} : {ocean.studies}</strong>
                                    </span>
                                </Tooltip>
                            </Polygon>
                        ))}

                        <FitToOceans polygons={oceans} />

                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default OceanMap;