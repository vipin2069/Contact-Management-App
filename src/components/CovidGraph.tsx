import React from "react";
import { useQuery } from "react-query";
import { Line } from "react-chartjs-2";
import {
  Chart,
  TimeScale,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
} from "chart.js";

Chart.register(
  TimeScale,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement
);

const fetchGraphData = async () => {
  const response = await fetch(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );
  const data = await response.json();
  return data;
};

const CovidGraph: React.FC = () => {
  const { data, isLoading, isError } = useQuery("graphData", fetchGraphData);

  if (isLoading) {
    return <div>Loading graph data...</div>;
  }

  if (isError) {
    return <div>Error fetching graph data</div>;
  }

  const casesData = data?.cases || {};
  const dates = Object.keys(casesData);
  const cases = Object.values(casesData);

  const graphData = {
    labels: dates,
    datasets: [
      {
        label: "Cases",
        data: cases,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 className="m-auto text-2xl font-extrabold tracking-tight text-slate-900">
        COVID-19 Cases Graph
      </h2>
      <p className="text-sm">
        <strong className="text-grey-400">Note:</strong> A line graph showing
        the cases fluctuations from 2020-2023.
      </p>
      <div className="graphBox">
        <Line data={graphData} />
      </div>
    </div>
  );
};

export default CovidGraph;
