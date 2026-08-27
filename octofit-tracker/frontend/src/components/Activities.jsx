import { ResourceStatus, useResource } from '../api.js'

function Activities() {
  const { items, loading, error } = useResource('activities')
  return <section className="view"><div className="section-heading"><span className="eyebrow">RECENT MOVEMENT</span><h2>Activities</h2><p>A living log of the work the community is putting in.</p></div><ResourceStatus loading={loading} error={error} /><div className="record-grid">{items.map((activity, index) => <article className="record" key={activity._id || activity.id || index}><div className="record-top"><span className="tag">{activity.intensity || 'Activity'}</span><time>{activity.loggedAt ? new Date(activity.loggedAt).toLocaleDateString() : 'Recently'}</time></div><h3>{activity.type || 'Workout session'}</h3><p>{activity.userId?.name || activity.userId || 'Athlete'} · {activity.teamId?.name || activity.teamId || 'Independent'}</p><b>{activity.durationMinutes ?? 0} min <small>{activity.caloriesBurned ? ` / ${activity.caloriesBurned} kcal` : ''}</small></b></article>)}</div>{!loading && !error && !items.length && <p className="state-message">No activities yet.</p>}</section>
}

export default Activities
