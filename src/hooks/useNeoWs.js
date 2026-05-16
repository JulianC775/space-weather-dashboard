import { useState, useEffect } from 'react'
import { fetchNeoFeed } from '../api/neows'
import { lastNDays } from '../utils/dates'

// Flatten the date-keyed NeoWs response into a sorted array of asteroid objects
function flattenNeos(nearEarthObjects) {
  return Object.values(nearEarthObjects)
    .flat()
    .sort((a, b) => {
      const distA = parseFloat(a.close_approach_data[0]?.miss_distance.kilometers ?? Infinity)
      const distB = parseFloat(b.close_approach_data[0]?.miss_distance.kilometers ?? Infinity)
      return distA - distB
    })
}

export function useNeoWs(startDate, endDate) {
  const [startDate_, endDate_] = startDate && endDate ? [startDate, endDate] : lastNDays(7)

  const [neos, setNeos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchNeoFeed(startDate_, endDate_)
      .then((data) => { if (!cancelled) setNeos(flattenNeos(data)) })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [startDate_, endDate_])

  return { neos, loading, error }
}
