const home = document.getElementById("home");
const clockScreen = document.getElementById("clockScreen");

const startBtn = document.getElementById("startBtn");
const backBtn = document.getElementById("backBtn");

const ampmToggle = document.getElementById("ampmToggle");
const storageToggle = document.getElementById("storageToggle");

const dateElement = document.getElementById("date");
const timeElement = document.getElementById("time");

const languageBtn = document.getElementById("languageBtn");
const languageMenu = document.getElementById("languageMenu");

let useAMPM = false;
let useStorage = false;

function setToggle(button, state) {
  button.textContent = state ? "Bật" : "Tắt";
  button.classList.toggle("on", state);
  button.classList.toggle("off", !state);
}

ampmToggle.addEventListener("click", () => {
  useAMPM = !useAMPM;
  setToggle(ampmToggle, useAMPM);

  if (useStorage) {
    localStorage.setItem("ampm", useAMPM);
  }
});

storageToggle.addEventListener("click", () => {
  useStorage = !useStorage;
  setToggle(storageToggle, useStorage);

  if (useStorage) {
    localStorage.setItem("localStorageEnabled", "true");
    localStorage.setItem("ampm", useAMPM);
  } else {
    localStorage.removeItem("localStorageEnabled");
    localStorage.removeItem("ampm");
  }
});

function updateClock() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  dateElement.textContent = `${day}/${month}/${year}`;

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  if (useAMPM) {
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    timeElement.textContent =
      `${String(hours).padStart(2, "0")}:${minutes}:${seconds} ${period}`;
  } else {
    timeElement.textContent =
      `${String(hours).padStart(2, "0")}:${minutes}:${seconds}`;
  }
}

async function startClock() {
  home.classList.add("hidden");
  clockScreen.classList.remove("hidden");

  try {
    if (document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen();
    }
  } catch (error) {
    console.log("Fullscreen không được hỗ trợ.");
  }

  try {
    if (screen.orientation && screen.orientation.lock) {
      await screen.orientation.lock("landscape");
    }
  } catch (error) {
    console.log("Thiết bị không cho khóa màn hình ngang.");
  }

  updateClock();
}

async function goBack() {
  clockScreen.classList.add("hidden");
  home.classList.remove("hidden");

  if (document.fullscreenElement) {
    try {
      await document.exitFullscreen();
    } catch (error) {}
  }

  try {
    if (screen.orientation && screen.orientation.unlock) {
      screen.orientation.unlock();
    }
  } catch (error) {}
}

startBtn.addEventListener("click", startClock);
backBtn.addEventListener("click", goBack);

languageBtn.addEventListener("click", () => {
  languageMenu.classList.toggle("hidden");
});

// Khôi phục LocalStorage nếu trước đó đã bật
if (localStorage.getItem("localStorageEnabled") === "true") {
  useStorage = true;
  useAMPM = localStorage.getItem("ampm") === "true";

  setToggle(storageToggle, true);
  setToggle(ampmToggle, useAMPM);
}

setInterval(updateClock, 1000);
updateClock();
