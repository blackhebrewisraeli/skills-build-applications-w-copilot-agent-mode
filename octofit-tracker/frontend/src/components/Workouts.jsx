import { useEffect, useState } from 'react'
import { normalizeItems, ResourceStatus } from '../api.js'

function Workouts() {
  const [state, setState] = useState({ items: [], loading: true, error: '' })
  useEffect(() => {
    fetch(import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts` : 'http://localhost:8000/api/workouts')
      .then((response) => { if (!response.ok) throw new Error(`Request failed (${response.status})`); return response.json() })
      .then((payload) => setState({ items: normalizeItems(payload), loading: false, error: '' }))
      .catch((error) => setState({ items: [], loading: false, error: error.message }))
  }, [])
  const { items, loading, error } = state
  return <section className="view"><div className="section-heading"><span className="eyebrow">YOUR NEXT SESSION</span><h2>Workouts</h2><p>Focused sessions designed to make showing up easier.</p></div><ResourceStatus loading={loading} error={error} /><div className="record-grid">{items.map((workout, index) => <article className="record workout-record" key={workout._id || workout.id || index}><div className="record-top"><span className="tag">{workout.category || 'Training'}</span><span>{workout.difficulty || 'All levels'}</span></div><h3>{workout.name || 'Untitled workout'}</h3><p>{workout.description || workout.focus || 'A balanced session for today.'}</p><div className="record-meta"><b>{workout.durationMinutes ?? 0} min</b><span>+{workout.pointsAwarded ?? 0} pts</span></div></article>)}</div>{!loading && !error && !items.length && <p className="state-message">No workouts yet.</p>}</section>
}

export default Workouts
