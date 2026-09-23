const codespaceName = typeof import.meta.env.VITE_CODESPACE_NAME === 'string'
  ? import.meta.env.VITE_CODESPACE_NAME.trim()
  : ''

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

const apiUrl = (component) => `${apiBaseUrl}/api/${component}/`

const collectionFrom = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  return []
}

export const getCollection = async (component) => {
  const response = await fetch(apiUrl(component))
  if (!response.ok) {
    throw new Error(`Unable to load ${component}.`)
  }

  return collectionFrom(await response.json())
}

export const getUsers = () => getCollection('users')
export const getActivities = () => getCollection('activities')
export const getTeams = () => getCollection('teams')
export const getLeaderboard = () => getCollection('leaderboard')
export const getWorkouts = () => getCollection('workouts')

export const displayName = (person) => {
  if (!person) return 'Unassigned'
  if (typeof person === 'string') return person
  return person.name || person.email || 'Unknown athlete'
}

export const formatDate = (value) => {
  if (!value) return 'No date'
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}


