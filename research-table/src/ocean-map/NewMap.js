import React, { useState, useEffect, useRef, useCallback } from "react";
//import { Tooltip as ReactTooltip } from "react-tooltip";
import { MapContainer, TileLayer, Polygon, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Ocean polygon definitions (simplified bounding boxes)
const oceans = [
    {
        name: "Central East Pacific",//Ocean
        coordinates: [[[-180, 30], [-180, -15], [-75, -15], [-75, 5], [-112, 30], [-180, 30]]],
        color: "#CC79A7",
        studies: 9
    },
    {
        name: "Central West Pacific",// Ocean
        coordinates: [[[180, 30], [180, -15], [110, -15], [110, 30], [180, 30]]],
        color: "#CC79A7",
        studies: 10
    },
    {
        name: "Western North Pacific",// Ocean
        coordinates: [[[120, 60], [120, 30], [180, 30], [180, 60], [120, 60]]],
        color: "#332288",
        studies: 10
    },
    {
        name: "Australia Pacific",// Ocean
        coordinates: [[[110, -15], [110, -50], [180, -50], [180, -15], [110, -15]]],
        color: "#F0E442",
        studies: 9
    },
    {
        name: "South Pacific",// Ocean
        coordinates: [[[-180, -15], [-180, -50], [-70, -50], [-70, -15], [-180, -15]]],
        color: "#F0E442",
        studies: 5
    },
    {
        name: "Eastern North Pacific",// Ocean
        coordinates: [[[-180, 60], [-180, 30], [-90, 30], [-90, 60], [-180, 60]]],
        color: "purple",
        studies: 5
    },
    {
        name: "North Atlantic",// Ocean
        coordinates: [[[-90, 60], [-90, 30], [-5, 30], [-5, 40], [0, 40], [0, 60], [-90, 60]]],
        color: "yellow",
        studies: 11
    },
    {
        name: "Central Atlantic",// Ocean
        coordinates: [[[-112, 30], [-75, 5], [-75, -15], [20, -15], [20, 30], [-112, 30]]],
        color: "green",
        studies: 21
    },
    {
        name: "South Atlantic",// Ocean
        coordinates: [[[-70, -15], [-70, -50], [20, -50], [20, -15], [-70, -15]]],
        color: "#009E73",
        studies: 11
    },
    {
        name: "Medeterranian, Black and Caspian Sea",// Ocean
        coordinates: [[[-5, 30], [-5, 40], [0, 40], [0, 50], [60, 50], [60, 30], [-5, 30]]],
        color: "#000000",
        studies: 15
    },
    {
        name: "Bay of Bengal",
        coordinates: [[[80, 30], [80, 0], [110, 0], [110, 30], [80, 30]]],
        color: "#000000",
        studies: 4
    },
    {
        name: "Arabian Sea",
        coordinates: [[[20, 30], [20, 0], [80, 0], [80, 30], [20, 30]]],
        color: "#E69F00",
        studies: 6
    },
    {
        name: "Indian Ocean",
        coordinates: [[[20, 0], [20, -50], [110, -50], [110, 0], [20, 0]]],
        color: "#56B4E9",
        studies: 7
    },
    {
        name: "Southern Ocean",
        coordinates: [[[-180, -50], [-180, -90], [180, -90], [180, -50], [-180, -50]]],
        color: "#D55E00",
        studies: 6
    },
    {
        name: "Arctic Ocean",
        coordinates: [[[-180, 90], [-180, 60], [180, 60], [180, 90], [-180, 90]]],
        color: "#0072B2",
        studies: 7
    }
];

// Swap [lng, lat] → [lat, lng]
const swapCoordinates = coords =>
    coords.map(polygon => polygon.map(([lng, lat]) => [lat, lng]));

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

const OceanMap = ({ selectedOcean }) => {
    //[selectedOcean, setSelectedOcean] = useState('');

    const sortPapersByOcean = oceanName => event => {
        if (oceanName != "") {
            selectedOcean(oceanName)
        }
        //Write code to filter the research papers
        //setSelectedOcean(oceanName)
        //selectedOcean = oceanName
    }

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#e0e0e0'
        }}>
            <div style={{
                width: '90vw',
                aspectRatio: '2 / 1', // Maintain world map proportions (W:H ≈ 2:1)
                boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                borderRadius: '3px',
                overflow: 'hidden'
            }}>
                <MapContainer
                    center={[0, 0]}
                    zoom={4}
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
                            positions={swapCoordinates(ocean.coordinates)}
                            pathOptions={{ color: ocean.color, fillOpacity: 0.3 }}
                        // onclick={sortPapersByOcean(ocean.name)}
                        >
                            <Tooltip permanent direction="center" interactive={true} style={{ cursor: "pointer" }}>
                                <span onDoubleClick={sortPapersByOcean(ocean.name)} style={{ cursor: "pointer" }}>
                                    <strong>{ocean.name} : {ocean.studies}</strong>
                                    {/* <strong>Studies</strong> */}
                                </span>
                            </Tooltip>
                        </Polygon>
                    ))}

                    <FitToOceans polygons={oceans} />
                </MapContainer>
            </div>
        </div>
    );
};

export default OceanMap;