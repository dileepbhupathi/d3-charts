import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export const Example1 = () => {
  const svgRef = useRef();
  const [data] = useState([
    {
      key: "Jan",
      value1: 425,
      value2: 375,
      value3: 330,
      value4: 145,
    },
    {
      key: "Feb",
      value1: 0,
      value2: 440,
      value3: 380,
      value4: 238,
    },
    {
      key: "Mar",
      value1: 324,
      value2: 284,
      value3: 230,
      value4: 148,
    },
    {
      key: "Apr",
      value1: 0,
      value2: 0,
      value3: 400,
      value4: 293,
    },
    {
      key: "May",
      value1: 426,
      value2: 386,
      value3: 309,
      value4: 242,
    },
    {
      key: "Jun",
      value1: 0,
      value2: 0,
      value3: 430,
      value4: 256,
    },
    {
      key: "Jul",
      value1: 0,
      value2: 400,
      value3: 340,
      value4: 256,
    },
    {
      key: "Aug",
      value1: 0,
      value2: 405,
      value3: 365,
      value4: 310,
    },
  ]);

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create a stacked bar chart
    const stack = d3.stack().keys(["value1", "value2", "value3", "value4"]);
    const stackedData = stack(data);

    // Set x-axis scale
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.key))
      .range([0, width])
      .paddingInner(0.1)
      .paddingOuter(0.1);

    // Set y-axis scale
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(stackedData, (d) => d3.max(d, (d) => d[1]))])
      .nice()
      .range([height, 0]);

    // Set color scale
    const color = d3
      .scaleOrdinal()
      .domain(stack.keys())
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b"]);

    // Add x-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Add y-axis
    svg.append("g").call(d3.axisLeft(y));

    // Add bars
    svg
      .append("g")
      .selectAll("g")
      .data(stackedData)
      .join("g")
      .attr("fill", (d) => color(d.key))
      .selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("x", (d) => x(d.data.key))
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth())
      .append("title") // Add tooltip
      .text((d) => `${d.data.key}: ${d[1] - d[0]}`);
  }, [data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};
