import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// tailwind
import 'tailwindcss/tailwind.css'

// Firebase
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
}
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const auth = firebase.auth()
if (location.hostname === 'localhost') {
  db.useEmulator('localhost', 8888)
  auth.useEmulator('http://localhost:9099')
}

// vue app
const app = createApp(App)

// global registrations
app.use(store)
app.use(router)

// app mount
app.mount('#app')
