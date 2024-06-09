import { CsvData } from "./types";

export const csvToObjectForChart = (csv: string): CsvData[] => {
  const lines = csv.trim().split("\n"); // Trim and split by new line
  const headers = lines[0].split(",").map((header) => header.trim()); // Split header line by comma and trim
  const result: CsvData[] = [];

  for (let i = 1; i < lines.length; i++) {
    const currentline = lines[i].split(",").map((value) => value.trim());
    const obj: CsvData = { x: new Date(), y: [] };

    for (let j = 0; j < headers.length; j++) {
      const key = headers[j];
      const value = currentline[j];

      if (key === "Date") {
        obj.x = new Date(value); // Convert to timestamp
      } else if (["Open", "High", "Low", "Close"].includes(key)) {
        obj.y.push(parseFloat(value)); // Add to y array
      }
    }

    result.push(obj);
  }
  // Sort the result by the timestamp (x)
  result.sort((a, b) => a.x.getTime() - b.x.getTime());

  return result;
};
