import React from "react";
import { ExportOutlined } from "@ant-design/icons";
import { Button } from "antd";
import * as XLSX from "xlsx";

const DownloadComponent = ({ data }) => {
   const exportData = () => {
      const Headers = [ "Company Name", "Website", "Email", "Contact"];
      const SheetData = [Headers];

      data.map((item) => {
         SheetData.push([item["companyName"], item["website"], item["email"], item["contact"]]);
      });

      console.log(SheetData)
      const ws = XLSX.utils.aoa_to_sheet(SheetData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      XLSX.writeFile(wb, "exported_data.xlsx");
   };

   return (
      <Button type="primary" onClick={exportData}>
         <ExportOutlined /> Export
      </Button>
   );
};

export default DownloadComponent;
