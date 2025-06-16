import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

interface Request {
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

interface FilterState {
  dateRange: string[];
  requestTypes: string[];
  ipAddress: string;
  apiEndpoint: string;
}

interface RequestContextType {
  requests: Request[];
  loading: boolean;
  totalRows: number;
  filters: FilterState;
  updateFilters: (newFilters: FilterState) => void;
  fetchRequests: (
    page: number,
    perPage: number,
    newFilters?: FilterState
  ) => Promise<void>;
  refreshAllData: () => Promise<void>;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export const RequestProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [filters, setFilters] = useState<FilterState>({
    dateRange: [],
    requestTypes: [],
    ipAddress: "",
    apiEndpoint: "",
  });

  const updateFilters = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const fetchRequests = useCallback(
    async (page: number, perPage: number, newFilters?: FilterState) => {
      setLoading(true);
      try {
        const filtersToUse = newFilters || filters;

        const params = new URLSearchParams({
          page: page.toString(),
          per_page: perPage.toString(),
        });

        if (filtersToUse.ipAddress) {
          params.append("ip_address", filtersToUse.ipAddress);
        }

        if (filtersToUse.requestTypes.length > 0) {
          filtersToUse.requestTypes.forEach((type) => {
            params.append("request_type", type);
          });
        }

        if (filtersToUse.apiEndpoint && filtersToUse.apiEndpoint !== "all") {
          params.append("api_endpoint", filtersToUse.apiEndpoint);
        }

        if (filtersToUse.dateRange?.length === 2) {
          filtersToUse.dateRange.forEach((date) => {
            params.append("date_range", date);
          });
        }

        const response = await axios.get(
          `http://localhost:5000/api/requests?${params}`
        );
        setRequests(response.data.requests);
        setTotalRows(response.data.total);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  const refreshAllData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch table data with current settings
      await fetchRequests(1, 5);

      // Fetch analytics data
      await Promise.all([
        axios.get("http://localhost:5000/api/total-requests"),
        axios.get(
          "http://localhost:5000/api/requests/aggregate?field=request_type"
        ),
        axios.get("http://localhost:5000/api/requests/aggregate?field=os"),
      ]);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchRequests]);

  return (
    <RequestContext.Provider
      value={{
        requests,
        loading,
        totalRows,
        filters,
        updateFilters,
        fetchRequests,
        refreshAllData,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export const useRequest = () => {
  const context = useContext(RequestContext);
  if (context === undefined) {
    throw new Error("useRequest must be used within a RequestProvider");
  }
  return context;
};
