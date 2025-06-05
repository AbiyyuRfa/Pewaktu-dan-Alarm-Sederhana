// Timer Variables
let timer;
let totalSeconds;

// Alarm Variables
let alarmTime = null;
let alarmInterval;

// Show Timer / Alarm Section
function showSection(section) {
  document.getElementById('timerSection').style.display = section === 'timer' ? 'block' : 'none';
  document.getElementById('alarmSection').style.display = section === 'alarm' ? 'block' : 'none';
}

// Timer Functions
function startTimer() {
  const username = document.getElementById('username').value.trim();
  const input = document.getElementById('inputMinutes').value;

  if (!username) {
    alert("Masukkan nama terlebih dahulu.");
    return;
  }

  if (input <= 0 || isNaN(input)) {
    alert("Masukkan waktu yang valid.");
    return;
  }

  clearInterval(timer);
  totalSeconds = input * 60;
  updateTimerDisplay();

  document.getElementById('greeting').textContent = `Halo, ${username}! Timer berjalan...`;

  timer = setInterval(() => {
    totalSeconds--;
    updateTimerDisplay();

    if (totalSeconds <= 0) {
      clearInterval(timer);
      alert(`Waktu habis, ${username}!`);
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  totalSeconds = 0;
  updateTimerDisplay();
  document.getElementById('greeting').textContent = "";
}

function updateTimerDisplay() {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}

// Alarm Functions
function setAlarm() {
    const timeInput = document.getElementById('alarmTime').value;
    const alarmSound = document.getElementById('alarmSound');
  
    if (!timeInput) {
      alert("Pilih waktu alarm terlebih dahulu.");
      return;
    }
  
    alarmTime = timeInput;
    document.getElementById('alarmStatus').textContent = `Alarm disetel untuk ${alarmTime}`;
    
    alarmInterval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0,5); // Format HH:MM
  
      if (currentTime === alarmTime) {
        clearInterval(alarmInterval);
        alarmSound.play();
        alert("⏰ Alarm Berbunyi!");
      }
    }, 1000);
  }
  

function clearAlarm() {
  alarmTime = null;
  clearInterval(alarmInterval);
  document.getElementById('alarmStatus').textContent = "Alarm dibatalkan.";
}

function stopAlarm() {
    const alarmSound = document.getElementById('alarmSound');
    alarmSound.pause();
    alarmSound.currentTime = 0;
  }
  