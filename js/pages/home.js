// User data - would come from login in a real app
const userData = {
  name: "",
  streak: 21,
  points: 890,
  workoutsThisMonth: 24,
  totalTime: "18hrs",
  formAccuracy: "89%",
  strengthGain: "3.2kg",
};

// Current tab tracking
let currentTab = "home";

// Start workout function
function startWorkout() {
  // Navigate to workout page
  window.location.href = "../pages/workout.html";
}

// Show notifications
function showNotifications() {
  alert(
    "🔔 Notifications\n\n• Great job on your 21-day streak!\n• New workout plan available\n• Friend John completed a workout"
  );
  // In a real app, this would show a notifications panel
}

// Update stats with animation (optional enhancement)
function animateStats() {
  const statNumbers = document.querySelectorAll(
    ".stat-number, .progress-number"
  );

  statNumbers.forEach((stat) => {
    const finalValue = stat.textContent;
    const isNumber = !isNaN(parseInt(finalValue));

    if (isNumber) {
      const numericValue = parseInt(finalValue);
      let currentValue = 0;
      const increment = numericValue / 30;

      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
          stat.textContent = finalValue;
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(currentValue);
        }
      }, 30);
    }
  });
}

// Load user data (in a real app, this would fetch from a database)
function loadUserData() {
  // Update welcome message with user name
  const welcomeTitle = document.querySelector(".welcome-title");
  if (welcomeTitle && userData.name) {
    welcomeTitle.textContent = `Welcome back, ${userData.name}!`;
  }

  console.log("User data loaded:", userData);
}

// Initialize the page
function init() {
  loadUserData();
  // Uncomment the line below for animated stats on page load
  // animateStats();
}

// Run initialization when page loads
window.addEventListener("load", init);

// Handle page visibility (refresh data when user returns to tab)
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    console.log("User returned to the page");
    // In a real app, you might refresh data here
  }
});

// Workout reminder (example of timed functionality)
function setWorkoutReminder() {
  const now = new Date();
  const reminderTime = new Date();
  reminderTime.setHours(18, 0, 0, 0); // 6 PM reminder

  if (now < reminderTime) {
    const timeUntilReminder = reminderTime - now;
    setTimeout(() => {
      if (Notification.permission === "granted") {
        new Notification("HoloCoach Reminder", {
          body: "Time for your workout! 💪",
          icon: "/path/to/icon.png",
        });
      }
    }, timeUntilReminder);
  }
}

// Request notification permission (optional)
function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
}
