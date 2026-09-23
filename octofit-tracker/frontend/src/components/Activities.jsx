import { useEffect, useState } from 'react'
import { displayName, formatDate, getActivities } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    getActivities()
      .then((items) => setActivities(items))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="view-section"><div className="section-heading"><div><p className="eyebrow">Live feed</p><h1>Recent movement</h1><p className="lede">Every session adds a little momentum to the board.</p></div><span className="count-pill">{activities.length} sessions</span></div>
      {state.loading && <p className="status-message">Loading activity...</p>}{state.error && <p className="status-message status-error">{state.error}</p>}
      {!state.loading && !state.error && <div className="activity-grid">{activities.map((activity) => <article className="activity-item" key={activity._id || activity.id}><div className="activity-icon">{activity.type === 'strength' ? 'ST' : activity.type === 'running' ? 'RN' : 'WK'}</div><div className="activity-copy"><div className="item-topline"><strong>{displayName(activity.user)}</strong><span>{formatDate(activity.completedAt)}</span></div><p>{activity.type || 'Workout'} · {activity.durationMinutes || 0} minutes{activity.distanceMiles ? ` · ${activity.distanceMiles} miles` : ''}</p></div><b className="points-badge">+{activity.points ?? 0}</b></article>)}{activities.length === 0 && <p className="empty-state">No activity has been logged yet.</p>}</div>}
    </section>
  )
}

export default Activities
