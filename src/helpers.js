// Guarantee the element order of bulk results
export function sortByIdList (entries, ids) {
  // Hash map of the indexes for better time complexity on big arrays
  let indexMap = {}
  ids.map((x, i) => {
    indexMap[x] = i
  })

  // Sort by the indexes
  entries.sort((a, b) => indexMap[a.id] - indexMap[b.id])
  return entries
}
