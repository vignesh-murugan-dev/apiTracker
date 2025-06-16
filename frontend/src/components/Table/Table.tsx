import React, { useState } from "react";
import DataTable, { type TableStyles } from "react-data-table-component";
import "./Table.css";
import { DownloadSimpleIcon, GearFineIcon } from "@phosphor-icons/react";

interface RequestData {
  id: string;
  endpoint: string;
  type: string;
  timestamp: string;
  payload: string;
  contentType: string;
  ipAddress: string;
  os: string;
  userAgent: string;
}

interface RequestTableProps {
  data: RequestData[];
  columns: {
    name: string;
    selector: (row: RequestData) => string | number;
    sortable?: boolean;
    grow?: number;
    width?: string;
    wrap?: boolean;
  }[];
  title: string;
}

const customStyles: TableStyles = {
  headCells: {
    style: {
      padding: "10px",
      fontSize: "12px",
      fontWeight: 600,
      backgroundColor: "#f4f4f5",
      color: "#718096",
    },
  },
  cells: {
    style: {
      padding: "4px",
      fontSize: "12px",
      fontWeight: 400,
    },
  },
  header: {
    style: {
      fontSize: "16px",
      fontWeight: 900,
    },
  },
};

const RequestTable: React.FC<RequestTableProps> = ({ data, columns, title }) => {
  const [search, setSearch] = useState("");

  // Filter data based on search term (case-insensitive, checks endpoint + type + ip + os)
  const filteredData = data.filter((row) =>
    [row.endpoint, row.type, row.ipAddress, row.os]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="custom-table-wrapper">
      <div className="custom-table-header">
        <p className="custom-table-title">{title}</p>
        <div className="custom-table-actions">
          <input
            type="text"
            placeholder="Search requests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              marginBottom: "10px",
              padding: "8px",
              border: "1px solid #e2e8f0",
              borderRadius: "4px",
              width: "100%",
              maxWidth: "300px",
            }}
          />
          <DownloadSimpleIcon size={20} color="gray" className="table-action" />
          <GearFineIcon size={20} color="gray" className="table-action" />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10]}
        responsive
        highlightOnHover
        striped
        dense
        fixedHeader
        fixedHeaderScrollHeight="400px"
        customStyles={customStyles}
      />
    </div>
  );
};

export default RequestTable;
