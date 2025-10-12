let currentScreen = "welcome";
let currentQuestion = 0;
const totalQuestions = 4;

const userProfile = {
  goal: null,
  trainingSplit: null,
  workoutDays: null,
  coachPersona: null,
  name: null,
  email: null,
  password: null,
};

function showScreen(screenId) {
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
  currentScreen = screenId;
  updateUI();
}

function updateUI() {
  const backBtn = document.getElementById("backBtn");
  const backText = document.getElementById("backText");
  const logoHeader = document.getElementById("logoHeader");
  const progressBar = document.getElementById("progressBar");
  const primaryBtn = document.getElementById("primaryBtn");
  const secondaryBtn = document.getElementById("secondaryBtn");
  const dividerSection = document.getElementById("dividerSection");
  const socialButtons = document.getElementById("socialButtons");

  // Reset visibility
  secondaryBtn.style.display = "block";
  dividerSection.style.display = "flex";
  socialButtons.style.display = "flex";
  progressBar.classList.remove("active");
  logoHeader.textContent = "";
  backBtn.style.display = "none";

  if (currentScreen === "welcome") {
    primaryBtn.textContent = "START";
    secondaryBtn.style.display = "block";
    secondaryBtn.textContent = "Log In";
  } else if (currentScreen === "loginForm") {
    backBtn.style.display = "flex";
    backText.textContent = "Back";
    primaryBtn.textContent = "LOG IN";
    secondaryBtn.style.display = "none";
    dividerSection.style.display = "flex";
    socialButtons.style.display = "flex";
  } else if (currentScreen.startsWith("question")) {
    logoHeader.textContent = "HOLOCOACH";
    progressBar.classList.add("active");
    backBtn.style.display = "flex";
    backText.textContent = "Back";
    primaryBtn.textContent = "CONTINUE";
    secondaryBtn.style.display = "none";
    dividerSection.style.display = "none";
    socialButtons.style.display = "none";

    // Update progress bar
    const questionNum = parseInt(currentScreen.replace("question", ""));
    for (let i = 1; i <= 5; i++) {
      const segment = document.getElementById(`progress${i}`);
      if (i <= questionNum) {
        segment.classList.add("filled");
      } else {
        segment.classList.remove("filled");
      }
    }

    // Disable continue button if no selection
    const questionKey = `question${questionNum}`;
    const hasSelection =
      userProfile[Object.keys(userProfile)[questionNum - 1]] !== null;
    primaryBtn.disabled = !hasSelection;
  } else if (currentScreen === "signupForm") {
    logoHeader.textContent = "HOLOCOACH";
    progressBar.classList.add("active");
    backBtn.style.display = "flex";
    backText.textContent = "Back";
    primaryBtn.textContent = "CREATE ACCOUNT";
    secondaryBtn.style.display = "none";
    dividerSection.style.display = "flex";
    socialButtons.style.display = "flex";

    // Fill all progress segments
    for (let i = 1; i <= 5; i++) {
      document.getElementById(`progress${i}`).classList.add("filled");
    }
  }
}

function handlePrimaryAction() {
  if (currentScreen === "welcome") {
    showScreen("question1");
    currentQuestion = 1;
  } else if (currentScreen === "loginForm") {
    handleLogin();
  } else if (currentScreen === "question1") {
    showScreen("question2");
    currentQuestion = 2;
  } else if (currentScreen === "question2") {
    showScreen("question3");
    currentQuestion = 3;
  } else if (currentScreen === "question3") {
    showScreen("question4");
    currentQuestion = 4;
  } else if (currentScreen === "question4") {
    showScreen("signupForm");
  } else if (currentScreen === "signupForm") {
    handleSignup();
  }
}

function handleBack() {
  if (currentScreen === "loginForm") {
    showWelcome();
  } else if (currentScreen === "question1") {
    showWelcome();
  } else if (currentScreen === "question2") {
    showScreen("question1");
    currentQuestion = 1;
  } else if (currentScreen === "question3") {
    showScreen("question2");
    currentQuestion = 2;
  } else if (currentScreen === "question4") {
    showScreen("question3");
    currentQuestion = 3;
  } else if (currentScreen === "signupForm") {
    showScreen("question4");
    currentQuestion = 4;
  }
}

function showWelcome() {
  showScreen("welcomeScreen");
  currentQuestion = 0;
}

function showLogin() {
  showScreen("loginForm");
}

function selectOption(question, value, button) {
  // Remove selection from all buttons in this question
  const allButtons = button.parentElement.querySelectorAll(".option-btn");
  allButtons.forEach((btn) => btn.classList.remove("selected"));

  // Add selection to clicked button
  button.classList.add("selected");

  // Store selection
  if (question === "question1") {
    userProfile.goal = value;
  } else if (question === "question2") {
    userProfile.trainingSplit = value;
  } else if (question === "question3") {
    userProfile.workoutDays = value;
  } else if (question === "question4") {
    userProfile.coachPersona = value;
  }

  // Enable continue button
  document.getElementById("primaryBtn").disabled = false;
}

function handleLogin() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (email && password) {
    console.log("Logging in...", { email });

    // Store user info in localStorage
    localStorage.setItem("userEmail", email);
    localStorage.setItem("isLoggedIn", "true");

    // Redirect to home page
    window.location.href = "./pages/home.html";
  } else {
    alert("Please fill in all fields");
  }
}

function handleSignup() {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById(
    "signupConfirmPassword"
  ).value;

  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill in all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  userProfile.name = name;
  userProfile.email = email;
  userProfile.password = password;

  console.log("Creating account with profile:", userProfile);

  // Store user info in localStorage
  localStorage.setItem("userName", name);
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userProfile", JSON.stringify(userProfile));
  localStorage.setItem("isLoggedIn", "true");

  // Redirect to home page
  window.location.href = "./pages/home.html";
}

function handleSocialLogin(provider) {
  // Store social login info
  localStorage.setItem("loginProvider", provider);
  localStorage.setItem("isLoggedIn", "true");

  // Redirect to home page
  window.location.href = "./pages/home.html";
}

// Initialize
updateUI();
