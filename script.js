function updateAge() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed
  const currentDay = now.getDate();

  // Kura's birth year (assuming 21 in 2025, birthday July 20th)
  const birthYear = 2004;

  let age = currentYear - birthYear;

  // If birthday hasn't happened yet this year, subtract 1
  if (currentMonth < 6 || (currentMonth === 6 && currentDay < 20)) {
    // July 20th = month 6, day 20
    age--;
  }

  document.getElementById("age").textContent = age;
}

function updateTimer() {
  const now = new Date();
  const options = {
    timeZone: "America/New_York", // Assuming the same timezone as DeafThing project
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const timeString = now.toLocaleTimeString("en-US", options);
  document.getElementById("timer").textContent = timeString;
}

function updateBirthdayCountdown() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();

  // Kura's birthday: July 20th of current year
  let birthday = new Date(currentYear, 6, 20); // Month is 0-indexed (July is 6)

  // Check if today IS the birthday (July 20th)
  const isBirthday = currentMonth === 6 && currentDay === 20;

  const countdownElement = document.getElementById("birthday-countdown");

  if (isBirthday) {
    // It's the birthday! Show celebration all day
    countdownElement.textContent = "🎉 Happy Birthday! 🎉";
    countdownElement.classList.add("birthday-today");
    return;
  } else {
    // Remove birthday class if it's not the birthday
    countdownElement.classList.remove("birthday-today");
  }

  // If birthday has passed this year, use next year's birthday
  if (now > birthday) {
    birthday = new Date(currentYear + 1, 6, 20);
  }

  const timeDiff = birthday - now;
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  // Calculate color based on days remaining (365 days = red, 0 days = green)
  const maxDays = 365;
  const progress = Math.max(0, Math.min(1, (maxDays - days) / maxDays));

  // Color interpolation from red to green
  const red = Math.floor(255 * (1 - progress));
  const green = Math.floor(255 * progress);
  const blue = 0;

  // Create gradient colors
  const color1 = `rgb(${red}, ${green}, ${blue})`;
  const color2 = `rgb(${Math.floor(red * 0.8)}, ${Math.floor(green * 0.8)}, ${blue})`;

  // Update CSS custom properties
  document.documentElement.style.setProperty("--countdown-color-1", color1);
  document.documentElement.style.setProperty("--countdown-color-2", color2);

  countdownElement.style.borderColor = color1;

  // Update countdown text
  if (days === 0) {
    countdownElement.textContent = `🎂 Birthday in ${hours}h ${minutes}m ${seconds}s!`;
  } else {
    countdownElement.textContent = `🎂 Birthday in ${days} days, ${hours}h ${minutes}m ${seconds}s!`;
  }
}

setInterval(updateTimer, 1000);
setInterval(updateBirthdayCountdown, 1000);
updateAge();
updateTimer();
updateBirthdayCountdown();
