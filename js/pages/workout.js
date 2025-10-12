const exercises = [
  {
    name: "Push-Ups",
    level: "Intermediate",
    sets: 3,
    reps: "8-15",
    muscles: ["Chest", "Triceps", "Anterior Deltoid"],
    warning: "May cause wrist discomfort. Maintain neutral spine.",
    instruction: "Maintain proper form, control the movement",
  },
];
let currentExerciseIndex = 0,
  currentSet = 1;

function showStage(s) {
  document.querySelectorAll(".stage").forEach((e) => e.classList.add("hidden"));
  document.getElementById(s).classList.remove("hidden");
}

function startWorkout() {
  showStage("intensityStage");
  document.getElementById("liveIndicator").classList.remove("hidden");
}

function handleIntensity(e) {
  showStage("planStage");
}

function startExercise() {
  currentExerciseIndex = 0;
  currentSet = 1;
  loadExercise();
  showStage("exerciseStage");
}

function loadExercise() {
  const e = exercises[currentExerciseIndex];
  document.getElementById("exerciseName").textContent = e.name;
  document.getElementById("exerciseLevel").textContent = e.level;
  document.getElementById("coachInstruction").textContent = e.instruction;
  document.getElementById("currentSet").textContent = currentSet;
  document.getElementById("totalSets").textContent = e.sets;
  document.getElementById("targetReps").textContent = e.reps;
  document.getElementById(
    "startSetBtn"
  ).textContent = `Start Set ${currentSet}`;
  document.getElementById(
    "completeSetBtn"
  ).textContent = `Complete Set ${currentSet}`;

  const t = document.getElementById("muscleTags");
  t.innerHTML = "";
  e.muscles.forEach((e) => {
    const s = document.createElement("span");
    s.className = "muscle-tag";
    s.textContent = e;
    t.appendChild(s);
  });

  const s = document.getElementById("muscleSelection");
  s.innerHTML = "";
  e.muscles.forEach((e) => {
    const t = document.createElement("button");
    t.className = "muscle-btn";
    t.textContent = e;
    t.onclick = function () {
      toggleMuscle(this, e);
    };
    s.appendChild(t);
  });
}

function startSet() {
  document.getElementById("startSetBtn").classList.add("hidden");
  document.getElementById("completeSetBtn").classList.remove("hidden");
}

function completeSet() {
  const e = exercises[currentExerciseIndex];
  if (currentSet < e.sets) {
    currentSet++;
    document.getElementById("currentSet").textContent = currentSet;
    document.getElementById(
      "startSetBtn"
    ).textContent = `Start Set ${currentSet}`;
    document.getElementById(
      "completeSetBtn"
    ).textContent = `Complete Set ${currentSet}`;
    document.getElementById("startSetBtn").classList.remove("hidden");
    document.getElementById("completeSetBtn").classList.add("hidden");
  } else showStage("setCompletionStage");
}

function toggleMuscle(e, t) {
  e.classList.toggle("selected");
}

function nextExercise() {
  currentExerciseIndex++;
  currentSet = 1;
  if (currentExerciseIndex < exercises.length) {
    loadExercise();
    document.getElementById("startSetBtn").classList.remove("hidden");
    document.getElementById("completeSetBtn").classList.add("hidden");
    showStage("exerciseStage");
  } else showStage("completeStage");
}

function openFormCheck() {
  showStage("formCheckStage");
}

function stopRecording() {
  setTimeout(() => showStage("formFeedbackStage"), 500);
}

function cancelFormCheck() {
  showStage("exerciseStage");
}

function continueWorkout() {
  showStage("exerciseStage");
}

function goBack() {
  showStage("initialStage");
}

function goHome() {
  window.location.href = "../pages/home.html";
}
