import { useEffect, useState } from 'react'
import { displayName } from '../api.js'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users`
  : 'http://localhost:8000/api/users'

function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetch(usersEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load users.')
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
        setUsers(items)
      })
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="view-section">
      <div className="section-heading"><div><p className="eyebrow">Community</p><h1>Athletes</h1><p className="lede">The people making movement part of their week.</p></div></div>
      {state.loading && <p className="status-message">Loading athletes...</p>}
      {state.error && <p className="status-message status-error">{state.error}</p>}
      {!state.loading && !state.error && <div className="table-shell"><table className="data-table"><thead><tr><th>Name</th><th>Email</th><th>Grade</th><th>Points</th></tr></thead><tbody>{users.map((user) => <tr key={user._id || user.id || user.email}><td>{displayName(user)}</td><td>{user.email || '—'}</td><td>{user.grade || '—'}</td><td>{user.points || 0}</td></tr>)}</tbody></table></div>}
    </section>
  )
}

export default Users
