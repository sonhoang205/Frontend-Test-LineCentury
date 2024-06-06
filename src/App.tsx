import React, { useState, useEffect } from "react";

interface CsvData {
  Date: Date;
  Volume: number;
  Open: number;
  Close: number;
  High: number;
  Low: number;
}

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

  const csvToObjects = (csv: string): CsvData[] => {
    const lines = csv.trim().split("\n");
    const headers = lines[0].split(",").map((header) => header.trim());
    const result: CsvData[] = [];

    for (let i = 1; i < lines.length; i++) {
      const currentline = lines[i].split(",").map((value) => value.trim());
      const obj: any = {};

      for (let j = 0; j < headers.length; j++) {
        const key = headers[j];
        const value = currentline[j];

        if (key === "Date") {
          obj[key] = new Date(value); // Convert to Date object
        } else {
          obj[key] = parseFloat(value); // Convert to number
        }
      }

      result.push(obj);
    }

    return result;
  };

  return (
    <div>
      <h1>CSV Data as Key-Value Objects</h1>
    </div>
  );
};

export default App;
