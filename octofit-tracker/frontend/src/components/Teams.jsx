import { useEffect, useState } from 'react'
import { getTeams } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    getTeams()
      .then((items) => setTeams(items))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="view-section"><div className="section-heading"><div><p className="eyebrow">Find your people</p><h1>Teams</h1><p className="lede">Small groups, shared goals, a reason to keep showing up.</p></div><span className="count-pill">{teams.length} teams</span></div>
      {state.loading && <p className="status-message">Loading teams...</p>}{state.error && <p className="status-message status-error">{state.error}</p>}
      {!state.loading && !state.error && <div className="team-grid">{teams.map((team) => <article className="team-card" key={team._id || team.id || team.name}><div className="team-swatch" style={{ backgroundColor: team.color || '#ef8354' }} /><div><h2>{team.name || 'Unnamed team'}</h2><p>{Array.isArray(team.members) ? `${team.members.length} member${team.members.length === 1 ? '' : 's'}` : 'Team roster'}</p></div><span className="team-arrow">↗</span></article>)}{teams.length === 0 && <p className="empty-state">No teams have been formed yet.</p>}</div>}
    </section>
  )
}

export default Teams
