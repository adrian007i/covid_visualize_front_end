import Plotly from 'react-plotly.js';
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from "@apollo/client";
import process from './Process';

// graphQL query
const COVID_QUERY = gql`
{
  cases_deaths {
    state
    tot_cases
    tot_deaths
    new_deaths
    new_cases
    start_date
    end_date
  }
  weeks 
}
`;
 
 
function App() {
  const { data, loading, error } = useQuery(COVID_QUERY); 

  const [plot_data, setPlotData] = useState([]);
  const [layout, setLayout] = useState(undefined);
  const [frames, setFrames] = useState(undefined); 
  const [metric, setMetric] = useState("tot_cases"); 

  useEffect(() => {
    if (!loading && !error) {
      const { layout, frames, plotData } = process(data.cases_deaths, data.weeks, metric);
      setLayout(layout);
      setFrames(frames);
      setPlotData(plotData);
    }
  }, [data, loading, error,metric]);

  // check if we are awaiting data from the api
  if (loading) return (
    <div className='main'>
      <h2>Loading Covid Statistics</h2>
      <br />
      <div id="loading_bar"></div>
    </div>);

  // effor fetching data
  if (error) return (
    <div className='main'>
      <h2>Something went wrong. Try Later!</h2>
      <br />
      <pre className='red'>Error:{error.message}</pre>
    </div>);
 
 
  
  
  return (
    <div className='main'>
      <select name="metric" id="metric" onChange={(e) => {setMetric(e.target.value)}}>
        <option value="tot_cases">Total Number of Active Cases</option>
        <option value="tot_deaths">Total Number of Deaths</option>
        <option value="new_cases">Number of New Cases</option>
        <option value="new_deaths">Number of New Deaths</option>
      </select>
      <Plotly divId='plotly_div' className='plotly_class' data={plot_data} layout={layout} frames={frames}   />  
    </div>
  );
}


export default App;
