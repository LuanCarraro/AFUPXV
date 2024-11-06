import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCm-QMs0rCbr5oTOko070KfVtDoOrtwUrE",
    authDomain: "help-me-otto.firebaseapp.com",
    projectId: "help-me-otto",
    storageBucket: "help-me-otto.appspot.com",
    messagingSenderId: "524516106902",
    appId: "1:524516106902:web:a3fdbdce06aa2ba33458b7",
    measurementId: "G-N3FJFW0239"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
