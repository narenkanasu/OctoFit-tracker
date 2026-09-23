import { useEffect, useState } from 'react'
import { displayName, getLeaderboard } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    getLeaderboard()
      .then((items) => setEntries(items))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="view-section"><div className="section-heading"><div><p className="eyebrow">Friendly competition</p><h1>Leaderboard</h1><p className="lede">A snapshot of the effort powering OctoFit.</p></div><span className="count-pill">{entries.length} ranked</span></div>
      {state.loading && <p className="status-message">Loading leaderboard...</p>}{state.error && <p className="status-message status-error">{state.error}</p>}
      {!state.loading && !state.error && <div className="leaderboard-list">{entries.map((entry, index) => <div className={`rank-row ${index < 3 ? 'rank-highlight' : ''}`} key={entry._id || entry.id || index}><span className="rank-number">{entry.rank || index + 1}</span><div><strong>{displayName(entry.user)}</strong><small>{displayName(entry.team)}</small></div><span className="rank-points">{entry.points ?? 0}<small> pts</small></span></div>)}{entries.length === 0 && <p className="empty-state">The leaderboard is waiting for its first entries.</p>}</div>}
    </section>
  )
}

export default Leaderboard
