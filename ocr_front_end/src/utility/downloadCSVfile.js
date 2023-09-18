const XLSX = require("xlsx");

function convertJSONToCSV(data) {
   const header = Object.keys(data[0]).join(",") + "\n";
   const csv = data.map((row) => Object.values(row).join(",")).join("\n");
   return header + csv;
}

const downloadFile = () => {
   const data = JSON.parse(localStorage.getItem("ExtractedTextList"));
   const csvContent = convertJSONToCSV(data);
   const blob = new Blob([csvContent], { type: "text/csv" });
   const url = URL.createObjectURL(blob);
   const a = document.createElement("a");
   a.href = url;
   a.download = "data.csv";
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
   URL.revokeObjectURL(url);
};

export default downloadFile;
