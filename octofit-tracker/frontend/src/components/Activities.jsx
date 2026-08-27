import { useEffect, useState } from 'react'
import { normalizeItems, ResourceStatus } from '../api.js'

function Activities() {
  const [state, setState] = useState({ items: [], loading: true, error: '' })
  useEffect(() => {
    fetch(import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities` : 'http://localhost:8000/api/activities')
      .then((response) => { if (!response.ok) throw new Error(`Request failed (${response.status})`); return response.json() })
      .then((payload) => setState({ items: normalizeItems(payload), loading: false, error: '' }))
      .catch((error) => setState({ items: [], loading: false, error: error.message }))
  }, [])
  const { items, loading, error } = state
  return <section className="view"><div className="section-heading"><span className="eyebrow">RECENT MOVEMENT</span><h2>Activities</h2><p>A living log of the work the community is putting in.</p></div><ResourceStatus loading={loading} error={error} /><div className="record-grid">{items.map((activity, index) => <article className="record" key={activity._id || activity.id || index}><div className="record-top"><span className="tag">{activity.intensity || 'Activity'}</span><time>{activity.loggedAt ? new Date(activity.loggedAt).toLocaleDateString() : 'Recently'}</time></div><h3>{activity.type || 'Workout session'}</h3><p>{activity.userId?.name || activity.userId || 'Athlete'} · {activity.teamId?.name || activity.teamId || 'Independent'}</p><b>{activity.durationMinutes ?? 0} min <small>{activity.caloriesBurned ? ` / ${activity.caloriesBurned} kcal` : ''}</small></b></article>)}</div>{!loading && !error && !items.length && <p className="state-message">No activities yet.</p>}</section>
}

export default Activities
