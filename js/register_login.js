import { auth, db } from "./firebseConfig.mjs";
import {
  ref,
  set,
  get,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  const adminButton = document.getElementById("AdminButton");

  // If the user is logged in
  if (user) {
    // Retrieve user data from the database
    const userRef = ref(db, `users/${user.uid}`);
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          console.log(userData);
          // Check if the user's role is admin
          if (userData.role === "admin") {
            adminButton.style.display = "block";
          }
        }
      })
      .catch((error) => {
        console.error("Error retrieving user data:", error);
      });
  } else {
    adminButton.style.display = "none";
  }
});

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
      role: "user",
    });
    alert(
      "Registration Successful! \nName : " +
        fullname +
        "\nDate-Of-Birth : " +
        dob +
        "Phone no. : " +
        phone +
        "Email : " +
        email +
        "Role : User"
    );
    alert("Check your email to reset the password!");
    RegForm.style.transform = "translateX(400px)";
    LoginForm.style.transform = "translateX(0)";
    ForgotForm.style.transform = "translateX(-400px)";
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
      alert("Check your email for the sign-in link!");
    })
    .catch((err) => {
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
const forget_password = async (e) => {
  const email = document.getElementById("forget_password_email").value;
  e.preventDefault();

  sendPasswordResetEmail(auth, email)
    .then((data) => {
      console.log(data);
      alert("Check your email to reset the password!");
      RegForm.style.transform = "translateX(400px)";
      LoginForm.style.transform = "translateX(0)";
      ForgotForm.style.transform = "translateX(-400px)";
    })
    .catch((err) => {
      alert("Something went wrong: " + err.code);
    });
};

document
  .getElementById("register_submit")
  .addEventListener("click", function (event) {
    register(event);
  });
document
  .getElementById("forget_password_submit")
  .addEventListener("click", function (event) {
    forget_password(event);
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

if (isSignInWithEmailLink(auth, window.location.href)) {
  const email = localStorage.getItem("login_email");

  if (!email) {
    alert("Please provide your email");
  } else {
    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        localStorage.removeItem("login_email");

        console.log("Logged in user: ", result.user);
        alert("Login Successful!\nWelcome " + result.user.firstname + "!!");
        window.location.href = "/home.html";
      })
      .catch((error) => {
        console.error("Error during sign-in:", error.message);
        alert("Login error: " + error.message);
      });
  }
}

const wrapper = document.querySelector(".wrapper");
const LoginLink = document.querySelector(".login-link");
const RegLoginLink = document.querySelector(".reg-to-login-link");
const ForgotPasswordLink = document.querySelector(".forgot-password-link");
const RegisterLink = document.querySelector(".register-link");
const btnPopup = document.querySelector(".btnLogin-popup");
const iconClose = document.querySelector(".icon-close");

const LoginForm = document.getElementById("LoginForm");
const RegForm = document.getElementById("RegForm");
const ForgotForm = document.getElementById("ForgotForm");

btnPopup.addEventListener("click", () => {
  wrapper.classList.toggle("active-popup");
});

iconClose.addEventListener("click", () => {
  wrapper.classList.toggle("active-popup");
});

RegisterLink.addEventListener("click", () => {
  RegForm.style.transform = "translateX(0)";
  LoginForm.style.transform = "translateX(-400px)";
  ForgotForm.style.transform = "translateX(-800px)";
});

LoginLink.addEventListener("click", () => {
  RegForm.style.transform = "translateX(400px)";
  LoginForm.style.transform = "translateX(0)";
  ForgotForm.style.transform = "translateX(-400px)";
});
RegLoginLink.addEventListener("click", () => {
  RegForm.style.transform = "translateX(400px)";
  LoginForm.style.transform = "translateX(0)";
  ForgotForm.style.transform = "translateX(-400px)";
});
ForgotPasswordLink.addEventListener("click", () => {
  RegForm.style.transform = "translateX(800px)";
  LoginForm.style.transform = "translateX(400px)";
  ForgotForm.style.transform = "translateX(0)";
});
