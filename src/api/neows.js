const BASE_URL = 'https://api.nasa.gov/neo/rest/v1'
const API_KEY = import.meta.env.VITE_NASA_API_KEY ?? 'DEMO_KEY'

// NeoWs caps date ranges at 7 days per request
export async function fetchNeoFeed(startDate, endDate) {
  const params = new URLSearchParams({ start_date: startDate, end_date: endDate, api_key: API_KEY })
  const res = await fetch(`${BASE_URL}/feed?${params}`)
  if (!res.ok) throw new Error(`NeoWs error: ${res.status}`)
  const data = await res.json()
  return data.near_earth_objects // object keyed by date string
}

export async function fetchNeoById(id) {
  const params = new URLSearchParams({ api_key: API_KEY })
  const res = await fetch(`${BASE_URL}/neo/${id}?${params}`)
  if (!res.ok) throw new Error(`NeoWs error: ${res.status}`)
  return res.json()
}
