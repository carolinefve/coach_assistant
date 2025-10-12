// User profile data
let userProfile = {
  name: "",
  goals: [],
  level: "",
  duration: "",
  days: "",
  persona: "",
};

// Initialize the page
function init() {
  loadUserProfile();
  displayUserData();
}

// Load user profile from localStorage
function loadUserProfile() {
  const savedProfile = localStorage.getItem("userProfile");
  const userName = localStorage.getItem("userName");

  if (savedProfile) {
    const profile = JSON.parse(savedProfile);
    userProfile = {
      name: userName || "User",
      goals: profile.goal ? [profile.goal] : [],
      level: "intermediate", // Default
      duration: "45", // Default from signup
      days: profile.workoutDays || "4",
      persona: profile.coachPersona || "professional",
    };
  } else {
    userProfile.name = userName || "User";
  }
}

// Display user data
function displayUserData() {
  // Display name
  document.getElementById("profileName").textContent = userProfile.name;

  // Select saved goals
  if (userProfile.goals.length > 0) {
    userProfile.goals.forEach((goal) => {
      const goalCard = document.querySelector(`[data-goal="${goal}"]`);
      if (goalCard) goalCard.classList.add("selected");
    });
  }

  // Select saved level
  if (userProfile.level) {
    const levelPill = document.querySelector(
      `[data-level="${userProfile.level}"]`
    );
    if (levelPill) levelPill.classList.add("selected");
  }

  // Select saved duration
  if (userProfile.duration) {
    const durationPill = document.querySelector(
      `[data-duration="${userProfile.duration}"]`
    );
    if (durationPill) durationPill.classList.add("selected");
  }

  // Select saved days
  if (userProfile.days) {
    const daysValue = userProfile.days.replace("-days", "");
    const daysPill = document.querySelector(`[data-days="${daysValue}"]`);
    if (daysPill) daysPill.classList.add("selected");
  }

  // Select saved persona
  if (userProfile.persona) {
    const personaPill = document.querySelector(
      `[data-persona="${userProfile.persona}"]`
    );
    if (personaPill) personaPill.classList.add("selected");
  }
}

// Toggle goal selection (multi-select)
function toggleGoal(button) {
  button.classList.toggle("selected");
  const goal = button.dataset.goal;

  if (button.classList.contains("selected")) {
    if (!userProfile.goals.includes(goal)) {
      userProfile.goals.push(goal);
    }
  } else {
    userProfile.goals = userProfile.goals.filter((g) => g !== goal);
  }
}

// Select fitness level (single select)
function selectLevel(button) {
  document.querySelectorAll("[data-level]").forEach((btn) => {
    btn.classList.remove("selected");
  });
  button.classList.add("selected");
  userProfile.level = button.dataset.level;
}

// Select duration (single select)
function selectDuration(button) {
  document.querySelectorAll("[data-duration]").forEach((btn) => {
    btn.classList.remove("selected");
  });
  button.classList.add("selected");
  userProfile.duration = button.dataset.duration;
}

// Select workout days (single select)
function selectDays(button) {
  document.querySelectorAll("[data-days]").forEach((btn) => {
    btn.classList.remove("selected");
  });
  button.classList.add("selected");
  userProfile.days = button.dataset.days;
}

// Select coach persona (single select)
function selectPersona(button) {
  document.querySelectorAll("[data-persona]").forEach((btn) => {
    btn.classList.remove("selected");
  });
  button.classList.add("selected");
  userProfile.persona = button.dataset.persona;
}

// Save profile
function saveProfile() {
  // Validate selections
  if (userProfile.goals.length === 0) {
    alert("Please select at least one fitness goal");
    return;
  }

  if (!userProfile.level) {
    alert("Please select your fitness level");
    return;
  }

  if (!userProfile.duration) {
    alert("Please select your preferred workout duration");
    return;
  }

  if (!userProfile.days) {
    alert("Please select your workout frequency");
    return;
  }

  if (!userProfile.persona) {
    alert("Please select your coach persona");
    return;
  }

  // Save to localStorage
  localStorage.setItem("userProfile", JSON.stringify(userProfile));
  localStorage.setItem("userName", userProfile.name);

  // Show success message
  alert("✅ Profile settings saved successfully!");
  console.log("Profile saved:", userProfile);
}

// Initialize when page loads
window.addEventListener("load", init);
