import './App.css'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div><span className="eyebrow">OCTOFIT / 2026</span><h1>Move with purpose.</h1></div>
        <span className="status-dot">LIVE TRACKER</span>
      </header>
      <nav className="nav-tabs" aria-label="Primary navigation">
        <NavLink to="/leaderboard">Leaderboard</NavLink>
        <NavLink to="/activities">Activities</NavLink>
        <NavLink to="/workouts">Workouts</NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/users">Users</NavLink>
      </nav>
      <main className="content"><Routes>
        <Route path="/" element={<Navigate to="/leaderboard" replace />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes></main>
    </div>
  )
}

export default App
