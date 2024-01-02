import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// gd db
// const firebaseConfig = {
//   apiKey: "AIzaSyCUYGT9X4QNU860AqiTmke923lZj2EDltI",
//   authDomain: "speedparking-proj.firebaseapp.com",
//   projectId: "speedparking-proj",
//   storageBucket: "speedparking-proj.appspot.com",
//   messagingSenderId: "104625690574",
//   appId: "1:104625690574:web:4cb5ea3b46b7a504bafd9f",
//   measurementId: "G-YD2VPL7NRY",
// };

const firebaseConfig = {
  apiKey: "AIzaSyADiIYFRBnIshADFDpCBQavsa2dA7GMUag",
  authDomain: "eclinic-proj.firebaseapp.com",
  projectId: "eclinic-proj",
  storageBucket: "eclinic-proj.appspot.com",
  messagingSenderId: "305389816992",
  appId: "1:305389816992:web:550dbcc0a91f9e01b74dc5",
  measurementId: "G-Z22E71JTDP",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const forget_password = async (e) => {
  const email = document.getElementById("forget_password_email").value;
  e.preventDefault();

  sendPasswordResetEmail(auth, email)
    .then((data) => {
      console.log(data);
      alert("Check your email to reset the password!");
      window.location.href = "/home.html";
      // wrapper.classList.toggle("active-popup");
    })
    .catch((err) => {
      alert("Something went wrong: " + err.code);
    });
};

document
  .getElementById("forget_password_submit")
  .addEventListener("click", function (event) {
    forget_password(event);
  });
