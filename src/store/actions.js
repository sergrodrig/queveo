// import firebase from 'firebase/app'
// import 'firebase/firestore'
import axios from 'axios'

export default {
  async fetchMovieById ({ commit }, movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.VUE_APP_THEMOVIEDB_APIKEY}`
    const response = await axios.get(url).then((response) => response.data)
    commit('setItem', { resource: 'movies', item: response })
    return response
  },

  async fetchMovieCast ({ commit }, movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.VUE_APP_THEMOVIEDB_APIKEY}&language=en-US`
    const response = await axios.get(url).then((response) => response.data)
    return response
  },

  async searchMovie (context, query) {
    console.log(`buscando pelicula: ${query}`)
    // const url = `https://api.themoviedb.org/3/search/movie?api_key=cc5b7ea797f3c034bdc62563ed54ed73&query=${query}&language=en-US&page=1&include_adult=false`
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.VUE_APP_THEMOVIEDB_APIKEY}&page=1`
    const response = await axios.get(url).then((response) => response.data)
    return response
  }

  // fetchAllShows: ({ dispatch }) => { dispatch('fetchAllItemsFromCollection', 'shows') },
  // fetchAllMovies: ({ dispatch }) => { dispatch('fetchAllItemsFromCollection', 'movies') },
  // fetchAllActors: ({ dispatch }) => { dispatch('fetchAllItemsFromCollection', 'actors') },
  // fetchAllItemsFromCollection: ({ commit }, collection) => {
  //   return new Promise(resolve => {
  //     const colRef = firebase.firestore().collection(collection)
  //     colRef.get().then(querySnapshot => {
  //       querySnapshot.forEach((doc) => {
  //         commit('setItem', { resource: collection, item: doc.data() })
  //       })
  //     })
  //   })
  // },

  // fetchShow: ({ dispatch }, id) => { dispatch('fetchDocumentFromCollection', { collection: 'show', id }) },
  // fetchMovie: ({ dispatch }, id) => { dispatch('fetchDocumentFromCollection', { collection: 'movie', id }) },
  // fetchActor: ({ dispatch }, id) => { dispatch('fetchDocumentFromCollection', { collection: 'actor', id }) },
  // fetchDocumentFromCollection: ({ commit }, { collection, id }) => {
  //   return new Promise((resolve) => {
  //     const docRef = firebase.firestore().collection(collection).doc(id)
  //     docRef.get().then(doc => {
  //       if (doc.exists) {
  //         commit('setItem', { resource: collection, item: doc })
  //         resolve(doc)
  //       } else resolve(null)
  //     })
  //   })
  // },

  // fetchCursosEstablecimiento: ({ dispatch }, establecimientoId) => dispatch('fetchDocumentsFromCollectionWithQuery', { collection: 'cursos', query: { field: 'establecimiento', operator: '==', value: establecimientoId } }),
  // fetchAlumnosCurso: ({ dispatch }, cursoId) => dispatch('fetchDocumentsFromCollectionWithQuery', { collection: 'alumnos', query: { field: 'curso', operator: '==', value: cursoId } }),
  // fetchDocumentsFromCollectionWithQuery: ({ commit }, { collection, query }) => {
  //   return new Promise((resolve) => {
  //     const colRef = firebase.firestore().collection(collection)
  //     colRef.where(query.field, query.operator, query.value).get().then(querySnapshot => {
  //       querySnapshot.forEach((doc) => {
  //         commit('setItem', { resource: collection, item: doc.data() })
  //       })
  //     })
  //   })
  // },

  // Create document in Firestore collection
  // createCurso: ({ dispatch }, document) => { dispatch('createDocumentInFirebaseCollection', { collection: 'cursos', document }) },
  // createDocumentInFirebaseCollection: ({ commit }, { collection, document }) => {
  //   // console.log(`action => createDocumentInFirebaseCollection ${collection}`)
  //   const docRef = firebase.firestore().collection(collection).doc()
  //   const { id } = docRef
  //   const publishedAt = firebase.firestore.FieldValue.serverTimestamp()
  //   const extendedDocument = { ...document, publishedAt, id }
  //   docRef.set(extendedDocument)
  //   const newDoc = docRef.get()
  //   commit('setItem', { resource: collection, item: newDoc })
  // }
}
