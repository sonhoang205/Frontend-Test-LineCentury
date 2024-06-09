import React, { useState, useEffect } from "react";
import { CsvData } from "./utilities/types";
import { csvToObjects } from "./utilities/utilis";
import { Box } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { format } from "date-fns";

const App: React.FC = () => {
  const [data, setData] = useState<CsvData[]>([]);

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
      <ReactApexChart
        type="candlestick"
        series={[{ name: "candles", data: data }]}
        options={{
          chart: {
            height: 350,
            type: "candlestick",
          },
          title: {
            text: "CandleStick Chart - Category X-axis",
            align: "left",
          },
          tooltip: {
            enabled: true,
          },
          xaxis: {
            type: "category",
            labels: {
              formatter: function (val) {
                return format(Number(val), "dd/MM/yyyy");
              },
            },
            range: 6,
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
