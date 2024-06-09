/** React imports */
import React, { useState, useEffect } from "react";

/** Types */
import { CsvData } from "./utilities/types";

/** Functions */
import { csvToObjectForChart } from "./utilities/utilis";

/** 3rd Party */
import { Box, ThemeProvider, createTheme } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App: React.FC = () => {
  const [data, setData] = useState<CsvData[]>([]);
  const [filteredData, setFilteredData] = useState<CsvData[]>([]);
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);

  useEffect(() => {
    fetch("/VFS_historical_data_StockScan.csv")
      .then((response) => response.text())
      .then((csvText) => {
        const json = csvToObjectForChart(csvText);
        setData(json);
      });
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const filtered = data.filter((item) => {
        const date = new Date(item.x);
        return date >= start && date <= end;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [startDate, endDate, data]);

  const option: ApexCharts.ApexOptions = {
    chart: {
      type: "candlestick",
      zoom: {
        enabled: false,
      },
      background: "#1c2027",
    },
    grid: {
      padding: {
        left: 20,
        right: 20,
        bottom: 20,
        top: 20,
      },
    },
    xaxis: {
      type: "category",
      labels: {
        rotate: 0,
        datetimeFormatter: {
          year: "yyyy-dd-MM",
          month: "yyyy-dd-MM",
          day: "yyyy-dd-MM",
          hour: "yyyy-dd-MM",
        },
        formatter: function (value: any) {
          return new Date(value).toLocaleDateString();
        },
        style: {
          fontWeight: "regular",
          colors: "#ffffff",
        },
      },
      tickAmount: 6,
    },
    yaxis: {
      labels: {
        show: true,
        align: "center",
        style: {
          fontWeight: "regular",
          colors: "#ffffff",
        },
      },
      tooltip: {
        enabled: true,
        offsetX: 0,
      },
    },
    tooltip: {
      followCursor: true,
      hideEmptySeries: true,
      x: {
        format: "yyyy-dd-MM",
      },
    },
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        display={"flex"}
        width={"100%"}
        height={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
        p={2}
        sx={{ backgroundColor: "#1c2027" }}
      >
        <Box
          width={800}
          p={{ xs: 2, lg: 0 }}
          display={"flex"}
          flexDirection={"column"}
        >
          <Box
            fontSize={40}
            color={"white"}
            textAlign={"center"}
            fontWeight={700}
            mb={2}
          >
            Line Century Frontend Test
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row-reverse"}
            width={"100%"}
            mb={2}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="To Date"
                value={endDate}
                onChange={(val) => setEndDate(val)}
                format="YYYY-MM-DD"
                maxDate={dayjs("05/31/2024")}
                minDate={dayjs("08/15/2023")}
              />
              <DatePicker
                label="From Date"
                value={startDate}
                onChange={(val) => setStartDate(val)}
                sx={{ mr: 2 }}
                format="YYYY-MM-DD"
                maxDate={dayjs("05/31/2024")}
                minDate={dayjs("08/15/2023")}
              />
            </LocalizationProvider>
          </Box>
          <Box width={"100%"}>
            <ReactApexChart
              type="candlestick"
              series={[{ name: "candles", data: filteredData }]}
              options={option}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
