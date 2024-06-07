import React, { useState, useEffect } from "react";
import { CsvData } from "./utilities/types";
import { csvToObjects } from "./utilities/utilis";
import { Box } from "@mui/material";
// import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import { format } from "date-fns";

const App: React.FC = () => {
  const [data, setData] = useState<CsvData[]>([]);
  console.log("data: ", data);

  useEffect(() => {
    fetch("/VFS_historical_data_StockScan.csv")
      .then((response) => response.text())
      .then((csvText) => {
        const json = csvToObjects(csvText);
        setData(json);
      });
  }, []);

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <h1>CSV Data as Key-Value Objects</h1>
      <ReactApexChart
        // type="candlestick"
        series={{ data: data, name: "candle" }}
        options={{
          chart: {
            height: 350,
            type: "candlestick",
          },
          title: {
            text: "CandleStick Chart - Category X-axis",
            align: "left",
          },
          annotations: {
            xaxis: [
              {
                x: "Oct 06 14:00",
                borderColor: "#00E396",
                label: {
                  borderColor: "#00E396",
                  style: {
                    fontSize: "12px",
                    color: "#fff",
                    background: "#00E396",
                  },
                  orientation: "horizontal",
                  offsetY: 7,
                  text: "Annotation Test",
                },
              },
            ],
          },
          tooltip: {
            enabled: true,
          },
          xaxis: {
            type: "category",
            labels: {
              formatter: function (val) {
                return format(val, "MMM DD HH:mm");
              },
            },
          },
          yaxis: {
            tooltip: {
              enabled: true,
            },
          },
        }}
      />
    </Box>
  );
};

export default App;
