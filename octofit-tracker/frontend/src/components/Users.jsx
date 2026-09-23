import { useEffect, useState } from 'react'
import { displayName, getUsers } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    getUsers()
      .then((items) => setUsers(items))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="view-section">
      <div className="section-heading"><div><p className="eyebrow">Community</p><h1>Athletes</h1><p className="lede">The people making movement part of their week.</p></div><span className="count-pill">{users.length} members</span></div>
      {state.loading && <p className="status-message">Loading athletes...</p>}
      {state.error && <p className="status-message status-error">{state.error}</p>}
      {!state.loading && !state.error && <div className="table-shell"><table className="data-table"><thead><tr><th>Name</th><th>Email</th><th>Grade</th><th>Points</th></tr></thead><tbody>{users.map((user) => <tr key={user._id || user.id || user.email}><td><strong>{displayName(user)}</strong></td><td>{user.email || '—'}</td><td>{user.grade || '—'}</td><td><span className="accent-value">{user.points ?? 0}</span></td></tr>)}</tbody></table>{users.length === 0 && <p className="empty-state">No athletes yet.</p>}</div>}
    </section>
  )
}

export default Users
