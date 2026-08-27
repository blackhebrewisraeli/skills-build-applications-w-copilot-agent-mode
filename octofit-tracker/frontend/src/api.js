import { createElement } from 'react'

export function normalizeItems(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []
  if (Array.isArray(payload.items)) return payload.items
  if (Array.isArray(payload.data)) return payload.data
  if (Array.isArray(payload.results)) return payload.results
  if (payload.data && typeof payload.data === 'object') return normalizeItems(payload.data)
  return []
}

export function ResourceStatus({ loading, error }) {
  if (loading) return createElement('p', { className: 'state-message' }, 'Loading records...')
  if (error) return createElement('p', { className: 'state-message state-error' }, `${error}. Check the API and VITE_CODESPACE_NAME.`)
  return null
}
