import * as functions from 'firebase-functions'
// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from 'firebase-admin'
import app from './app'
admin.initializeApp(functions.config().firebase)
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

export const ir=functions.https.onRequest(app)


