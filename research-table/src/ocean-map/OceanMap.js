import { MapContainer, TileLayer, Polygon, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';

import React, { useState } from "react";

// Ocean polygon definitions (simplified bounding boxes)
const oceans = [
    {
        name: "Central East Pacific",//Ocean
        coordinates: [[[30, -180], [-15, -180], [-15, -75], [5, -75], [30, -112], [30, -180]]],
        color: "#CC79A7",
        studies: 9
    },
    {
        name: "Central West Pacific",// Ocean
        coordinates: [[[30, 180], [-15, 180], [-15, 110], [30, 110], [30, 180]]],
        color: "#CC79A7",
        studies: 10
    },
    {
        name: "Western North Pacific",// Ocean
        coordinates: [[[60, 120], [30, 120], [30, 180], [60, 180], [60, 120]]],
        color: "#332288",
        studies: 10
    },
    {
        name: "Australia Pacific",// Ocean
        coordinates: [[[-15, 110], [-50, 110], [-50, 180], [-15, 180], [-15, 110]]],
        color: "#F3BC00",
        studies: 9
    },
    {
        name: "South Pacific",// Ocean
        coordinates: [[[-15, -180], [-50, -180], [-50, -70], [-15, -70], [-15, -180]]],
        color: "#F0E442",
        studies: 5
    },
    {
        name: "Eastern North Pacific",// Ocean
        coordinates: [[[60, -180], [30, -180], [30, -90], [60, -90], [60, -180]]],
        color: "#F3BC00",
        studies: 5
    },
    {
        name: "North Atlantic",// Ocean
        coordinates: [[[60, -90], [30, -90], [30, -5], [40, -5], [40, 0], [60, 0], [60, -90]]],
        color: "yellow",
        studies: 11
    },
    {
        name: "Central Atlantic",// Ocean
        coordinates: [[[30, -112], [5, -75], [-15, -75], [-15, 20], [30, 20], [30, -112]]],
        color: "#51bb57",
        studies: 21
    },
    {
        name: "South Atlantic",// Ocean
        coordinates: [[[-15, -70], [-50, -70], [-50, 20], [-15, 20], [-15, -70]]],
        color: "#009E73",
        studies: 11
    },
    {
        name: "Medeterranian, Black and Caspian Sea",// Ocean
        coordinates: [[[30, -5], [40, -5], [40, 0], [50, 0], [50, 60], [30, 60], [30, -5]]],
        color: "#000000",
        studies: 15
    },
    {
        name: "Bay of Bengal",
        coordinates: [[[30, 80], [0, 80], [0, 110], [30, 110], [30, 80]]],
        color: "#000000",
        studies: 4
    },
    {
        name: "Arabian Sea",
        coordinates: [[[30, 20], [0, 20], [0, 80], [30, 80], [30, 20]]],
        color: "#E69F00",
        studies: 6
    },
    {
        name: "Indian Ocean",
        coordinates: [[[0, 20], [-50, 20], [-50, 110], [0, 110], [0, 20]]],
        color: "#56B4E9",
        studies: 7
    },
    {
        name: "Southern Ocean",
        coordinates: [[[-50, -180], [-90, -180], [-90, 180], [-50, 180], [-50, -180]]],
        color: "#D55E00",
        studies: 6
    },
    {
        name: "Arctic Ocean",
        coordinates: [[[90, -180], [60, -180], [60, 180], [90, 180], [90, -180]]],
        color: "#0072B2",
        studies: 7
    }
];

// Swap [lng, lat] → [lat, lng]
// const swapCoordinates = coords =>
//     coords.map(polygon => polygon.map(([lng, lat]) => [lat, lng]));

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

const traceElementsList = {
    lead: { name: "Lead (Pb)", checked: true },
    phosphorus: { name: "Phosphorus (P)", checked: true },
    copper: { name: "Copper (Cu)", checked: true },
    zinc: { name: "Zinc (Zn)", checked: true },
    aluminium: { name: "Aluminium (Al)", checked: true },
    manganese: { name: "Manganese (Mn)", checked: true },
    sodium: { name: "Sodium (Na)", checked: true },
    potassium: { name: "Potassium (K)", checked: true },
    calcium: { name: "Calcium (Ca)", checked: true },
    magnesium: { name: "Magnesium (Mg)", checked: true },
    iron: { name: "Iron (Fe)", checked: true },
}

const OceanMap = ({ selectedOcean }) => {
    const [traceElements, setTraceElements] = useState(traceElementsList)

    const sortPapersByOcean = oceanName => event => {
        // if (oceanName != "") {
            selectedOcean(oceanName)
        // }
    }

    const filterStudies = (traceElements) => {
        console.log(traceElements)
        //filterPapers(this.state)
    }

    const handleCheckboxChange = (key) => {
        setTraceElements((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                checked: !prev[key].checked,
            },
        }));
        filterStudies(traceElements)
    };

    // const selectAllTraceElements = (isChecked) => {
    //     if (isChecked) {
    //         setTraceElements(traceElementsList)
    //     }
    //     else {
    //         const noTraceElements = Object.values(traceElementsList).map((value) => value.checked = false);
    //         setTraceElements(noTraceElements)
    //     }
    // }

    const handleSelectAllChange = (e) => {
        const checked = e.target.checked;
        const updated = Object.fromEntries(
            Object.entries(traceElements).map(([key, value]) => [
                key,
                { ...value, checked },
            ])
        );
        setTraceElements(updated);
    };

    const allChecked = Object.values(traceElements).every((el) => el.checked);

    return (
        <div>
            <div><Typography style={{ fontWeight: "bold" }}>Each tooltip shows number of studies done for that ocean. Double click on the tooltip to see studies for that ocean</Typography></div>
            <div style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#e0e0e0'
            }}>
                <div style={{
                    width: '20vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {/* <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => { selectAllTraceElements(e.target.checked) }} />} label="Select all" />
                        {Object.keys(traceElements).map(([key, value]) => (
                            <FormControlLabel control={<Checkbox checked={value.checked} onChange={(e) => { value.checked = e.target.checked; filterStudies(); }} />} label={value.name} />
                            // <FormControlLabel control={<Checkbox checked={this.traceElements.phosphorus} onChange={filterStudies(label)}/>} label="Phosphorus (P)" color="primary" />
                            // <FormControlLabel control={<Checkbox checked={this.traceElements.copper} onChange={filterStudies(label)}/>} label="Copper (Cu)" color="primary" />
                            // <FormControlLabel control={<Checkbox checked={this.traceElements.zinc} onChange={filterStudies(label)}/>} label="Zinc (Zn)" color="primary" />
                            // <FormControlLabel control={<Checkbox checked={this.traceElements.aluminium} onChange={filterStudies(label)}/>} label="Aluminium (Pb)" color="primary" />
                            // <FormControlLabel control={<Checkbox checked={this.traceElements.manganese} onChange={filterStudies(label)}/>} label="Manganese (Mn)" color="primary" />
                            // <FormControlLabel control={<Checkbox checked={this.traceElements.sodium} onChange={filterStudies(label)}/>} label="Sodium (Na)" color="primary" />
                            // <FormControlLabel control={<Checkbox checked={this.traceElements.potassium} onChange={filterStudies(label)}/>} label="Potassium (K)" color="primary" />
                            // <FormControlLabel control={<Checkbox checked={this.traceElements.calcium} onChange={filterStudies(label)}/>} label="Calcium (Ca)" color="primary" />
                            // <FormControlLabel control={<Checkbox checked={this.traceElements.magnesium} onChange={filterStudies(label)}/>} label="Magnesium (Mg)" color="primary" />
                            // <FormControlLabel control={<Checkbox checked={this.traceElements.iron} onChange={filterStudies(label)}/>} label="Iron (Fe)" color="primary" />
                        ))}
                    </FormGroup> */}
                    <FormGroup>
                        <FormControlLabel control={<Checkbox checked={allChecked} onChange={handleSelectAllChange} />} label="Select All" />
                        {Object.entries(traceElements).map(([key, element]) => (
                            // <div key={key}>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={element.checked}
                                    onChange={() => handleCheckboxChange(key)}
                                />
                            }
                                label={element.name}
                            />
                            // </div>
                        ))}
                    </FormGroup>
                </div>
                <div style={{
                    width: '80vw',
                    aspectRatio: '1.75 / 1', // Maintain world map proportions (W:H ≈ 2:1)
                    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                    borderRadius: '3px',
                    overflow: 'scroll'
                }}>
                    <MapContainer
                        center={[0, 0]}
                        zoom={2}
                        minZoom={2}
                        maxZoom={2}
                        style={{ height: '100%', width: '100%' }}
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
                                    <span onDoubleClick={sortPapersByOcean(ocean.name)} style={{ cursor: "pointer" }}>
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