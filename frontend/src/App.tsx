import { Route, Routes } from 'react-router-dom'
import Header from './components/layout/Header/Header'
import Sidebar from './components/layout/Sidebar/Sidebar'
import Dashboard from './components/layout/Pages/Dashboard/Dashboard'
import './App.css'

function App() {

  return (
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
  )
}

export default App
