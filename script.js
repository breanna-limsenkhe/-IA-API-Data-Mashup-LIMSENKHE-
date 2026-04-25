const form = document.getElementById('registrationForm');
const message = document.getElementById('message');
const countDisplay = document.getElementById('count');

// ---------------- FORM SUBMIT ----------------
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const event = document.getElementById('event').value;

  const newAttendee = { name, email, event };
  attendees.push(newAttendee);

  message.textContent = "Registration successful!";
  message.className = "success";

  form.reset();
  updateDashboard();
});

// ---------------- DASHBOARD ----------------
async function updateDashboard() {
  try {
    const workshopCount = attendees.filter(a => a.event === "Workshop").length;
    const seminarCount = attendees.filter(a => a.event === "Seminar").length;
    const conferenceCount = attendees.filter(a => a.event === "Conference").length;

    countDisplay.innerHTML = `
      <h3>📊 Event Dashboard</h3>

      <p><strong>Workshop:</strong> ${workshopCount} / 30</p>
      <p><strong>Seminar:</strong> ${seminarCount} / 30</p>
      <p><strong>Conference:</strong> ${conferenceCount} / 30</p>
    `;

    const button = document.querySelector('button');
    button.disabled = workshopCount >= 30;
    button.textContent = workshopCount >= 30 ? "Workshop Full" : "Register";

  } catch (error) {
    console.log(error);
    countDisplay.textContent = "Error loading dashboard";
  }
}

let attendees = JSON.parse(localStorage.getItem("attendees")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newAttendee = {
    name: name.value,
    email: email.value,
    event: event.value
  };

  attendees.push(newAttendee);

  localStorage.setItem("attendees", JSON.stringify(attendees));

  updateDashboard();
});

updateDashboard();


