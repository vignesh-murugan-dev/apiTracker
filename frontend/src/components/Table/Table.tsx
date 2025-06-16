import React, { useState, useEffect, memo } from "react";
import DataTable, { type TableStyles } from "react-data-table-component";
import { DownloadSimpleIcon, GearFineIcon } from "@phosphor-icons/react";
import { useRequest } from "../../context/RequestContext";
import "./Table.css";

interface RequestData {
  id: string;
  request_id: string;
  api_endpoint: string;
  request_type: string;
  request_time: string;
  payload: string;
  content_type: string;
  ip_address: string;
  os: string;
  user_agent: string;
}

interface RequestTableProps {
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

const columns = [
  {
    name: "REQUEST ID",
    selector: (row: RequestData) => row.id,
    sortable: true,
    grow: 2,
    cell: (row: RequestData) => (
      <div style={{ padding: "4px 8px", borderRadius: "8px", fontWeight: 500 }}>
        {row.request_id}
      </div>
    ),
  },
  {
    name: "API ENDPOINT",
    selector: (row: RequestData) => row.api_endpoint,
    sortable: true,
    grow: 3,
  },
  {
    name: "REQUEST TYPE",
    selector: (row: RequestData) => row.request_type,
    sortable: true,
    grow: 3,
    cell: (row: { type: string; endpoint: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
      <div
        style={{
          backgroundColor:
            row.request_type === 'GET'
              ? '#DBEAFE'
              : row.request_type === 'POST'
              ? '#DCFCE7'
              : row.request_type === 'PUT'
              ? '#FEF3C7'
              : '#FEE2E2',
          color:
            row.request_type === 'GET'
              ? 'blue'
              : row.request_type === 'POST'
              ? 'green'
              : row.request_type === 'PUT'
              ? 'orange'
              : 'red',
          padding: '4px',
          borderRadius: '8px',
          width: 'fit-content',
          fontWeight: 500,
        }}
      >
        {row.request_type}
      </div>
    ),
  },
  {
    name: "REQUEST TIME",
    selector: (row: RequestData) => row.request_time,
    sortable: true,
    grow: 2,
  },
  {
    name: "PAYLOAD",
    selector: (row: RequestData) => row.payload,
    sortable: false,
    grow: 3,
  },
  {
    name: "CONTENT TYPE",
    selector: (row: RequestData) => row.content_type,
    sortable: true,
    grow: 3,
  },
  {
    name: "IP ADDRESS",
    selector: (row: RequestData) => row.ip_address,
    sortable: true,
    grow: 2,
  },
  {
    name: "OS",
    selector: (row: RequestData) => row.os,
    sortable: true,
    grow: 2,
  },
  {
    name: "USER AGENT",
    selector: (row: RequestData) => row.user_agent,
    sortable: false,
    grow: 3,
  },
];

const RequestTable: React.FC<RequestTableProps> = ({ title }) => {
  const [search, setSearch] = useState("");
  const { requests, loading, fetchRequests, totalRows } = useRequest();
  const [currentPerPage, setCurrentPerPage] = useState(5);

  useEffect(() => {
    fetchRequests(1, currentPerPage);
  }, []); // Only run once on mount

  const handlePageChange = (page: number) => {
    fetchRequests(page, currentPerPage);
  };

  const handlePerPageChange = (newPerPage: number, page: number) => {
    setCurrentPerPage(newPerPage);
    fetchRequests(page, newPerPage);
  };

  const filteredData = React.useMemo(
    () =>
      requests.filter((row) =>
        [row.request_id, row.request_type, row.ip_address, row.os]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [requests, search]
  );

  return (
    <div className="custom-table-wrapper">
      <div className="custom-table-header">
        <p className="custom-table-title">{title}</p>
        <div className="custom-table-actions">
          <input
            type="text"
            disabled
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
        paginationServer
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 20]}
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerPageChange}
        progressPending={loading}
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

export default memo(RequestTable);
