// api/_firebaseAdmin.js
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const {
  FIREBASE_ADMIN_PROJECT_ID,
  FIREBASE_ADMIN_CLIENT_EMAIL,
  FIREBASE_ADMIN_PRIVATE_KEY,
} = process.env;

const app = getApps().length === 0
  ? initializeApp({
      credential: cert({
        projectId: FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
      storageBucket: `${FIREBASE_ADMIN_PROJECT_ID}.appspot.com`,
    })
  : getApps()[0];

const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
// This module initializes Firebase Admin SDK with Firestore and Storage.
// It uses environment variables for configuration and exports the initialized app, Firestore, and Storage instances