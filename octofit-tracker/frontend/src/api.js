const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const getCollection = async (component) => {
  const response = await fetch(`${apiBaseUrl}/api/${component}/`)
  if (!response.ok) {
    throw new Error(`Unable to load ${component}.`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.data)) return payload.data
  if (Array.isArray(payload.items)) return payload.items
  return []
}

export const displayName = (person) => {
  if (!person) return 'Unassigned'
  if (typeof person === 'string') return person
  return person.name || person.email || 'Unknown athlete'
}

export const formatDate = (value) => {
  if (!value) return 'No date'
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}
