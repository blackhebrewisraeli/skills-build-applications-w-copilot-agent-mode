import { ResourceStatus, useResource } from '../api.js'

function Teams() {
  const { items, loading, error } = useResource('teams')
  return <section className="view"><div className="section-heading"><span className="eyebrow">THE COLLECTIVE</span><h2>Teams</h2><p>Find your crew, bring the energy, keep each other moving.</p></div><ResourceStatus loading={loading} error={error} /><div className="record-grid">{items.map((team, index) => <article className="record team-record" key={team._id || team.id || index}><span className="team-mark" style={{ backgroundColor: team.color || '#f05a3c' }} /><h3>{team.name || 'Unnamed team'}</h3><p>{team.motto || 'Make every session count.'}</p><div className="record-meta"><b>{team.points ?? 0} pts</b><span>{team.memberCount ?? 0} members</span></div></article>)}</div>{!loading && !error && !items.length && <p className="state-message">No teams yet.</p>}</section>
}

export default Teams
