import { useEffect, useState } from 'react'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetch(workoutsEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load workouts.')
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
        setWorkouts(items)
      })
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="view-section"><div className="section-heading"><div><p className="eyebrow">Your next move</p><h1>Workouts</h1><p className="lede">A little structure for wherever your energy lands.</p></div></div>
      {state.loading && <p className="status-message">Loading workouts...</p>}{state.error && <p className="status-message status-error">{state.error}</p>}
      {!state.loading && !state.error && <div className="workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id || workout.id || workout.title}><div className="workout-body"><h2>{workout.title || 'Workout'}</h2><p>{workout.description || 'Move with intention and keep it sustainable.'}</p><span>{workout.duration || 'Flexible'} • {workout.level || 'All levels'}</span></div></article>)}</div>}
    </section>
  )
}

export default Workouts
