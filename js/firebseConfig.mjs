import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// firebase
const firebaseConfig = {
  apiKey: "AIzaSyCUYGT9X4QNU860AqiTmke923lZj2EDltI",
  authDomain: "speedparking-proj.firebaseapp.com",
  databaseURL: "https://speedparking-proj-default-rtdb.firebaseio.com",
  projectId: "speedparking-proj",
  storageBucket: "speedparking-proj.appspot.com",
  messagingSenderId: "104625690574",
  appId: "1:104625690574:web:4cb5ea3b46b7a504bafd9f",
  measurementId: "G-YD2VPL7NRY",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyADiIYFRBnIshADFDpCBQavsa2dA7GMUag",
//   authDomain: "eclinic-proj.firebaseapp.com",
//   projectId: "eclinic-proj",
//   storageBucket: "eclinic-proj.appspot.com",
//   messagingSenderId: "305389816992",
//   appId: "1:305389816992:web:550dbcc0a91f9e01b74dc5",
//   measurementId: "G-Z22E71JTDP",
// };

// Initialized Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
