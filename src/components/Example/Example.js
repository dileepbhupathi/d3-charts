// const data = [
//   { x: "jan25", y: 3 },
//   { x: "feb5", y: 6 },
//   { x: "feb20", y: 2 },
//   { x: "mar2", y: 7 },
//   { x: "mar10", y: 5 },
//   { x: "mar18", y: 2 },
//   { x: "mar27", y: 0 },
//   { x: "apr1", y: 3 },
//   { x: "apr9", y: 8 },
//   { x: "apr21", y: 9 },
//   { x: "apr29", y: 2 },
//   { x: "may5", y: 5 },
//   { x: "may16", y: 9 },
//   { x: "may26", y: 3 },
//   { x: "jun1", y: 6 },
//   { x: "jun9", y: 3 },
//   { x: "jun19", y: 6 },
//   { x: "jun27", y: 2 },
//   { x: "jul3", y: 7 },
//   { x: "jul16", y: 5 },
//   { x: "jul26", y: 2 },
//   { x: "aug6", y: 1 },
//   { x: "aug14", y: 3 },
//   { x: "aug22", y: 8 },
//   { x: "sep9", y: 9 },
//   { x: "sep13", y: 2 },
//   { x: "sep29", y: 5 },
//   { x: "oct1", y: 9 },
//   { x: "oct15", y: 2 },
//   { x: "nov1", y: 7 },
// ];

import moment from "moment/moment";
import React from "react";

export const Example = () => {

//   const data = [
//   { x: new Date('2023-03-01 13:36:22'), y: 3 },
//   { x: new Date('2023-03-02 00:55:58'), y: 6 },
//   { x: new Date('2023-03-02 10:55:58'), y: 2 },
//   { x: new Date('2023-03-02 20:55:58'), y: 7 },
//   { x: new Date('2023-03-03 06:55:58'), y: 5 },
//   { x: new Date('2023-03-03 16:55:58'), y: 2 },
//   { x: new Date('2023-03-04 02:55:58'), y: 0 },
//   { x: new Date('2023-03-04 12:55:58'), y: 3 },
//   { x: new Date('2023-03-04 22:55:58') , y: 8 },
//   { x: new Date('2023-03-05 08:55:58'), y: 9 },
//   { x: new Date('2023-03-05 18:55:58'), y: 2 },
//   { x: new Date('2023-03-06 04:55:58'), y: 5 },
//   { x: new Date('2023-03-06 14:55:58'), y: 9 },
//   { x: new Date('2023-03-07 00:55:58'), y: 3 },
//   { x: new Date('2023-03-07 10:55:58'), y: 6 }
// ];

  var date = new Date();

  let dates = [date];

  function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return (
      date.getMonth() +
      1 +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear() +
      "  " +
      strTime
    );
  }
  let num = 1
  for (var i = 0; i <= 299; i += 10) {
    dates.push(new Date(date.valueOf() + i * 1000 * 60 * 60));
    // console.log(new Date(date.valueOf() + i * 1000 * 60 * 60))
    var newDates = new Date(date.valueOf() + i * 1000 * 60 * 60)
    var formatedDates = formatDate(newDates);

    var updatedFormat = moment.utc(newDates).local().format("YYYY-MM-DD HH:mm:ss")
    
    console.log((updatedFormat));
    num++
    // console.log(JSON.stringify(dates, null, 30))
  }

  return <div>example</div>;
};
