// Returns 'YYYY-MM-DD' string for a given Date object
export function toApiDate(date) {
  return date.toISOString().slice(0, 10)
}

// Returns [startDate, endDate] strings for the last N days (max 7 for NeoWs)
export function lastNDays(n = 7) {
  const end = new Date()
  const start = new Date()
  start.setDate(end.getDate() - (n - 1))
  return [toApiDate(start), toApiDate(end)]
}

// Split an arbitrary date range into 7-day chunks (NeoWs API limit)
export function splitInto7DayChunks(startDate, endDate) {
  const chunks = []
  const cursor = new Date(startDate)
  const end = new Date(endDate)
  while (cursor <= end) {
    const chunkEnd = new Date(cursor)
    chunkEnd.setDate(chunkEnd.getDate() + 6)
    chunks.push([toApiDate(cursor), toApiDate(chunkEnd > end ? end : chunkEnd)])
    cursor.setDate(cursor.getDate() + 7)
  }
  return chunks
}
