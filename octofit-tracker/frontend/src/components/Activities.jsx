import { useEffect, useState } from 'react'
import { displayName, formatDate } from '../api.js'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities'

function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetch(activitiesEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load activities.')
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
        setActivities(items)
      })
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="view-section"><div className="section-heading"><div><p className="eyebrow">Live feed</p><h1>Recent movement</h1><p className="lede">Every session adds a little momentum to the week.</p></div></div>
      {state.loading && <p className="status-message">Loading activity...</p>}{state.error && <p className="status-message status-error">{state.error}</p>}
      {!state.loading && !state.error && <div className="activity-grid">{activities.map((activity) => <article className="activity-item" key={activity._id || activity.id}><div className="activity-meta"><span className="activity-tag">{activity.type || 'Activity'}</span><time>{formatDate(activity.date || activity.createdAt)}</time></div><div className="activity-copy"><strong>{displayName(activity.user || activity.athlete)}</strong><p>{activity.title || activity.note || activity.summary || 'No details provided.'}</p></div></article>)}</div>}
    </section>
  )
}

export default Activities
