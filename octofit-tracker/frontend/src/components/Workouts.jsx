import { ResourceStatus, useResource } from '../api.js'

function Workouts() {
  const { items, loading, error } = useResource('workouts')
  return <section className="view"><div className="section-heading"><span className="eyebrow">YOUR NEXT SESSION</span><h2>Workouts</h2><p>Focused sessions designed to make showing up easier.</p></div><ResourceStatus loading={loading} error={error} /><div className="record-grid">{items.map((workout, index) => <article className="record workout-record" key={workout._id || workout.id || index}><div className="record-top"><span className="tag">{workout.category || 'Training'}</span><span>{workout.difficulty || 'All levels'}</span></div><h3>{workout.name || 'Untitled workout'}</h3><p>{workout.description || workout.focus || 'A balanced session for today.'}</p><div className="record-meta"><b>{workout.durationMinutes ?? 0} min</b><span>+{workout.pointsAwarded ?? 0} pts</span></div></article>)}</div>{!loading && !error && !items.length && <p className="state-message">No workouts yet.</p>}</section>
}

export default Workouts
