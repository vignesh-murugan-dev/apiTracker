import React from "react";
import { FunnelIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import "./Filters.css";

const Filters: React.FC = () => {
  return (
    <div>
      <p className="title">FILTERS</p>
      <form>
        <div className="form-item">
          <label htmlFor="date">Date Range</label>
          <input
            type="date"
            id="date"
            value={""}
            placeholder="Select date range"
          />
        </div>
        <div className="form-item">
          <label htmlFor="api-endpoint">API Endpoint</label>
          <select name="api-endpoint" id="api-endpoint">
            <option value="all">All Endpoints</option>
          </select>
        </div>
        <div className="form-item">
            <label style={{margin: "0px"}}>Request Type</label>
            <div className="checkbox-group">
                <div className="checkbox-item">
                    <input type="checkbox" id="request-type" name="request-type" value="GET" />
                    <label htmlFor="request-type">GET</label>
                </div>
                <div className="checkbox-item">
                    <input type="checkbox" id="request-type" name="request-type" value="POST" />
                    <label htmlFor="request-type">POST</label>
                </div>
                <div className="checkbox-item">
                    <input type="checkbox" id="request-type" name="request-type" value="PUT" />
                    <label htmlFor="request-type">PUT</label>
                </div>
                <div className="checkbox-item">
                    <input type="checkbox" id="request-type" name="request-type" value="DELETE" />
                    <label htmlFor="request-type">DELETE</label>
                </div>
            </div>
        </div>
        <div className="form-item">
            <label htmlFor="ip-address">IP Address</label>
            <div className="search-wrapper">
                <input
                    type="text"
                    id="ip-address"
                    value={""}
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
