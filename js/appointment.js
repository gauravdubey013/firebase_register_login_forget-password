import { auth, db } from "./firebseConfig.mjs";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  ref,
  set,
  get,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

let appoint_time;
// console.log(db);
const slotTimings = [
  "7:00 PM",
  "7:15 PM",
  "7:30 PM",
  "7:45 PM",
  "8:00 PM",
  "8:15 PM",
  "8:30 PM",
  "8:45 PM",
  "9:00 PM",
  "9:15 PM",
  "9:30 PM",
  "9:45 PM",
  "10:00 PM",
  "10:15 PM",
  "10:30 PM",
  "10:45 PM",
];

function filterAvailableTimeSlots(selectedDate) {
  const currentDate = new Date();
  const availableSlots =
    currentDate.getDate() === selectedDate.getDate()
      ? slotTimings.filter((slot) => {
          const [slotHour, slotMinute] = slot.split(":").map(Number);
          return (
            currentDate.getHours() < slotHour ||
            (currentDate.getHours() === slotHour &&
              currentDate.getMinutes() < slotMinute)
          );
        })
      : slotTimings;
  return availableSlots;
}

async function updateAvailableTimeSlots(selectedDate) {
  const availableSlots = filterAvailableTimeSlots(selectedDate);
  const appointmentSlotsDiv = document.getElementById("appointmentSlots");
  appointmentSlotsDiv.innerHTML = "";

  try {
    const appointmentRef = ref(db, "/appointments");
    const snapshot = await get(appointmentRef);

    if (snapshot.exists()) {
      const appointments = snapshot.val();

      availableSlots.forEach((slot) => {
        let isAvailable = true;
        for (const key in appointments) {
          if (
            appointments[key].appoint_date ===
              selectedDate.toISOString().split("T")[0] &&
            appointments[key].appoint_time === slot
          ) {
            isAvailable = false;
            break;
          }
        }
        if (isAvailable) {
          const slotDiv = document.createElement("div");
          slotDiv.textContent = slot;
          slotDiv.className = "slot";
          slotDiv.dataset.time = slot;
          slotDiv.addEventListener("click", function () {
            const selectedSlot = this.dataset.time;
            appoint_time = selectedSlot;
            // console.log(appoint_time);
            const allSlots = document.querySelectorAll(".slot");
            allSlots.forEach((slot) => slot.classList.remove("chosen"));
            this.classList.add("chosen");
          });
          appointmentSlotsDiv.appendChild(slotDiv);
        }
      });
    } else {
      // If there are no existing appointments, display all available slots
      availableSlots.forEach((slot) => {
        const slotDiv = document.createElement("div");
        slotDiv.textContent = slot;
        slotDiv.className = "slot";
        slotDiv.dataset.time = slot;
        slotDiv.addEventListener("click", function () {
          const selectedSlot = this.dataset.time;
          appoint_time = selectedSlot;
          console.log(appoint_time);
          const allSlots = document.querySelectorAll(".slot");
          allSlots.forEach((slot) => slot.classList.remove("chosen"));
          this.classList.add("chosen");
        });
        appointmentSlotsDiv.appendChild(slotDiv);
      });
    }
  } catch (error) {
    console.log("Error fetching appointments:", error);
  }
}

document.getElementById("appoint_date").addEventListener("change", function () {
  const selectedDate = new Date(this.value);
  updateAvailableTimeSlots(selectedDate);
});

// Appointment slot logic here
async function appointment(event) {
  event.preventDefault();
  const patient_name = document.getElementById("patient_name").value;
  const appoint_date = document.getElementById("appoint_date").value;
  const phone = document.getElementById("phone").value;
  const currentDate = new Date();
  const selectedDate = new Date(appoint_date);

  if (selectedDate < currentDate) {
    alert("Please select a future date for the appointment.");
    return;
  }

  try {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const authUid = user?.uid;
        const email = user?.email;
        // const phone = user?.phone;
        const appointmentRef = ref(db, `/appointments`);
        const snapshot = await get(appointmentRef);

        if (snapshot.exists()) {
          const appointments = snapshot.val();

          for (const key in appointments) {
            if (
              appointments[key].appoint_date === appoint_date &&
              appointments[key].appoint_time === appoint_time
            ) {
              alert(
                "The appointment date and time have already been scheduled for another user. Kindly select an alternative date or time."
              );
              return;
            }
          }
        }
        await set(ref(db, `/appointments/${authUid}`), {
          email,
          patient_name,
          phone,
          appoint_date,
          appoint_time,
        });
        alert(
          "Appointment Successful!: \n" +
            "Email : " +
            email +
            "\nPatent Name : " +
            patient_name +
            "\nPhone : " +
            phone +
            "\nDate : " +
            appoint_date +
            "\nTime : " +
            appoint_time
        );
        return (window.location.href = "./home.html");
      } else {
        alert("Login first!");
        return (window.location.href = "./home.html");
      }
    });
  } catch (error) {
    console.log("User is logged out");
    alert(error.code);
  }
}

document
  .getElementById("appoint_submit")
  .addEventListener("click", function (event) {
    appointment(event);
  });
