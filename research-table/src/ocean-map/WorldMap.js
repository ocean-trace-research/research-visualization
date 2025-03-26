import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const OceanMap = () => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 1200;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid #ccc");

    // 🌎 Main Map Projection (NaturalEarth1)
    const mainProjection = d3.geoNaturalEarth1()
      .scale(200)
      .translate([width / 2, height / 2]);

    const mainPath = d3.geoPath().projection(mainProjection);

    // 🌍 Polar Projections for Arctic & Southern Oceans
    const polarSize = 200;  // Inset map size

    const arcticProjection = d3.geoOrthographic()
      .scale(120)
      .translate([polarSize / 2, polarSize / 2])
      .rotate([0, -90]);  // Top-down Arctic view

    const southernProjection = d3.geoOrthographic()
      .scale(120)
      .translate([polarSize / 2, polarSize / 2])
      .rotate([0, 90]);  // Bottom-up Southern view

    const polarPath = d3.geoPath();

    // 🌊 Ocean Coordinates
    const oceans = [
      {
        name: "Pacific Ocean",
        coordinates: [
          [[[-180, 60], [-180, -60], [-100, -60], [-100, 60], [-180, 60]]],   // Left of Date Line
          [[[100, 60], [100, -60], [180, -60], [180, 60], [100, 60]]]          // Right of Date Line
        ],
        color: "#6baed6",
        label: [-140, 0]
      },
      {
        name: "Atlantic Ocean",
        coordinates: [
          [[[ -80, 60], [-80, -60], [20, -60], [20, 60], [-80, 60]]]
        ],
        color: "#9ecae1",
        label: [-40, 10]
      },
      {
        name: "Indian Ocean",
        coordinates: [
          [[[20, 30], [20, -60], [120, -60], [120, 30], [20, 30]]]
        ],
        color: "#c6dbef",
        label: [80, -20]
      },
      {
        name: "Southern Ocean",
        coordinates: [
          [[[-180, -60], [-180, -90], [180, -90], [180, -60], [-180, -60]]]
        ],
        color: "#eff3ff",
        label: [0, -75],
        polar: true,
        polarProjection: southernProjection
      },
      {
        name: "Arctic Ocean",
        coordinates: [
          [[[-180, 70], [-180, 90], [180, 90], [180, 70], [-180, 70]]]
        ],
        color: "#b3cde3",
        label: [0, 80],
        polar: true,
        polarProjection: arcticProjection
      }
    ];

    // ✅ Create GeoJSON for Oceans
    const createGeoJSON = (ocean) => ({
      type: ocean.coordinates.length > 1 ? "MultiPolygon" : "Polygon",
      coordinates: ocean.coordinates.length > 1
        ? ocean.coordinates.map(polygon => polygon)
        : ocean.coordinates[0]
    });

    // 🌊 Render Main Oceans
    svg.selectAll(".main-ocean")
      .data(oceans.filter(ocean => !ocean.polar))
      .enter()
      .append("path")
      .attr("class", "main-ocean")
      .attr("d", (d) => {
        try {
          return mainPath(createGeoJSON(d)) || "";
        } catch (error) {
          console.error(`Error rendering ${d.name}:`, error);
          return "";
        }
      })
      .attr("fill", d => d.color)
      .attr("stroke", "#08306b")
      .attr("stroke-width", 1.5)
      .attr("opacity", 0.7);

    // 🌊 Render Polar Oceans Separately
    oceans.filter(o => o.polar).forEach((ocean, index) => {
      const polarSvg = svg.append("g")
        .attr("transform", `translate(${index === 0 ? 20 : width - polarSize - 20}, 20)`);

      polarSvg.append("circle")
        .attr("cx", polarSize / 2)
        .attr("cy", polarSize / 2)
        .attr("r", polarSize / 2)
        .attr("fill", "#e5e5e5")
        .attr("stroke", "#ccc");

      polarSvg.append("path")
        .datum(createGeoJSON(ocean))
        .attr("d", d => polarPath.projection(ocean.polarProjection)(d))
        .attr("fill", ocean.color)
        .attr("stroke", "#08306b")
        .attr("stroke-width", 1.5)
        .attr("opacity", 0.7);

      // Add Polar Labels
      polarSvg.append("text")
        .attr("x", polarSize / 2)
        .attr("y", polarSize - 10)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("fill", "#08306b")
        .text(ocean.name);
    });

    // 🛑 Add Labels with Safety Checks
    oceans.forEach((ocean) => {
      if (!ocean.polar) {
        const projected = mainProjection(ocean.label);

        if (Array.isArray(projected)) {
          const [x, y] = projected;

          svg.append("text")
            .attr("x", x)
            .attr("y", y)
            .attr("text-anchor", "middle")
            .style("fill", "#08306b")
            .style("font-size", "18px")
            .style("font-weight", "bold")
            .text(ocean.name);
        }
      }
    });

  }, []);

  return <svg ref={svgRef}></svg>;
};

export default OceanMap;
