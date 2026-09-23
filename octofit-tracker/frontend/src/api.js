const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

async function getData(endpoint) {
  const response = await fetch(`${apiBaseUrl}${endpoint}`)
  if (!response.ok) {
    throw new Error(`Unable to load ${endpoint}`)
  }

  return response.json()
}

export const getUsers = () => getData('/api/users')
export const getActivities = () => getData('/api/activities')
export const getTeams = () => getData('/api/teams')
export const getLeaderboard = () => getData('/api/leaderboard')
export const getWorkouts = () => getData('/api/workouts')

export const getCollection = async (component) => {
  const response = await fetch(`${apiBaseUrl}/api/${component}`)
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


