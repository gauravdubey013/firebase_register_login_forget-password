import { db } from "./firebseConfig.mjs";
import {
  get,
  ref,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Fetch users from the database
function fetchUsers() {
  const userTableBody = document.getElementById("userTableBody");

  const usersRef = ref(db, "users");
  get(usersRef)
    .then((snapshot) => {
      snapshot.forEach((userSnapshot) => {
        const userId = userSnapshot.key;
        const userData = userSnapshot.val();

        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${userId}</td>
        <td>${userData.email}</td>
      `;
        userTableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
}

// Fetch appointments from the database
function fetchAppointments() {
  const appointmentTableBody = document.getElementById("appointmentTableBody");

  const appointmentsRef = ref(db, "appointments");
  get(appointmentsRef)
    .then((snapshot) => {
      snapshot.forEach((appointmentSnapshot) => {
        const userId = appointmentSnapshot.key;
        const appointmentData = appointmentSnapshot.val();

        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${userId}</td>
        <td>${appointmentData.patient_name}</td>
        <td>${appointmentData.phone}</td>
        <td>${appointmentData.appoint_date}</td>
        <td>${appointmentData.appoint_time}</td>
      `;
        appointmentTableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching appointments:", error);
    });
}

// Call the functions to fetch and display users and appointments
fetchUsers();
fetchAppointments();
