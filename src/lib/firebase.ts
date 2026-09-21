import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore, getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import config from '../../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

let firestoreDb: ReturnType<typeof getFirestore>;
try {
  if (typeof window !== 'undefined') {
    firestoreDb = initializeFirestore(app, {
      experimentalForceLongPolling: true,
    }, config.firestoreDatabaseId || '(default)');
  } else {
    firestoreDb = getFirestore(app, config.firestoreDatabaseId || '(default)');
  }
} catch {
  firestoreDb = getFirestore(app, config.firestoreDatabaseId || '(default)');
}

export const db = firestoreDb;
export const auth = getAuth(app);

export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    // Retry once if connection was still negotiating
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      await getDocFromServer(doc(db, 'test', 'connection'));
      return true;
    } catch (retryError) {
      if (retryError instanceof Error && retryError.message.includes('the client is offline')) {
        console.error('Please check your Firebase configuration.');
      }
      return false;
    }
  }
}

testConnection();

export default app;
