import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage"
import {apiKey,authDomain,projectId,storageBucket,messagingSenderId,appId} from "./credentials"

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId
  };

const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)