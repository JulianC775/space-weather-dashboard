const BASE_URL = 'https://api.nasa.gov/DONKI'
const API_KEY = import.meta.env.VITE_NASA_API_KEY ?? 'DEMO_KEY'

async function donkiFetch(endpoint, startDate, endDate) {
  const params = new URLSearchParams({ startDate, endDate, api_key: API_KEY })
  const res = await fetch(`${BASE_URL}/${endpoint}?${params}`)
  if (!res.ok) throw new Error(`DONKI ${endpoint} error: ${res.status}`)
  return res.json()
}

export const fetchGeomagneticStorms = (start, end) => donkiFetch('GST', start, end)
export const fetchSolarFlares      = (start, end) => donkiFetch('FLR', start, end)
export const fetchCMEs             = (start, end) => donkiFetch('CME', start, end)
