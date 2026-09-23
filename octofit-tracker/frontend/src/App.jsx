import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { apiBaseUrl } from './api.js'
import './App.css'

const navigation = [
  { to: '/', label: 'Overview', icon: '01' },
  { to: '/activities', label: 'Activity', icon: '02' },
  { to: '/leaderboard', label: 'Leaderboard', icon: '03' },
  { to: '/teams', label: 'Teams', icon: '04' },
  { to: '/users', label: 'Athletes', icon: '05' },
  { to: '/workouts', label: 'Workouts', icon: '06' },
]

function Overview() {
  return (
    <section className="overview view-section">
      <div className="hero-copy"><p className="eyebrow">OctoFit Tracker / Fall term</p><h1>Make your<br /><em>move</em> count.</h1><p className="lede">A shared space for small wins, strong teams, and the momentum that comes from showing up.</p><NavLink className="primary-button" to="/workouts">Find a workout <span>↗</span></NavLink></div>
      <div className="overview-art" aria-hidden="true"><span className="art-ring ring-one" /><span className="art-ring ring-two" /><span className="art-mark">OF</span><span className="art-caption">MOVE<br />TOGETHER</span></div>
      <div className="overview-strip"><div><span className="strip-label">Today’s prompt</span><strong>Do something<br />that feels good.</strong></div><div className="strip-rule" /><div><span className="strip-label">API connection</span><strong className="connection"><span />{apiBaseUrl.replace(/^https?:\/\//, '')}</strong></div></div>
    </section>
  )
}

function App() {
  return (
    <div className="app-frame">
      <header className="topbar"><NavLink className="brand" to="/"><img src="/octofitapp-small.png" alt="" /><span>OCTOFIT<small>TRACKER</small></span></NavLink><div className="topbar-note"><span className="pulse" />Team fitness, made visible</div><button className="avatar-button" type="button" aria-label="Open profile menu">PA</button></header>
      <div className="app-body"><aside className="sidebar"><p className="sidebar-label">Navigate</p><nav aria-label="Primary navigation">{navigation.map((item) => <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><span>{item.icon}</span>{item.label}</NavLink>)}</nav><div className="sidebar-footer"><span className="footer-dot" />Connected to API</div></aside><main className="main-content"><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /><Route path="*" element={<Overview />} /></Routes></main></div>
    </div>
  )
}

export default App
