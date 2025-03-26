import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { blue } from "@mui/material/colors";

const OceanMap = () => {
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

    // Load TopoJSON world map
    d3.json("https://unpkg.com/world-atlas@1.1.4/world/110m.json").then((world) => {
      const countries = topojson.feature(world, world.objects.countries).features;

      // Draw the countries
      svg.selectAll(".country")
        .data(countries)
        .enter()
        .append("path")
        .attr("class", "country")
        .attr("d", path)
        .attr("fill", "#b8b8b8")
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5)
      // .on("mouseover", (event, d) => {
      //   d3.select(event.target).attr("fill", "#3182bd");
      //   setTooltipContent(`Country ID: ${d.id}`);
      // })
      // .on("mouseout", (event) => {
      //   d3.select(event.target).attr("fill", "#b8b8b8");
      //   setTooltipContent("");
      // })
      // .on("click", (event, d) => {
      //   alert(`Clicked on Country ID: ${d.id}`);
      // });

      // const graticule = d3.geoGraticule();
      // svg.append("path")
      //   .datum(graticule())
      //   .attr("d", path)
      //   .attr("fill", "none")
      //   .attr("stroke", "#ccc")
      //   .attr("stroke-width", 0.5);

      // Draw oceans with labels
      const oceans = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature", "properties": { "name": "Central Pacific Ocean (CPAO)" },
            "geometry": { "type": "Polygon", "coordinates": [[[30, -210], [-15, -210], [-15, -70], [30, -70]]] }
          },
          {
            "type": "Feature", "properties": { "name": "Australia/South Pacific Ocean" },
            "geometry": { "type": "Polygon", "coordinates": [[[-15, 110], [-50, 300], [-50, 300], [-15, 110]]] }
          },
          {
            "type": "Feature", "properties": { "name": "Eastern North Pacific Ocean" },
            "geometry": { "type": "Polygon", "coordinates": [[[60, 150], [30, 150], [30, 180], [60, 180]]] }
          },
          {
            "type": "Feature", "properties": { "name": "Western North Pacific Ocean" },
            "geometry": { "type": "Polygon", "coordinates": [[[60, 180], [30, 180], [30, 270], [60, 270]]] }
          },
          {
            "type": "Feature", "properties": { "name": "North Atlantic Ocean" },
            "geometry": { "type": "Polygon", "coordinates": [[[60, -90], [30, -90], [30, 110], [60, 110]]] }
          },
          {
            "type": "Feature", "properties": { "name": "Central Atlantic Ocean" },
            "geometry": { "type": "Polygon", "coordinates": [[[30, -70], [-15, -70], [-15, 30], [30, 30]]] }
          },
          {
            "type": "Feature", "properties": { "name": "South Atlantic Ocean" },
            "geometry": { "type": "Polygon", "coordinates": [[[15, -60], [-50, -60], [-50, 30], [15, 30]]] }
          },
          {
            "type": "Feature", "properties": { "name": "Bay of Bengal" },
            "geometry": { "type": "Polygon", "coordinates": [[[80, 30], [80, -50], [110, -50], [80, 30]]] }
          },
          {
            "type": "Feature", "properties": { "name": "Arabian Sea" },
            "geometry": { "type": "Polygon", "coordinates": [[[30, 30], [30, -50], [80, -50], [80, 30]]] }
          },
          {
            "type": "Feature", "properties": { "name": "Southern Ocean" },
            "geometry": { "type": "Polygon", "coordinates": [[[-50, 0], [-90, 0], [-90, 360], [-50, 360]]] }
          },
          {
            "type": "Feature", "properties": { "name": "Arctic Ocean" },
            "geometry": { "type": "Polygon", "coordinates": [[[0, 90], [0, 60], [360, 60], [360, 90]]] }
          },
        ]
      }

      // const oceans = [
      //   { name: "Central Pacific Ocean (CPAO)", coords: [[30, -210], [-15, -210], [-15, -70], [30, -70]], color: "#b1d38e", label: [-150, 10] },
      //   { name: "Australia/South Pacific Ocean", coords: [[-15, 110], [-50, 300], [-50, 300], [-15, 110]], color: "#b3b3b3", label: [-175, 25] },
      //   { name: "Eastern North Pacific Ocean", coords: [[60, 150], [30, 150], [30, 180], [60, 180]], color: "#e1cf9c", label: [150, 60] },
      //   { name: "Western North Pacific Ocean", coords: [[60, 180], [30, 180], [30, 270], [60, 270]], color: "#fde8a5", label: [180, 60] },
      //   { name: "North Atlantic Ocean", coords: [[60, -90], [30, -90], [30, 110], [60, 110]], color: "#b9b7d8", label: [-90, 60] },
      //   { name: "Central Atlantic Ocean", coords: [[30, -70], [-15, -70], [-15, 30], [30, 30]], color: "#b9b7d8", label: [-70, 30] },
      //   { name: "South Atlantic Ocean", coords: [[15, -60], [-50, -60], [-50, 30], [15, 30]], color: "#ef94be", label: [-60, 15] },
      //   { name: "Bay of Bengal", coords: [[80, 30], [80, -50], [110, -50], [80, 30]], color: "#94a7c9", label: [80, 15] },
      //   { name: "Arabian Sea", coords: [[30, 30], [30, -50], [80, -50], [80, 30]], color: "#ecaf7f", label: [30, 10] },
      //   { name: "Southern Ocean", coords: [[-50, 0], [-90, 0], [-90, 360], [-50, 360]], color: "#eff3ff", label: [0, -50] },
      //   { name: "Arctic Ocean", coords: [[0, 90], [0, 60], [360, 60], [360, 90]], color: "#8ebbda", label: [0, 90] }
      // ];      

      svg.selectAll("path")
      .data(oceans.features)
      //.enter()
      .append("path")
      //.attr("class", "ocean")
      .attr("d", path)
      .attr("fill", "#b8b8b8")
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      // oceans.forEach(ocean => {
      //   //ocean.coords.forEach((polygonCoords) => {
      //   const oceanPolygon = {
      //     type: "Feature",
      //     geometry: {
      //       type: "Polygon",
      //       coordinates: [ocean.coords]
      //     }
      //   };

      //   svg.append("path")
      //     .attr('class', ocean.name)
      //     .datum(oceanPolygon)
      //     .attr("d", path)
      //     .attr("fill", ocean.color)
      //     .attr("opacity", 0.75)
      //     .attr("stroke", "#08306b")        // Border color
      //     .attr("stroke-width", 1.5);       // Border width
        //});

        // Add ocean labels
        // const [x, y] = projection(ocean.label);
        // svg.append("text")
        //   .attr("x", x)
        //   .attr("y", y)
        //   .attr("text-anchor", "middle")
        //   .style("fill", "#08306b")
        //   .style("font-size", "18px")
        //   .style("font-weight", "bold")
        //   .text(ocean.name);
      // });
    });
  }, []);

  return (
    <div>
      <svg ref={svgRef}></svg>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
    </div>
  );
};

export default OceanMap;