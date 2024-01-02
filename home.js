const wrapper = document.querySelector(".wrapper");
const LoginLink = document.querySelector(".login-link");
const RegisterLink = document.querySelector(".register-link");
const btnPopup = document.querySelector(".btnLogin-popup");
const iconClose = document.querySelector(".icon-close");

btnPopup.addEventListener("click", () => {
  wrapper.classList.add("active-popup");
});

iconClose.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
});

RegisterLink.addEventListener("click", () => {
  wrapper.classList.add("active");
});

LoginLink.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

// $(function () {
//   $("#datepicker").datepicker();
// });
