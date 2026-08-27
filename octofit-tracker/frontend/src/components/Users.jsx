import { ResourceStatus, useResource } from '../api.js'

function Users() {
  const { items, loading, error } = useResource('users')
  return <section className="view"><div className="section-heading"><span className="eyebrow">COMMUNITY</span><h2>Users</h2><p>Meet the people turning consistency into momentum.</p></div><ResourceStatus loading={loading} error={error} /><div className="record-grid">{items.map((user, index) => <article className="record" key={user._id || user.id || index}><div className="avatar">{(user.name || '?').slice(0, 1).toUpperCase()}</div><h3>{user.name || 'Unnamed athlete'}</h3><p>{user.email || user.gradeLevel || 'OctoFit member'}</p><div className="record-meta"><b>{user.points ?? 0} pts</b><span>{user.streakDays ?? 0} day streak</span></div></article>)}</div>{!loading && !error && !items.length && <p className="state-message">No users yet.</p>}</section>
}

export default Users
