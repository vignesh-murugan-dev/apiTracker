import React, { useState } from "react";
import { FunnelIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useRequest } from "../../context/RequestContext";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "./Filters.css";

interface LocalFilters {
  dateRange: [Date, Date] | null;
  requestTypes: string[];
  ipAddress: string;
  apiEndpoint: string;
}

const Filters: React.FC = () => {
  const { updateFilters, fetchRequests } = useRequest();
  const [localFilters, setLocalFilters] = useState<LocalFilters>({
    dateRange: null,
    requestTypes: [],
    ipAddress: "",
    apiEndpoint: "all", 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const filtersToApply = {
      dateRange:
        localFilters.dateRange !== null
          ? localFilters.dateRange.map((date) => date.toISOString())
          : [],
      requestTypes: localFilters.requestTypes,
      ipAddress: localFilters.ipAddress,
      apiEndpoint: localFilters.apiEndpoint, // Add this line
    };

    updateFilters(filtersToApply);
    fetchRequests(1, 5, filtersToApply);
  };

  const handleCheckboxChange = (value: string) => {
    const updatedTypes = localFilters.requestTypes.includes(value)
      ? localFilters.requestTypes.filter((type) => type !== value)
      : [...localFilters.requestTypes, value];

    setLocalFilters((prev) => ({
      ...prev,
      requestTypes: updatedTypes,
    }));
  };

  return (
    <div>
      <p className="title">FILTERS</p>
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="date">Date Range</label>
          <DateRangePicker
            placeholder="Select Date Range"
            disabled
            id="date"
            value={localFilters.dateRange}
            onChange={(value) =>
              setLocalFilters((prev: LocalFilters) => ({
                ...prev,
                dateRange: value,
              }))
            }
          />
        </div>
        <div className="form-item">
          <label htmlFor="api-endpoint">API Endpoint</label>
          <select
            name="api-endpoint"
            id="api-endpoint"
            value={localFilters.apiEndpoint}
            onChange={(e) =>
              setLocalFilters((prev) => ({
                ...prev,
                apiEndpoint: e.target.value,
              }))
            }
          >
            <option value="all">All Endpoints</option>
            <option value="/api/requests">/api/requests</option>
            <option value="/api/requests/aggregate">
              /api/requests/aggregate
            </option>
            <option value="/api/test">/api/test</option>
            <option value="/api/items">/api/items</option>
          </select>
        </div>
        <div className="form-item">
          <label style={{ margin: "0px" }}>Request Type</label>
          <div className="checkbox-group">
            {["GET", "POST", "PUT", "DELETE"].map((type) => (
              <div key={type} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`type-${type}`}
                  checked={localFilters.requestTypes.includes(type)}
                  onChange={() => handleCheckboxChange(type)}
                />
                <label htmlFor={`type-${type}`}>{type}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="form-item">
          <label htmlFor="ip-address">IP Address</label>
          <div className="search-wrapper">
            <input
              type="text"
              id="ip-address"
              value={localFilters.ipAddress}
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  ipAddress: e.target.value,
                }))
              }
              placeholder="Filter by IP"
            />
            <MagnifyingGlassIcon className="search-icon" width="bold" />
          </div>
        </div>
        <button type="submit" className="filter-button">
          <FunnelIcon size={16} weight="light" color="white" />
          <span>Apply Filters</span>
        </button>
      </form>
    </div>
  );
};

export default Filters;
