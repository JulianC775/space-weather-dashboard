import { useState, useEffect } from 'react'
import { fetchGeomagneticStorms, fetchSolarFlares, fetchCMEs } from '../api/donki'
import { lastNDays } from '../utils/dates'

export function useDonki(startDate, endDate) {
  const [start, end] = startDate && endDate ? [startDate, endDate] : lastNDays(30)

  const [events, setEvents] = useState({ gst: [], flr: [], cme: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    Promise.all([
      fetchGeomagneticStorms(start, end),
      fetchSolarFlares(start, end),
      fetchCMEs(start, end),
    ])
      .then(([gst, flr, cme]) => {
        if (!cancelled) setEvents({ gst: gst ?? [], flr: flr ?? [], cme: cme ?? [] })
      })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [start, end])

  return { events, loading, error }
}
