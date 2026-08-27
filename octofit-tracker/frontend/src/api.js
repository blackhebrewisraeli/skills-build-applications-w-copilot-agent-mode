import { createElement, useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function normalizeItems(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []
  if (Array.isArray(payload.items)) return payload.items
  if (Array.isArray(payload.data)) return payload.data
  if (Array.isArray(payload.results)) return payload.results
  if (payload.data && typeof payload.data === 'object') return normalizeItems(payload.data)
  return []
}

export function useResource(component) {
  const [state, setState] = useState({ items: [], loading: true, error: '' })

  useEffect(() => {
    let active = true
    fetch(`${API_BASE_URL}/api/${component}/`)
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        return response.json()
      })
      .then((payload) => active && setState({ items: normalizeItems(payload), loading: false, error: '' }))
      .catch((error) => active && setState({ items: [], loading: false, error: error.message }))
    return () => { active = false }
  }, [component])

  return state
}

export function ResourceStatus({ loading, error }) {
  if (loading) return createElement('p', { className: 'state-message' }, 'Loading records...')
  if (error) return createElement('p', { className: 'state-message state-error' }, `${error}. Check the API and VITE_CODESPACE_NAME.`)
  return null
}
