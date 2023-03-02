import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export const LineChartWithTimeIntervals = ({ TimeIntervalData }) => {

    //Line Chart with x-axis time interval,tooltips,dots and legnds

  const svgRef = useRef(null);

  useEffect(() => {
    const width = 500;
    const height = 300;
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("margin-left", "50")
      .style("margin-top", "100")
      .style("margin-bottom", "50")
      .style("overflow", "visible");

    const xScale = d3
      .scaleTime()
      .domain([TimeIntervalData[0].x, TimeIntervalData[TimeIntervalData.length - 1].x])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, 10])
      .range([height, 0]);

    const generateScaleLine = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .curve(d3.curveMonotoneY);

    const xAxis = d3.axisBottom(xScale).ticks(d3.timeHour.every(12));

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("line")
      .attr("stroke-dasharray", `5, 5`)
      .attr("stroke", "lightgray")
      .attr('y1',`-${height}px`);

    const yAxis = d3.axisLeft(yScale).ticks(10);

    svg
      .append("g")
      .call(yAxis)
      .selectAll("line")
      .attr("stroke-dasharray", `5, 5`)
      .attr("stroke", "lightgray")
      .attr("x1", `${width}px`);

    svg
      .append("path")
      .datum(TimeIntervalData)
      .attr("d", generateScaleLine)
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("fill", "none");

    svg
      .selectAll(".dot1")
      .data(TimeIntervalData)
      .enter()
      .append("circle")
      .attr("r", 4)
      .attr("fill", "red")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .on("mouseover", (event, d) => {
        d3.select(event.target)
          .attr("r", 8)
          .append("title")
          .text(`XValue : ${d.x} , YValue : ${d.y}`);
      })
      .on("mouseout", (event, d) => {
        d3.select(event.target).attr("r", 5).select("title").remove();
      });

    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - 50}, 0)`);

    legend
      .append("circle")
      .attr("cx", 10)
      .attr("cy", 10)
      .attr("r", 5)
      .attr("fill", "red");

    legend
      .append("text")
      .attr("x", 25)
      .attr("y", 17)
      .attr("fill", "red")
      .attr("font-size", "18px")
      .text("Time Interval");

  }, [TimeIntervalData]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};
