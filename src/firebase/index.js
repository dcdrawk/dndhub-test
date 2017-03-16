import Vue from 'vue'
import Firebase from 'firebase'

export default class FirebaseSetup {
  static firebaseConfig = {
    apiKey: 'AIzaSyDqHKWWOtFJx2flGqp04NwLTVUpMJFD_KQ',
    authDomain: 'dndhub-7c47f.firebaseapp.com',
    databaseURL: 'https://dndhub-7c47f.firebaseio.com',
    storageBucket: 'dndhub-7c47f.appspot.com',
    messagingSenderId: '134165505386'
  }

  // static firebaseApp = Firebase.initializeApp(this.firebaseConfig)
  // static db = this.firebaseApp.database()

  static init () {
    const firebaseApp = Firebase.initializeApp(this.firebaseConfig)
    // const db = firebaseApp.database()
    console.log('init')
    Object.defineProperty(Vue.prototype, '$firebase', {
      get () {
        return firebaseApp
      }
    })

    // Object.defineProperty(Vue.prototype, '$db', {
    //   get () {
    //     return db
    //   }
    // })
  }
}
