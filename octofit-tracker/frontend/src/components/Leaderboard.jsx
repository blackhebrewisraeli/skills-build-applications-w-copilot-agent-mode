import { useEffect, useState } from 'react'
import { normalizeItems, ResourceStatus } from '../api.js'

function Leaderboard() {
  const [state, setState] = useState({ items: [], loading: true, error: '' })
  useEffect(() => {
    fetch(import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard` : 'http://localhost:8000/api/leaderboard')
      .then((response) => { if (!response.ok) throw new Error(`Request failed (${response.status})`); return response.json() })
      .then((payload) => setState({ items: normalizeItems(payload), loading: false, error: '' }))
      .catch((error) => setState({ items: [], loading: false, error: error.message }))
  }, [])
  const { items, loading, error } = state
  return <section className="view"><div className="section-heading"><span className="eyebrow">COMPETITION</span><h2>Leaderboard</h2><p>Small wins add up. See who is setting the pace.</p></div><ResourceStatus loading={loading} error={error} /><div className="record-grid leaderboard-grid">{items.map((entry, index) => <article className="record rank-record" key={entry._id || entry.id || index}><strong>#{entry.rank ?? index + 1}</strong><div><h3>{entry.userId?.name || entry.userId || 'Athlete'}</h3><p>{entry.teamId?.name || entry.teamId || 'Independent'}</p></div><b>{entry.points ?? 0}<small> pts</small></b></article>)}</div>{!loading && !error && !items.length && <p className="state-message">No rankings yet.</p>}</section>
}

export default Leaderboard
