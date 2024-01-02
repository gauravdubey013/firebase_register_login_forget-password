import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getDatabase,
  ref,
  set,
  //   get,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

//   gd - firebase
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Registration logic here
async function register(event) {
  const fullname = document.getElementById("fullname").value;
  const dob = document.getElementById("dob").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  event.preventDefault();

  try {
    const authData = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await set(ref(db, `users/${authData.user.uid}`), {
      fullname,
      dob,
      phone,
      email,
      password,
    });

    wrapper.classList.toggle("active");
    alert("Registration Successful!");
  } catch (error) {
    console.error("Error during registration:", error.message);
    alert(error.code);
  }
}

// login logic here
function login_with_email_link(event) {
  event.preventDefault();
  const login_email = document.getElementById("login_email1").value;

  // Send the sign-in link to the provided email
  sendSignInLinkToEmail(auth, login_email, {
    url: "http://localhost:5500/home.html#",
    handleCodeInApp: true,
  })
    .then(() => {
      // Store the email in local storage for later use
      localStorage.setItem("login_email", login_email);
      alert("Check your email for the sign-in link!");
    })
    .catch((err) => {
      // Handle errors during sending the sign-in link
      console.error("Error sending sign-in link:", err.message);
      alert("Error sending sign-in link: " + err.message);
    });
}

// forget-password logic
function login_with_password(event) {
  const email = document.getElementById("login_email2").value;
  const password = document.getElementById("login_password").value;
  event.preventDefault();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Logged in user: ", user);
      window.location.href = "/home.html";
      alert("Login Successful! \nWelcome " + email + " !!");
    })
    .catch((error) => {
      alert("Login error: ", error.message);
    });
}

document
  .getElementById("register_submit")
  .addEventListener("click", function (event) {
    register(event);
  });

document
  .getElementById("login_with_email_link_submit")
  .addEventListener("click", function (event) {
    login_with_email_link(event);
  });
document
  .getElementById("login_with_password_submit")
  .addEventListener("click", function (event) {
    login_with_password(event);
  });

// Check if the current URL has the email link
if (isSignInWithEmailLink(auth, window.location.href)) {
  // Get the email from local storage
  const email = localStorage.getItem("login_email");

  // Check if the email is available
  if (!email) {
    alert("Please provide your email");
  } else {
    // Sign in with the email link
    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        // Clear local storage
        localStorage.removeItem("login_email");

        // Log the user and redirect to home.html
        console.log("Logged in user: ", result.user);
        alert("Login Successful!\nWelcome " + result.user.firstname + "!!");
        window.location.href = "/home.html";
      })
      .catch((error) => {
        // Handle errors during sign-in with email link
        console.error("Error during sign-in:", error.message);
        alert("Login error: " + error.message);
      });
  }
}
