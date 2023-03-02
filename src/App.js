import React from 'react'
import { BarChartD3 } from './components/BarChartD3/BarChartD3';
import { Example } from "./components/Example/Example";
import { LineChartD3 } from './components/LineChartD3/LineChartD3';
import { LineChartWithTimeIntervals } from './components/LineChartWithTimeIntervals/LineChartWithTimeIntervals';
import {TimeIntervalData} from './constants/TimeIntervalData'
import {RupeeData} from './constants/RupeeValue'

function App() {

  return (
    <>
      <LineChartD3/>
      <LineChartWithTimeIntervals TimeIntervalData = {TimeIntervalData}/>
      <BarChartD3 RupeeData={RupeeData}/>
      <Example/>
    </>
  );
}

export default App;
