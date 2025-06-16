import { Route, Routes } from "react-router-dom";
import { RequestProvider } from "./context/RequestContext";
import Header from "./components/layout/Header/Header";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import Dashboard from "./components/layout/Pages/Dashboard/Dashboard";
import "./App.css";

function App() {
  return (
    <RequestProvider>
      <div className="app">
        <Header />
        <div className="content-container">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </div>
    </RequestProvider>
  );
}

export default App;
