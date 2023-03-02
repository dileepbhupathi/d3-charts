import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export const LineChartD3 = () => {

    // Line Chart in d3 with tooltips,legends,axis strokes with two different data's with two different y-axis

  const svgRef = useRef();


  const [Rupee] = useState([
    3, 6, 2, 7, 5, 2, 0, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9,
    2, 5, 9, 2, 7,
  ]);

  const [Dollar] = useState([
    543, 367, 215, 56, 65, 62, 87, 156, 287, 398, 523, 685, 652, 674, 639, 619,
    589, 558, 605, 574, 564, 496, 525, 476, 432, 458, 421, 387, 375, 368,
  ]);

  useEffect(() => {

    const w = 500;
    const h = 500;

    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("background", "#fff")
      .style("margin-top", "50")
      .style("margin-left", "50")
      .style("overflow", "visible");


    const xScale = d3
      .scaleLinear()
      .domain([0, Rupee.length - 1])
      .range([0, w]);

    const y1Scale = d3.scaleLinear().domain([0, 10]).range([h, 0]);

    const generateScaledLine1 = d3
      .line()
      .x((d, i) => xScale(i))
      .y(y1Scale)
      .curve(d3.curveCardinal);

    const y2Scale = d3.scaleLinear().domain([0, 700]).range([h, 0]);

    const generateScaledLine2 = d3
      .line()
      .x((d, i) => xScale(i))
      .y(y2Scale)
      .curve(d3.curveCardinal);

    const xAxis = d3.axisBottom(xScale).ticks();

    const y1Axis = d3.axisLeft(y1Scale).ticks(10);

    const y2Axis = d3.axisRight(y2Scale).ticks(5);

    svg
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0,${h})`)
      .selectAll("line")
      .attr("stroke-dasharray", `5, 5`)
      .attr("stroke", "rgb(144, 241, 141)")
      .attr("y1", `-${h}px`);

    svg
      .append("g")
      .call(y1Axis)
      .selectAll("line")
      .attr("stroke-dasharray", `5, 5`)
      .attr("stroke", "rgb(144, 241, 141)")
      .attr("x1", `${w}px`);

    svg.append("g").call(y2Axis).attr("transform", `translate(${w}, 0)`);

    svg
      .selectAll(".line1")
      .data([Rupee])
      .join("path")
      .attr("d", (d) => generateScaledLine1(d))
      .attr("fill", "none")
      .attr("stroke-width", 3)
      .attr("stroke", "gray");

    svg
      .selectAll(".dot1")
      .data(Rupee)
      .enter()
      .append("circle")
      .attr("r", 4)
      .attr("fill", "gray")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("cx", (value, index) => xScale(index))
      .attr("cy", (value, index) => y1Scale(value))
      .on("mouseover", (event, d) => {
        d3.select(event.target)
          .attr("r", 8)
          .append("title")
          .text(`Value : ${d}`);
      })
      .on("mouseout", (event, d) => {
        d3.select(event.target).attr("r", 5).select("title").remove();
      });

    const legend1 = svg
      .append("g")
      .attr("transform", `translate(${w - 85}, 0)`);

    legend1
      .append("circle")
      .attr("cx", 10)
      .attr("cy", 10)
      .attr("r", 7)
      // .attr('width', 15)
      // .attr('height', 15)
      .attr("fill", "gray");

    legend1
      .append("text")
      .attr("x", 25)
      .attr("y", 17)
      .attr("fill", "gray")
      .attr("font-size", "20px")
      .text("Rupee");

    svg
      .selectAll(".lin2")
      .data([Dollar])
      .join("path")
      .attr("d", (d) => generateScaledLine2(d))
      .attr("fill", "none")
      .attr("stroke-width", 3)
      .attr("stroke", "skyblue");

    svg
      .selectAll(".dot2")
      .data(Dollar)
      .enter()
      .append("circle")
      .attr("r", 4)
      .attr("fill", "skyblue")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("cx", (value, index) => xScale(index))
      .attr("cy", (value, index) => y2Scale(value))
      .on("mouseover", (event, d) => {
        d3.select(event.target)
          .attr("r", 8)
          .append("title")
          .text(`Value : ${d}`);
      })
      .on("mouseout", (event, d) => {
        d3.select(event.target).attr("r", 5).select("title").remove();
      });

    const legend2 = svg
      .append("g")
      // .attr("class", "legend")
      .attr("transform", `translate(${w - 85}, 0)`);

    legend2
      .append("circle")
      .attr("cx", 10)
      .attr("cy", 35)
      .attr("r", 7)
      // .attr('width', 15)
      // .attr('height', 15)
      .attr("fill", "skyblue");

    legend2
      .append("text")
      .attr("x", 25)
      .attr("y", 42)
      .attr("fill", "skyblue")
      .attr("font-size", "20px")
      .text("Dollar");

  }, [Rupee, Dollar]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};
