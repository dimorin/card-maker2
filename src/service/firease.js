import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,  
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);

//참고
//https://blog.logrocket.com/user-authentication-firebase-react-apps/