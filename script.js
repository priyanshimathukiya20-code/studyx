```javascript
const $ = (selector) => document.querySelector(selector);

// ==============================
// DATE HELPERS
// ==============================

const today = new Date();

const dateInputValue = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

$("#welcomeDate").textContent = today.toLocaleDateString("en-IN", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric"
});

$("#todayBtn").addEventListener("click", () => {
  $("#welcomeDate").textContent = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
});

// ==============================
// LOCAL STORAGE HELPERS
// ==============================

function load(key, fallback = []) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Could not save data:", error);
  }
}

// ==============================
// MOBILE MENU
// ==============================

$("#menuBtn").addEventListener("click", () => {
  $("#sidebar").classList.toggle("open");
});

// ==============================
// NAVIGATION
// ==============================

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach((item) => {
      item.classList.remove("active");
    });

    link.classList.add("active");
    $("#sidebar").classList.remove("open");
  });
});

// ==============================
// LOAD SAVED DATA
// ==============================

let tasks = load("studyx-tasks", []);
let assignments = load("studyx-assignments", []);

let exam = load("studyx-exam", {
  name: "",
  date: ""
});

// ==============================
// STUDY PLANNER
// ==============================

function renderTasks() {
  const list = $("#taskList");
  list.replaceChildren();

  if (tasks.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "No