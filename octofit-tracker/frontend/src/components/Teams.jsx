import { useEffect, useState } from 'react'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams'

function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetch(teamsEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load teams.')
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
        setTeams(items)
      })
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="view-section"><div className="section-heading"><div><p className="eyebrow">Find your people</p><h1>Teams</h1><p className="lede">Small groups, shared goals, a reason to keep moving.</p></div></div>
      {state.loading && <p className="status-message">Loading teams...</p>}{state.error && <p className="status-message status-error">{state.error}</p>}
      {!state.loading && !state.error && <div className="team-grid">{teams.map((team) => <article className="team-card" key={team._id || team.id || team.name}><div className="team-swatch" style={{ background: team.color || '#7f9cf5' }} /><div className="team-body"><h2>{team.name}</h2><p>{team.description || 'Shared momentum and accountability.'}</p><span>{team.members?.length || 0} members</span></div></article>)}</div>}
    </section>
  )
}

export default Teams
