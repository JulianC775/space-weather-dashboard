const KM_PER_MILE = 1.60934

export const kmToMiles = (km) => km / KM_PER_MILE

// Format asteroid diameter as a human-readable range string
export function formatDiameter(estimatedDiameter) {
  const { min, max } = estimatedDiameter.kilometers
  return `${min.toFixed(2)}–${max.toFixed(2)} km`
}

// Normalize a value into 0–1 range for relative size visuals
export function normalize(value, min, max) {
  if (max === min) return 0
  return (value - min) / (max - min)
}

// Miss distance from the API comes as a string; parse it
export function missDistanceKm(closeApproach) {
  return parseFloat(closeApproach.miss_distance.kilometers)
}

export function relativeVelocityKmh(closeApproach) {
  return parseFloat(closeApproach.relative_velocity.kilometers_per_hour)
}
