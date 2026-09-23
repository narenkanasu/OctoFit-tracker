import { useEffect, useState } from 'react'
import { displayName } from '../api.js'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
  : 'http://localhost:8000/api/leaderboard'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetch(leaderboardEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load leaderboard.')
        }
        return response.json()
      })
      .then((payload) => {
        const items = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
            ? payload.results
            : Array.isArray(payload?.data)
              ? payload.data
              : Array.isArray(payload?.items)
                ? payload.items
                : Array.isArray(payload?.data?.results)
                  ? payload.data.results
                  : []
        setEntries(items)
      })
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="view-section"><div className="section-heading"><div><p className="eyebrow">Friendly competition</p><h1>Leaderboard</h1><p className="lede">A snapshot of the effort powering everyone forward.</p></div></div>
      {state.loading && <p className="status-message">Loading leaderboard...</p>}{state.error && <p className="status-message status-error">{state.error}</p>}
      {!state.loading && !state.error && <div className="leaderboard-list">{entries.map((entry, index) => <div className={`rank-row ${index < 3 ? 'rank-highlight' : ''}`} key={entry._id || entry.id || entry.name}><div className="rank-badge">#{index + 1}</div><div className="rank-copy"><strong>{displayName(entry.user || entry.athlete || entry.name)}</strong><span>{entry.team || entry.group || 'Community'}</span></div><div className="rank-score">{entry.points || 0}</div></div>)}</div>}
    </section>
  )
}

export default Leaderboard
