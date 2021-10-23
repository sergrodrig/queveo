export const getPhotoUrl = (id, size = 'original') => {
  if (!id) return null
  return `https://image.tmdb.org/t/p/${size}/${id}`
}
