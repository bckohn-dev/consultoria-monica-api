import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const {
  FIREBASE_ADMIN_PROJECT_ID,
  FIREBASE_ADMIN_CLIENT_EMAIL,
  FIREBASE_ADMIN_PRIVATE_KEY,
} = process.env;

let app;
let privateKey = FIREBASE_ADMIN_PRIVATE_KEY;

if (privateKey?.includes('\\n')) {
  privateKey = privateKey.replace(/\\n/g, '\n'); // Corrige o formato da Vercel
}

if (!getApps().length) {
  console.log("🔐 Inicializando Firebase Admin...");
  console.log('🔐 Key length:', privateKey?.length);
  console.log('🔐 Key preview:', privateKey?.slice(0, 30));

  app = initializeApp({
    credential: cert({
      projectId: FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey,
    }),
    storageBucket: `${FIREBASE_ADMIN_PROJECT_ID}.appspot.com`,
  });
} else {
  app = getApps()[0];
}

const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };

// This module initializes Firebase Admin SDK with Firestore and Storage.
// It uses environment variables for configuration and exports the initialized app, Firestore, and Storage instances
