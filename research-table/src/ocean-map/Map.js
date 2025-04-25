import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { blue, red, teal, yellow } from "@mui/material/colors";

const WorldMapWithTwoRectangles = () => {
    const svgRef = useRef();
    const [tooltipContent, setTooltipContent] = useState("");

    useEffect(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        const svg = d3.select(svgRef.current)
              .attr("width", width)
              .attr("height", height)
              .style("border", "1px solid #ccc");

        const projection = d3.geoNaturalEarth1()
            .scale(180)
            .translate([width / 2, height / 2]);

        const path = d3.geoPath().projection(projection);

        // Load world map
        d3.json("https://unpkg.com/world-atlas@1.1.4/world/110m.json").then(worldData => {
            const countries = topojson.feature(worldData, worldData.objects.countries).features;

            // Draw countries
            svg.selectAll(".country")
                .data(countries)
                .enter()
                .append("path")
                .attr("class", "country")
                .attr("d", path)
                .attr("fill", "#b8b8b8")
                .attr("stroke", "#fff")
                .attr("stroke-width", 0.5)

            // Define two rectangles
            const oceans = [
                {
                    name: "Central Pacific Ocean (CPAO)",
                    //coordinates: [[[30, -210], [-15, -210], [-15, -70], [30, -70], [30, -210]]]
                    coordinates: [[[-210, 30], [-210, -15], [-70, -15], [-70, 30], [-210, 30]]],
                    color: teal
                },
                {
                    name: "Eastern North Pacific Ocean",
                    //coordinates: [[[60, 150], [30, 150], [30, 180], [60, 180], [60, 150]]]
                    coordinates: [[[150, 60], [150, 30], [180, 30], [180, 60], [150, 60]]],
                    color: yellow
                },
                {
                    name: "Arctic Ocean",
                    coordinates: [[[-180, 90], [-180, 60], [180, 60], [180, 90], [-180, 90]]],
                    color: red
                }
            ];

            // Draw both rectangles
            oceans.forEach(ocean => {
                const featureObj = {
                    type: "Feature",
                    geometry: {
                        type: "Polygon",
                        coordinates: ocean.coordinates
                    }
                };

                svg.append("path")
                    .datum(featureObj)
                    .attr("d", path)
                    .attr("fill", ocean.color)//"rgba(0, 100, 255, 0.3)"
                    .attr("stroke", "blue")
                    .attr("stroke-width", 2);

                // Compute center of rectangle
                // const [x, y] = path.centroid(featureObj);
                // // Draw label
                // svg.append("text")
                //     .attr("x", x)
                //     .attr("y", y)
                //     .attr("text-anchor", "middle")
                //     .attr("dy", ".35em")
                //     .style("font-size", "12px")
                //     .style("fill", "#000")
                //     .style("font-weight", "bold")
                //     .text(ocean.name);
            });
        });
    }, []);

    return <div>
        <svg ref={svgRef}></svg>
        <ReactTooltip>{tooltipContent}</ReactTooltip>
    </div>
};

export default WorldMapWithTwoRectangles;
