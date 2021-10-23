export default {
  setItem (state, { resource, item }) {
    upsert(state[resource], docToResource(item))
  },
  removeItem (state, { resource, item }) {
    const index = state[resource].findIndex(r => r.id === item)
    if (index !== -1) {
      const collectionState = state[resource]
      collectionState.splice(index, 1)
    }
  }
}

export const findById = (resources, id) => {
  if (!resources) return null
  return resources.find(r => r.id === id)
}

export const upsert = (resources, resource) => {
  const index = resources.findIndex(p => p.id === resource.id)
  if (resource.id && index !== -1) resources[index] = resource
  else resources.push(resource)
}

export const docToResource = (doc) => {
  if (typeof doc?.data !== 'function') return doc
  return { ...doc.data(), id: doc.id }
}
