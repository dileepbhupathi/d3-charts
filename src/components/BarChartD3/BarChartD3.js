import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export const BarChartD3 = ({ RupeeData }) => {

  const svgRef = useRef();

  useEffect(() => {

    const width = 600;
    const height = 400;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("margin-bottom", "50")
      .style("margin-top", "50")
      .style("margin-left", "50")
      .style("overflow", "visible");

    const xScale = d3
      .scaleBand()
      .domain(d3.range(RupeeData.length))
      .range([0, width])
      .padding(0.5);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(RupeeData)])
      .nice()
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale).tickFormat((i) => i + 1);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
      .selectAll("line")
      .attr("stroke-dasharray", `5, 5`)
      .attr("stroke", "cyan")
      .attr("y1", `-${height}px`);

    const yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      .call(yAxis);

    svg
      .selectAll("rect")
      .data(RupeeData)
      .join("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(0) - yScale(d))
      .attr("fill", "royalblue")
      .on("mouseover", (event, d) => {
        d3.select(event.target)
          .append("title")
          .text(`Value : ${d}`);
      })
      .on("mouseout", (event, d) => {
        d3.select(event.target).attr("r", 5).select("title").remove();
      });

    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - 100}, 0)`);

    legend
      .append("rect")
      .attr("x", 10)
      .attr("y", 10)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "royalblue");

    legend
      .append("text")
      .attr("x", 30)
      .attr("y", 24)
      .attr("fill", "royalblue")
      .attr("font-size", "20px")
      .text("Rupee Value");

  }, [RupeeData]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};
