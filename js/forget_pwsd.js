import { auth } from "./firebseConfig.mjs";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
