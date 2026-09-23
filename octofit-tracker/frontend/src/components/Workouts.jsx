import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    getCollection('workouts')
      .then((items) => setWorkouts(items))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="view-section"><div className="section-heading"><div><p className="eyebrow">Your next move</p><h1>Workouts</h1><p className="lede">A little structure for wherever your energy is today.</p></div><span className="count-pill">{workouts.length} plans</span></div>
      {state.loading && <p className="status-message">Loading workouts...</p>}{state.error && <p className="status-message status-error">{state.error}</p>}
      {!state.loading && !state.error && <div className="workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id || workout.id || workout.title}><div className="workout-meta"><span>{workout.type || 'Training'}</span><span>{workout.durationMinutes || 0} min</span></div><h2>{workout.title || 'Untitled workout'}</h2><p>{workout.description || 'A focused session for building consistency.'}</p><div className="workout-footer"><span className={`difficulty difficulty-${workout.difficulty || 'beginner'}`}>{workout.difficulty || 'beginner'}</span><button type="button" aria-label={`Start ${workout.title || 'workout'}`}>Start <span>→</span></button></div></article>)}{workouts.length === 0 && <p className="empty-state">No workouts have been added yet.</p>}</div>}
    </section>
  )
}

export default Workouts
